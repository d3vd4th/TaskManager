import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { LoginHeader } from '../Components/header'
import LoginRegCard from '../Components/loginRegCard'
import Footer from '../Components/footer'
import { AnimationGraphs } from '../Components/Animation'

function LoginPage() {
  return (

    <div >
      <Box >
        <LoginHeader />
        <Grid container sx={{ marginTop: '', minHeight: { md: '70vh', xs: '120vh' }, backgroundColor: '#3085C3' }}>
          <Grid item xs={12} md={6} lg={6} sm={12} sx={{ marginTop: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}  >
            <img src={process.env.PUBLIC_URL + "/pngegg.png"} style={{ paddingBottom: "1em", height: '450px', width: '450px' }} alt="" />
            {/* <Typography variant="h2" fontWeight="bold" sx={{ marginRight: { md: '2.0em', xs: 'em' }, fontSize: { md: '5em', xs: '3em' } }}>Unlock Your </Typography>
            <Typography variant="h2" fontWeight="bold" sx={{ marginRight: { md: '4.5em', xs: 'em' }, fontSize: { md: '5em', xs: '3em' } }}>Future </Typography>*/}
            <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>do more by doing less... </Typography>
          </Grid>
          <Grid item xs={12} md={8} sm={12} lg={6} sx={{ display: "flex", justifyContent: { md: "flex-end", xs: 'center' }, height: '', paddingRight: { md: '3em', xs: '' } }}>
            <LoginRegCard />
          </Grid>
        </Grid>
        <Grid container xs={12} md={12} lg={12} sx={{ mt: { xs: '2.5em', md: '0em' }, paddingBottom: '3em', pt: '3em', backgroundColor: "#E4F1FF", display: "flex", flexDirection: 'row' }}>

          <Grid item xs={12} md={6} sm={6} lg={6} sx={{ bgcolor: '#E4F1FF', pl: "6em" }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: 'grey',pl:'6.2em' }}>Stay Organized.</Typography>
            <AnimationGraphs />
          </Grid>
          <Grid item xs={12} md={6} sm={6} lg={6} sx={{ bgcolor: '#E4F1FF', pl: "6em",pt:'2em' }}>
            <AnimationGraphs />
          </Grid>
        </Grid>
        <Grid container sx={{ minHeight: '25vh', backgroundColor: '#3085C3', color: '#fff' }}>
          {/* <AnimationGraphs2/> */}
          <Grid item xs={12} md={12} sm={12} pt='2em' display='flex' justifyContent='center' sx={{ height: '2em' }}>
            <h3 id='about-us'>About Us</h3>
          </Grid>
          <Grid item xs={12} md={12} sm={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Grid container xs={10} md={8} >
              <Typography variant='body2' sx={{ textAlign: { xs: 'justify', md: 'center' } }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid container  xs={12} md={12} lg={12} sx={{mt:{xs:'2.5em',md:'0em'} ,backgroundColor:"#E4F1FF"}}>
          <Grid item xs={12} md={12} sm={12} >
            <Footer/>
          </Grid>
        </Grid> */}
      </Box>

    </div>
  )
}

export default LoginPage