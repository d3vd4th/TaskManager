import React, { useEffect } from 'react'
import { DashboardHeader } from '../Components/header'
import { Badge, Box, Button, Divider, Grid, Typography } from '@mui/material'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import TaskCard from '../Components/taskCard';
import CreateTask from '../Components/createTask';
import axios, { AxiosResponse } from 'axios';
import { useUser } from '../Contexts/AuthContext';
import{ LottieAnimation} from '../Components/Animation';
import { useNavigate } from 'react-router-dom';

function HomePage() {

  const { userData } = useUser();
  const [activeButton, setActiveButton] = useState<string | null>('Customize');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('all')
  const [taskFilteraion, setTaskFilteraion] = useState<any[]>([])
  const [lowCount, setLowCount] = useState<number>(0)
  const [mdmCount, setMdmCount] = useState<number>(0)
  const [highCount, setHighCount] = useState<number>(0)
  const [onfreCount, setOnFreCount] = useState<number>(0)
  

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName)
  };
  const handleAddTask = () => {
    setIsDialogOpen(true)
  }
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const email = localStorage.getItem('email')
  const user = (status: string) => {
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8080/statusfilteration ',
      { status },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    ).then((res: AxiosResponse) => {
      setTaskFilteraion(res.data)
    }).catch((err) => console.log(err))
  }
  useEffect(() => {
    if (email) {
      user(email);
    }

    console.log(userData)
  }, [])


  

  const handleLowFilteration = () => {
    setStatusValue('Low')

  }

  const handleMdmFilteration = () => {
    setStatusValue('Medium')

  }

  const handleHghFilteration = () => {
    setStatusValue('High')
  }

  const handlefreFilteration = () => {
    setStatusValue('On Fire')
  }

  const handleLowCount = (count: number) => {
    setLowCount(count)
  }
  const handleMdmCount = (count: number) => {
    setMdmCount(count)
  }
  const handleHighCount = (count: number) => {
    setHighCount(count)
  }
  const handleOnfireCount = (count: number) => {
    setOnFreCount(count)
  }
  return (
    <div>
      <Box >
        <DashboardHeader />
        <Grid container sx={{ pb: '1em' }}>

          <Grid item xs={12} md={6} lg={6} sx={{ mt: "1em", color: '#A8A8A8', }}>
            <Typography fontWeight={400} variant='h3' sx={{ color: 'black', ml: '0.8em' }}>Tasks</Typography>
            <Box gap={3} sx={{ display: 'flex', pl: "2.9em", mt: '0.8em' }}>
              <Typography variant='body2' fontWeight='bold'>Personal</Typography>
              <Typography variant='body2' fontWeight='bold'>Office</Typography>
              <Typography variant='body2' fontWeight='bold'>Projects</Typography>
              <Typography variant='body2' fontWeight='bold'>Files</Typography>
              <Typography variant='body2' fontWeight='bold'>Others</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} gap={3} sx={{ display: 'flex', justifyContent: 'flex-end', pt: '5em', pr: '3em' }} >
            <Button startIcon={<DashboardCustomizeIcon />} sx={{ color: activeButton === 'Customize' ? 'black' : 'grey', fontSize: '12px' }} onClick={() => handleButtonClick('Customize')}> Customize</Button>
            <Button startIcon={<FilterAltIcon />} sx={{ color: activeButton === 'Filters' ? 'black' : 'grey', fontSize: '12px' }} onClick={() => handleButtonClick('Filters')}> Filters</Button>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: '11px',
                      padding: '4px',
                      color: 'grey'

                    },
                    "& .MuiOutlinedInput-root": {

                      borderRadius: '0.3em'
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: '15px',
                      color: 'grey'
                    },
                  }} />
              </DemoContainer>
            </LocalizationProvider>

            <Button startIcon={<AddIcon />} size='small' variant='contained' sx={{ bgcolor: '#1C82AD', borderRadius: '1em', fontSize: '12px', height: '2em', mt: '0.5em' }} onClick={handleAddTask}>Add Tasks</Button>
            <CreateTask open={isDialogOpen} onClose={handleCloseDialog} />
          </Grid>
        </Grid>
        <Box sx={{ mx: '3em' }}>
          <Divider />
        </Box>
        <Grid container >
          <Grid item xs={3} md={3} lg={3} sx={{ my: '2em', display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' size='small' sx={{ width: '12em', bgcolor: '#59CE8F', '&:hover': { bgcolor: '#42855B' }, borderRadius: '2em', }} onClick={handleLowFilteration}>Low
              <Badge
                badgeContent={lowCount}
                color="success"
                sx={{
                  position: 'absolute',
                  right: '16px'
                }}
              /></Button>
          </Grid>
          <Grid item xs={3} md={3} lg={3} sx={{ my: '2em', display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' size='small' sx={{ width: '12em', bgcolor: '#E9B824', borderRadius: '2em' }} onClick={handleMdmFilteration}>Medium
              <Badge
                badgeContent={mdmCount}
                color="warning"
                sx={{
                  position: 'absolute',
                  right: '16px'
                }}
              />
            </Button>
          </Grid>
          <Grid item xs={3} md={3} lg={3} sx={{ my: '2em', display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' size='small' sx={{ width: '12em', bgcolor: '#EE9322', borderRadius: '2em' }} onClick={handleHghFilteration}>High
              <Badge
                badgeContent={highCount}
                color="error"
                sx={{
                  position: 'absolute',
                  right: '16px'
                }}
              />
            </Button>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} sx={{ my: '2em', display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' size='small' sx={{ width: '12em', bgcolor: '#D83F31', borderRadius: '2em' }} onClick={handlefreFilteration}>On fire
              <Badge
                badgeContent={onfreCount}
                color="error"
                sx={{
                  position: 'absolute',
                  right: '16px'
                }}
              />
            </Button>
          </Grid>
        </Grid>
        <Grid container sx={{ bgcolor: '#F5F5F5', minHeight: "60vh" }}>
          <Grid item xs={12} md={12} lg={12}>
            <TaskCard onMdmCountChange={handleMdmCount} onHighCountChange={handleHighCount} onFreCountChange={handleOnfireCount} onLowCountChange={handleLowCount} bgColor='#59CE8F' statusBtn={statusValue} />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default HomePage