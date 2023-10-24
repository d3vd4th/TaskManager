import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Alert, Box, Button, CircularProgress, Container, DialogActions, DialogContent, DialogTitle, Grid, TextField, TextFieldProps } from '@mui/material';
import SourceIcon from '@mui/icons-material/Source';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import dayjs from "dayjs";
import axios, { AxiosResponse } from 'axios';
import Snackbar from '@mui/material/Snackbar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import { enqueueSnackbar } from 'notistack';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  placeholder: string
  subtitle1: string
  tags1: string
  status1: string
  date1: string
  doc_id: string
}
function UpdateTask({ open, onClose, placeholder, subtitle1, tags1, status1, date1, doc_id }: TaskDialogProps) {
  const [selectedChkbxValue, setSelectedChkbxValue] = useState(status1);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState(placeholder)
  const [subtitle, SetSubTitle] = useState(subtitle1)
  const [tags, setTags] = useState(tags1)
  const [taskUpdated, setTaskUpdated] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)
  const[taskDeleted,setTaskDeleted]=useState(false)
  const token = localStorage.getItem('token')

  const handleClose = () => {
    setTaskUpdated(false)
    setTaskDeleted(false)
  }


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedChkbxValue(event.target.value);
  };


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString()
    return formattedDate;
  };


  const selectedDateObject = dayjs(selectedDate, { format: "DD-MM-YYYY" }).toDate();
  const updateTask = (doc_id: string, title: string, subtitle: string, tags: string, status: string, date: Date) => {
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8080/updatetask ',
      { doc_id, title, subtitle, tags, status, date },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
      }
    ).then((res: AxiosResponse) => {
      console.log(res)
      setTaskUpdated(true)
      setTimeout(() => {
        setLoading(false)
        onClose()
        // window.location.reload();
      }, 1500)
    }).catch((err) => console.log(err))
  }
  const handleUpdateTask = (doc_id: string) => {
    setLoading(true)
    updateTask(doc_id, title, subtitle, tags, selectedChkbxValue, selectedDateObject)
  }


  const deleteTask = (doc_id:string)=>{
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8080/deletetask',{doc_id},
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',  
         'Authorization': `Bearer ${token}`
      },
    })
    .then((res: AxiosResponse)=>{
    console.log(res.data)
    
      setTaskDeleted(true)
    setTimeout(() => {
      setLoading(false)
      setIsDeleteDialog(false)  
    }, 1500)
    }).catch(err=>console.log(err)
    )
  }

  const handledelete = () => {
    onClose()
    setIsDeleteDialog(true)

  }
  const handledeleteClose = () => {
    setIsDeleteDialog(false)
  }
 
  const handleDeleteBtn =(doc_id: string)=>{
  setLoading(true)
  deleteTask(doc_id)
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: '1.5em' } }}>
        <Card sx={{ height: 'auto', width: '24em', }}>
          <CardContent sx={{ pt: '2em', alignItems: 'center', ml: '1em' }}>
            <Typography variant='h6' fontWeight={600} > Task Details</Typography>

          </CardContent>
          <CardContent sx={{ p: 0 }}>
            <Grid container sx={{ display: 'flex' }}>
              <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0 }}>
                <SourceIcon sx={{ color: 'grey', pl: '0.3em', pr: '0.4em' }} />
                <Typography variant='body2' fontWeight={600} sx={{ pr: '4em', color: 'grey' }}> Title  </Typography>
                <TextField sx={{ width: '14em', '& .MuiInputBase-input': { height: '0.5em', }, }} value={title} onChange={(e) => setTitle(e.target.value)} />
              </Grid>
            </Grid>
          </CardContent >
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 0, pt: '1em' }}>
            <SubtitlesIcon sx={{ color: 'grey', pl: '0.9em', pr: '0.4em' }} />
            <Typography variant='body2' fontWeight={600} sx={{ pr: "2.5em", color: 'grey' }}>  Subtitle </Typography>
            <TextField sx={{ width: '14em', '& .MuiInputBase-input': { height: '0.5em', }, }} value={subtitle} onChange={(e) => SetSubTitle(e.target.value)} />
          </CardContent>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <BookmarkBorderIcon sx={{ color: 'grey', pl: '0.3em', pr: '0.4em' }} />
            <Typography variant='body2' fontWeight={600} sx={{ pr: "3.8em", color: 'grey' }}>  Tags </Typography>
            <TextField sx={{ width: '14em', '& .MuiInputBase-input': { height: '0.5em', }, }} value={tags} onChange={(e) => setTags(e.target.value)} />
          </CardContent>
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 0 }}>
            <EqualizerIcon sx={{ color: 'grey', pl: '1em', pr: '0.4em' }} />
            <Typography variant='body2' fontWeight={600} sx={{ pr: "1em", color: 'grey' }}> Status </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="checkbox-group"
                name="checkbox-group"
                defaultValue={status1}

                onChange={handleChange}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel value="Low" control={<Radio />} label="Low" />
                  <FormControlLabel value="Medium" control={<Radio />} label="Medium" />

                  <FormControlLabel value="High" control={<Radio />} label="High" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel value="On Fire" control={<Radio />} label="On fire" />
                </Box>
              </RadioGroup>
            </FormControl>
          </CardContent>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <ScheduleIcon sx={{ color: 'grey', pl: '0.4em', pr: '0.4em' }} />
            <Typography variant='body2' fontWeight={600} sx={{ color: 'grey' }}>  Due date </Typography>
            <CalendarMonthIcon sx={{ color: "#A8A8A8", pl: '0.8em' }} />
            <Typography gutterBottom sx={{ pr: '0.5em', color: 'grey', pl: '0.5em', pt: '0.5em', fontSize: '0.8em' }} >
              {formatDate(date1)}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <DatePicker
                format="DD-MM-YYYY"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e)}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: '13px',
                    padding: '9px',
                    color: 'grey',

                  },
                  "& .MuiOutlinedInput-root": {
                    width: "7.6 em"

                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: '16px',
                    color: 'grey'
                  },
                }}
              />
            </LocalizationProvider>

          </CardContent>
          <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', ml: '0.5em' }}>
            <Button onClick={handledelete} startIcon={<DeleteIcon sx={{ color: 'grey' }} />}>
              <Typography variant='body2' fontWeight={600} sx={{ color: 'grey' }}> Delete Task  </Typography></Button>

          </CardContent>
          <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button variant='contained' size='medium' sx={{ width: '24em', bgcolor: '#1C82AD', '&:hover': { bgcolor: '#1C82AD' }, borderRadius: '2em', }} onClick={() => handleUpdateTask(doc_id)} disabled={loading} >{loading ? <CircularProgress size={22} /> : 'Update task'}</Button>
          </CardContent>

          <Snackbar
            open={taskUpdated}
            autoHideDuration={1700}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '20em' }}>
              Task updated succesfully
            </Alert>
          </Snackbar>
        </Card>
      </Dialog>
      <Dialog
        open={isDeleteDialog}
        maxWidth="xs"
        fullWidth
        onClose={handledeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Container>

            Are you sure you want to delete the task??
          </Container>

        </DialogContent>
        <DialogActions>
          <Button onClick={handledeleteClose}>No, Cancel</Button>
          <Button
            color='error'
            variant='contained'
            onClick={()=>handleDeleteBtn(doc_id)}
            autoFocus
            disabled={loading} >{loading ? <CircularProgress size={22} /> : 'Yes'}
            
          </Button>

          <Snackbar
            open={taskDeleted}
            autoHideDuration={1700}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '20em' }}>
              Task deleted succesfully
            </Alert>
          </Snackbar>
        </DialogActions>

      </Dialog>
    </div>
  )
}


export default UpdateTask