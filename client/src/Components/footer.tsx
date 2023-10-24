import React from 'react'
import { Grid, Typography } from '@mui/material'
function Footer() {
  return (
    <div>
        <Grid container md={12} spacing={2}>
        <Grid item  display='flex' flexGrow={2}   justifyContent='flex-start'>
        <Typography variant='body1'  sx={{color:'#3085C3'}} fontWeight='bold' > @copyright  </Typography>
        </Grid>
        <Grid item  display='flex' flexGrow={2} justifyContent='center' >
        <Typography variant='body1' sx={{color:'#3085C3'}} fontWeight='bold'>@visit our website: www.computervalley.com</Typography>
        </Grid>
        <Grid item  display='flex' flexGrow={2} justifyContent='flex-end' >
        <Typography variant='body1' sx={{color:'#3085C3'}} fontWeight='bold'>@copyright</Typography>
        </Grid>
        </Grid>

    </div>
  )
}

export default Footer