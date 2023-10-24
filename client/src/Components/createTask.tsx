import React from 'react'
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Alert, Box, Button, CircularProgress, Grid, TextField, TextFieldProps } from '@mui/material';
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
import { useUser } from '../Contexts/AuthContext';


interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
}
function CreateTask({ open, onClose }: TaskDialogProps) {
  const [selectedChkbxValue, setSelectedChkbxValue] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState('')
  const [subtitle, SetSubTitle] = useState('')
  const [tags, setTags] = useState('')
  const [taskCreated, setTaskCreated] = useState<boolean>(false)
  const currentDate = new Date();
  const token = localStorage.getItem('token')

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { userData } = useUser();

  const handleClose = () => {
    setTaskCreated(false)
  }


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedChkbxValue(event.target.value);
  };
  const selectedDateObject = dayjs(selectedDate, { format: "DD-MM-YYYY" }).toDate();
  const createTask = (title: string, subtitle: string, tags: string, status: string, date: Date) => {
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8080/createtask ',
      {title, subtitle, tags, status, date},
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }
    ).then((res: AxiosResponse) => {
      console.log(res)
      setTaskCreated(true)
      setTimeout(() => {
        setLoading(false)
        onClose()
      }, 1500)
    }).catch((err) => console.log(err))
  }
  const handleCreateTask = () => {
    setLoading(true)
    createTask(title, subtitle, tags, selectedChkbxValue, selectedDateObject)
  }

  
  return (
    <div>
      <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: '1.5em' } }}>
        <Card sx={{ height: 'auto', width: '24em', }}>
          <CardContent sx={{ pt: '2em' }}>
            <Typography variant='h6' fontWeight={600} > Create a Task</Typography>
          </CardContent>
          <CardContent sx={{ p: 0 }}>
            <Grid container sx={{ display: 'flex' }}>
              <Grid item xs={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0 }}>
                <SourceIcon sx={{ color: 'grey', pl: '0.3em', pr: '0.4em' }} />
                <Typography variant='body2' fontWeight={600} sx={{ pr: '4em', color: 'grey' }}> Title  </Typography>
                <TextField placeholder='untitled' sx={{ width: '14em', '& .MuiInputBase-input': { height: '0.5em', }, }} value={title} onChange={(e) => setTitle(e.target.value)} />
              </Grid>
            </Grid>
          </CardContent >
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 0, pt: '1em' }}>
            <SubtitlesIcon sx={{ color: 'grey', pl: '0.9em', pr: '0.4em' }} />
            <Typography variant='body2' fontWeight={600} sx={{ pr: "2.5em", color: 'grey' }}>  Subtitle </Typography>
            <TextField placeholder='untitled' sx={{ width: '14em', '& .MuiInputBase-input': { height: '0.5em', }, }} value={subtitle} onChange={(e) => SetSubTitle(e.target.value)} />
          </CardContent>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <BookmarkBorderIcon sx={{ color: 'grey', pl: '0.3em', pr: '0.4em' }} />
            <Typography variant='body2' fontWeight={600} sx={{ pr: "4em", color: 'grey' }}>  Tags </Typography>
            <TextField sx={{ width: '14em', '& .MuiInputBase-input': { height: '0.5em', }, }} value={tags} onChange={(e) => setTags(e.target.value)} />
          </CardContent>
          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 0 }}>
            <EqualizerIcon sx={{ color: 'grey', pl: '1em', pr: '0.4em' }} />
            <Typography variant='body2' fontWeight={600} sx={{ pr: "1em", color: 'grey' }}> Status </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="checkbox-group"
                name="checkbox-group"
                value={selectedChkbxValue}

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
            <Typography variant='body2' fontWeight={600} sx={{ pr: "1.9em", color: 'grey' }}>  Due date </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD-MM-YYYY"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e)}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: '13px',
                    padding: '9px',
                    color: 'grey'

                  },
                  "& .MuiOutlinedInput-root": {
                    width: "13.8em"

                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: '16px',
                    color: 'grey'
                  },
                }}
              />
            </LocalizationProvider>

          </CardContent>
          <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button variant='contained' size='medium' sx={{ width: '24em', bgcolor: '#1C82AD', '&:hover': { bgcolor: '#1C82AD' }, borderRadius: '2em', }} onClick={handleCreateTask} disabled={loading} >{loading ? <CircularProgress size={22} /> : 'Create task'}</Button>
          </CardContent>
          <Snackbar
            open={taskCreated}
            autoHideDuration={1700}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '20em' }}>
              Task created succesfully
            </Alert>
          </Snackbar>
        </Card>
      </Dialog>
    </div>
  )
}


export default CreateTask