import React from 'react';

import { TextField, Button, Typography, createTheme,Avatar,Link,Paper} from '@mui/material';
import Grid from '@mui/system/Grid';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Checkbox from '@mui/material/Checkbox';
import H2 from "../images/H2.png"




const theme = createTheme({
    spacing: 4,
  });

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing,
  },
}));


function Login (){


  const paperStyle={padding :25,height:'55vh',width:440, margin:"45px auto"}
    const avatarStyle={backgroundColor: '#1025a1'}
    const btnstyle={margin:'8px 0',backgroundColor:'#1025a1',height:45}

   

    return(

        
    <div className='login' style={{marginTop:'0px'}}>
    <div className='loginfront' style={{display:'flex'}}>

  

        <div className='logoform' style={{paddingLeft:"120px",marginTop:"0px"}}>


            <div  style={{position: "relative",marginTop:"140px",marginLeft:"0px",height:'400px',width:'520px'}}>

            <Grid>
            <Paper elevation={6} style={paperStyle}>
                <Grid align='center'>
                <Avatar style={avatarStyle} ><LockOutlinedIcon  size='large' /></Avatar>
                    <h2>Sign In</h2>
                </Grid>


                <form >
                <Stack spacing={2} >

                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email" 
                  fullWidth
                  margin="normal"
                  variant="outlined"
                 
                    />

                <TextField 
                name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  />    
                    
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' backgroundColor="#2E4053" variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="/register" >
                        Sign Up 
                </Link>
                </Typography>
                </Stack>
                </form>
            </Paper>
        </Grid>
</div>

</div>

<div className='imageback' style={{alignContent:"center",textAlign:"center",alignItems:"center",marginLeft:"80px"}}>
<div className='logotdf' style={{marginLeft:"0px"}}>
                        <img src={H2} width="220px"   alt="tdf"/>
                    </div>
           <Typography variant="h5" style={{textAlign:"center",alignItems:"center",fontFamily:"Quintessential",color:"#091f5b",fontSize:"xx-large"}}>
           From personal data to performance reviews, manage everything you need <br/> whether you're an employee or managing HR operations
           </Typography>
        </div>

</div>


</div>


       
    )

}

export default Login;

/*
 <Container>
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={6}>
            <div className={classes.form}>
              <Typography variant="h4" align="center" gutterBottom>
                Register
              </Typography>
              <form onSubmit={onSubmit}>
                
                
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={onChangeHandler}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={onChangeHandler}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                
                <Button type="submit" variant="contained" color="primary">
                  SIGN IN
                </Button>
                <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
                  <Link to="/login">I don't have an account</Link>
                </Typography>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>

*/