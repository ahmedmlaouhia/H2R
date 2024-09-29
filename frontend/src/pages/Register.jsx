import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, createTheme,Paper,Avatar,Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import Box from '@mui/material/Box';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import PhoneIcon from '@mui/icons-material/Phone';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Grid from '@mui/system/Grid';

import H2 from "../images/H2.png";
import shadows from '@mui/material/styles/shadows';



const theme = createTheme({
    spacing: 4, 
  });

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing,
  },
}));

function Register() {

  const paperStyle = { padding: 20, width: 500, margin: "0 auto" }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#1025a1' }
  const btnstyle={backgroundColor:'#1025a1',height:40}



  const classes = useStyles();
 
  return (

    <div className='register' style={{marginTop:'0px'}}>
    <div className='registerfront' style={{display:'flex'}}>

  

        <div className='logoform' style={{paddingLeft:"120px",marginTop:"0px"}}>


            <div  style={{position: "relative",marginTop:"140px",marginLeft:"0px",height:'400px',width:'520px'}}>

    <Grid style={{marginTop:20}}>

    <Paper style={paperStyle} elevation={6} >
    
        <Grid align='center' paddingBottom={2}>
            <Avatar style={avatarStyle}>
                <AddCircleOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
        </Grid>
<div className={classes.form}>
        <form >

        <Stack spacing={2} >

        <Box display="flex" >
            <TextField 
              name="firstname"
              label='First Name' 
              placeholder="Enter your name"  
              style={{ flex: 1, marginRight: '8px' }}
              InputProps={{startAdornment: (<InputAdornment position="start"><Person2OutlinedIcon /></InputAdornment>),}} 
              variant="outlined"
 />
            
            <TextField  
              name="lastname"
              label='Last Name' 
              placeholder="Enter your name" 
              style={{ flex: 1 }}  
              InputProps={{startAdornment: (<InputAdornment position="start"><Person2OutlinedIcon /></InputAdornment>),}}  
              variant="outlined"
/>
            </Box>
            

            <TextField 
            name="email"
              fullWidth 
              label='Email' 
              placeholder="Enter your email" 
              InputProps={{startAdornment: (<InputAdornment position="start">< MailOutlineIcon /></InputAdornment>), }}
              margin="normal"
              variant="outlined"

            />

            <TextField 
            name="phone"
            fullWidth 
            label='Phone Number' 
            placeholder="Enter your phone number"
            InputProps={{startAdornment: (<InputAdornment position="start"><PhoneIcon /></InputAdornment>),}} 
            variant="outlined"

                 />

            <TextField 
            name="password"
            fullWidth 
            label='Password' 
            type='password' 
            placeholder="Enter your password" 
            variant="outlined"

            
            
            />


            <TextField 
            name="confirm"
              fullWidth 
              label='Confirm Password' 
              type='password' 
              placeholder="Confirm your password"
              variant="outlined"
              
              />
            
            <Button type='submit' backgroundColor="#2E4053" variant="contained" style={btnstyle} fullWidth>Sign up</Button>

            <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
                <Link href="/">I have an account</Link>
              </Typography>
            
            </Stack>
        
        </form>
        </div>
    </Paper>
</Grid>
</div>

</div>

<div className='imageback' style={{alignContent:"center",textAlign:"center",alignItems:"center",marginLeft:"120px"}}>
<div className='logotdf' style={{marginLeft:"0px"}}>
                        <img src={H2} width="220px"   alt="tdf"/>
                    </div>
           <Typography variant="h5" style={{textAlign:"center",alignItems:"center",fontFamily:"Quintessential",color:"#091f5b",fontSize:"xx-large"}}>
           From personal data to performance reviews, manage everything you need <br/> whether you're an employee or managing HR operations
           </Typography>
        </div>

</div>


</div>
  );
}

export default Register;
