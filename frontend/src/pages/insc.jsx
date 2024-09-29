import React,{useState} from 'react' ;
import {Paper,Button,Box} from '@mui/material';
import login from "../images/login.png";
import tdf from "../images/tdf.png";
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { TextField } from '@mui/material';

import Grid from '@mui/system/Grid';



const Signup=()=>{

 
    return(
        <div className='register' style={{marginTop:'0px'}}>
            <div className='registerfront' style={{display:'flex'}}>

                <div className='imageback' style={{marginTop:"86px",marginLeft:"40px"}}>
                    <img src={login} width="500px" height="460px" alt="tdf"/>
                </div>

                <div className='logoform' style={{marginLeft:"200px",marginTop:"0px"}}>

                    <div className='logotdf' style={{position: "absolute",marginLeft:"40px"}}>
                        <img src={tdf} width="400px"   alt="tdf"/>
                    </div>

                    <div  style={{position: "relative",marginTop:"140px",marginLeft:"0px",height:'400px',width:'520px'}}>
                        <Grid align='center' >
                            <Paper>
                            <h2 style={{fontFamily:'Cormorant Garamond ',fontWeight:'bold',fontSize:'xx-large',color:'#C60F00' ,paddingTop:"10px"}} >
                                Inscription
                            </h2>
                                <div style={{marginLeft:"10px"}}>
                                <form>
                            
                                   
                                    <Box sx={{display:'flex',flexDirection:'column',width:'500px'}}>
        <div>
          <div  style={{display:'flex',justifyContent:'space-between',marginTop:'25px'}}>
           <TextField  name='nom' label='Nom' sx={{width: '25ch'}} 
         required />
           <TextField name='prenom' label='Prénom' sx={{width: '25ch'}}
                               required />
          </div>
          <div  style={{display:'flex',justifyContent:'space-between',marginTop:'25px'}}>
             
           <TextField   name="bureau" label='Bureau'  sx={{width: '25ch'}} 
                required 
          />
          
            <TextField name="tel" label='Tel' sx={{width: '25ch'}} 
                                 required />
        </div>
        </div>
        <div>
        <div  style={{display:'flex',justifyContent:'space-between',marginTop:'25px'}}> 
        <TextField  name='email' label='Email' sx={{width: '25ch'}}
                                 required  />
            <TextField name='password' label='mot de passe' type='password' style={{width: '25ch'}}
                                 required />
            
        
 
        </div>
        
        </div>
        </Box>
        
        <Button type="submit"  variant="contained" 
        style={{margin:'60px 0',width:"400px",height:"30px",backgroundColor:'#C60F00',borderRadius:'25px',color:'white',fontFamily:'Cormorant Garamond ',fontWeight:'bold',fontSize:'large'}}  >
     Inscription
      </Button>
                                    
                                </form>
                                </div>
                            </Paper>
                        </Grid>
                    </div>

                </div>
            </div>


        </div>
    )


}

export default Signup;