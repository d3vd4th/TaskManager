import { Alert, Box, Button, Card, CardContent, Dialog, Divider, Grid, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UpdateTask from './updateTask';



interface TaskCardProps {
    bgColor: string
    statusBtn: string
    onLowCountChange: (lowCount: number) => void;
    onMdmCountChange: (lowCount: number) => void;
    onHighCountChange: (lowCount: number) => void;
    onFreCountChange: (lowCount: number) => void;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {

    const getColor = (value: number) => {
        if (value >= 90) {
            return 'success'
        } else if (value >= 65) {
            return 'primary'
        }
        else if (value >= 40) {
            return 'warning'
        } else if (value >= 10) {
            return 'error'
        } else {
            return 'primary'
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={props.value} color={getColor(props.value)} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
function TaskCard(props: TaskCardProps) {
    const [progress, setProgress] = useState(10);
    const token = localStorage.getItem('token')
    const [tasksData, setTasksData] = useState<any[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState<boolean[]>(tasksData.map(() => false));
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [filteredData, setFilteredData] = useState<any[]>([])
    const open = Boolean(anchorEl);


    //api for fetch tasks
    const tasks = async () => {

        axios.get('http://localhost:8080/fetchtask ',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        ).then((res: AxiosResponse) => {
            setTasksData(res.data)
        }).catch((err) => console.log(err))
    }



    useEffect(() => {
        tasks()
        //filteration
        const { statusBtn, onLowCountChange, onMdmCountChange, onHighCountChange, onFreCountChange } = props
        if (statusBtn === "all") {
            setFilteredData(tasksData);
        } else {
            const filteredResult = tasksData.filter(item => item.status === statusBtn);
            setFilteredData(filteredResult);
        }
        //count
        const lowCountResult = tasksData.filter(item => item.status === 'Low').length;
        onLowCountChange(lowCountResult);
        const mdmCountResult = tasksData.filter(item => item.status === 'Medium').length;
        onMdmCountChange(mdmCountResult)
        const highCountResult = tasksData.filter(item => item.status === 'High').length;
        onHighCountChange(highCountResult)
        const fireCountResult = tasksData.filter(item => item.status === 'On Fire').length;
        onFreCountChange(fireCountResult)
    }, [tasksData]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 900);
        return () => {
            clearInterval(timer);
        };
    }, [])
    const linearProgressProps = {
        value: progress,
    };


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString()
        return formattedDate;
    };



    const handleOptBtn = (index: number) => {
        const updatedDialogStates = [...isDialogOpen];
        updatedDialogStates[index] = true;
        setIsDialogOpen(updatedDialogStates)
    }
    const handleCloseDialog = (index: number) => {
        const updatedDialogStates = [...isDialogOpen];
        updatedDialogStates[index] = false;
        setIsDialogOpen(updatedDialogStates);
    };




    const handleOpt = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);

    };
    const handleCloseOpt = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Grid container  >
                {filteredData.map((data: any, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={data.id} sx={{ display: 'flex', justifyContent: 'center', py: '2em' }}>
                        <Card sx={{ height: '14em', width: '25em', borderRadius: '1.4em' }}>
                            <CardContent sx={{ display: 'flex', height: '0.8em' }} >
                                <Grid item xs={8} md={7} lg={7} sx={{ display: 'flex' }}>
                                    <Typography variant="h6" fontWeight={600} >
                                        {data.title}
                                    </Typography>
                                    <Typography variant='body2' sx={{ color: '#A8A8A8', pl: '0.5em', pt: '0.5em' }} fontWeight={600}>
                                        {data.subtitle}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} md={5} lg={5} sx={{ display: 'flex', justifyContent: 'end' }}>
                                    {/* <Button onClick={handleOpt}><MoreHorizIcon sx={{ color: '#A8A8A8' }} /></Button>
                                    <Menu anchorEl={anchorEl} open={open} onClose={handleCloseOpt} PaperProps={{
                                        elevation: 0, style: { background: '#E4F1FF', color: "grey", padding: "0em 0.5em 0em 0.5em" }
                                    }}>
                                        <MenuItem sx={{ display: 'flex' }} onClick={()=>handleOptBtn(index)}>
                                            Edit</MenuItem>
                                            
                                            <MenuItem onClick={handleCloseOpt}>
                                            Delete</MenuItem>
                                        </Menu> */}
                                    <Button onClick={() => handleOptBtn(index)}><MoreHorizIcon sx={{ color: '#A8A8A8' }} /></Button>
                                    <UpdateTask doc_id={data._id} status1={data.status} date1={data.date} tags1={data.tags} subtitle1={data.subtitle} placeholder={data.title} open={isDialogOpen[index]} onClose={() => handleCloseDialog(index)} />
                                </Grid>

                            </CardContent>

                            <CardContent sx={{ display: 'flex', p: 0, pl: '0.8em', pt: '0.5em' }}>
                                <BookmarkBorderIcon sx={{ color: 'grey', fontSize: '1.1em' }} />
                                <Typography sx={{ color: '#A8A8A8', pl: '1.5em', fontSize: '0.7em' }} fontWeight={600}>
                                    {data.tags}
                                </Typography>
                                <Typography sx={{ color: '#A8A8A8', pl: '1.5em', fontSize: '0.7em' }} fontWeight={600}>
                                    Auto Layout
                                </Typography>
                                <Typography sx={{ color: '#A8A8A8', pl: '1.5em', fontSize: '0.7em' }} fontWeight={600}>
                                    Prototype
                                </Typography>
                            </CardContent>
                            <CardContent sx={{ display: 'flex', p: '0', pl: '0.8em', }}>
                                <Typography sx={{ color: 'grey', pl: '0.3em', pt: '1.3em', fontSize: '0.7em' }} fontWeight={600}>
                                    Due date:
                                </Typography>
                                <CalendarMonthIcon sx={{ color: "#A8A8A8", pt: '0.4em', pl: '0.5em' }} />
                                <Typography gutterBottom sx={{ color: 'grey', pl: '0.5em', pt: '1em', fontSize: '0.8em' }} >
                                    {formatDate(data.date)}
                                </Typography>
                            </CardContent>
                            <CardContent sx={{ display: 'flex', p: '0', pl: '0.8em', pt: '0.3em' }}>
                                <Typography sx={{ color: 'grey', pl: '0.3em', pt: '1em', fontSize: '0.7em' }} fontWeight={600}>
                                    Priority :
                                </Typography>
                                <Button variant='contained' size='small' sx={{
                                    height: '1.5em', width: '5.8.5em', bgcolor: (() => {
                                        switch (data.status) {
                                            case 'High':
                                                return '#EE9322';
                                            case 'Low':
                                                return '#59CE8F';
                                            case 'Medium':
                                                return '#E9B824';
                                            case 'On Fire':
                                                return '#D83F31';
                                        }
                                    })(), ml: '2em', mt: '0.5em', fontSize: '0.8em', '&:hover': { bgcolor: '#42855B' }, borderRadius: '2em',
                                }} >{data.status}</Button>

                            </CardContent>
                            <CardContent sx={{ display: 'flex', p: '0', pl: '0.8em', pt: '1em' }}>
                                <Typography sx={{ color: 'grey', pl: '0.3em', pt: '1em', fontSize: '0.7em' }} fontWeight={600}>
                                    Progress :
                                </Typography>
                                <Box sx={{ width: '70%', pl: '1em', pt: '0.6em' }}>
                                    <LinearProgressWithLabel value={progress} />
                                </Box>
                            </CardContent>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </div>

    )
}

export default TaskCard