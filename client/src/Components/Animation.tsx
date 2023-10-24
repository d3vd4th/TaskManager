import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../Animation - 1696432082523.json';
import animationData1 from '../graphicCharts.json';
import animationData2 from '../graphic2.json'

import { Box, Grid } from '@mui/material';

const LottieAnimation: React.FC = () => {
    const animationContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (animationContainer.current) {
              const anim = lottie.loadAnimation({
                container: animationContainer.current,
                animationData,
            });
        }
    }, []);

    return (
        <Grid container sx={{display:'flex', minHeight:'100vh' ,alignContent:'center',bgcolor:'#fff'}}>
            <Grid container xs={12} md={12} lg={12} >
            <Grid item xs={12} md={12} lg={12} 
                    ref={animationContainer}
                    sx={{ width: '250px', height: '250px',  }} 
                />
            </Grid>
        </Grid>
    );
};

const AnimationGraphs: React.FC = () => {
    const animationContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (animationContainer.current) {
              const anim = lottie.loadAnimation({
                container: animationContainer.current,
                animationData:animationData1
            });
        }
    }, []);

    return (
         <Grid container sx={{}}>
            <Grid container >
            <Grid item 
                    ref={animationContainer}
                    sx={{ width: '450px', height: '350px',  }} 
                />
            </Grid>
         </Grid>
    );
};


const AnimationGraphs2: React.FC = () => {
    const animationContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (animationContainer.current) {
              const anim = lottie.loadAnimation({
                container: animationContainer.current,
                animationData:animationData2
            });
        }
    }, []);

    return (
        // <Grid container sx={{display:'flex', alignContent:'center',bgcolor:'#fff'}}>
            <Grid container >
            <Grid item 
                    ref={animationContainer}
                    sx={{ width: '450px', height: '350px',  }} 
                />
            </Grid>
        // </Grid>
    );
};

export { LottieAnimation,AnimationGraphs,AnimationGraphs2};
