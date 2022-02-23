import { Backdrop, Box, Button, Fade, Grid, makeStyles, Modal, Typography } from '@material-ui/core'
import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const useStyle=makeStyles({
        img:{
            width:'100%',
            height:'140%',
            marginTop:'5px'
        },
        side:{
            marginTop:'5px',
            marginBottom:'20px'
        },
        form:{
           width:'80%',
            display:'flex',

        },
        forget:{
            alignContent:'end',
            marginTop:'25px',
           display:'flex'
        }
    })
    const classes=useStyle();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [logged,setLogged]=useState('')
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const token=localStorage.getItem('token');

useEffect(()=>{
    if(token) navigate('/create_account')
},[])
    const handleClose = () => setOpen(false);
    let data={
        "email":email,
        "password":password
        
       }
    const  handelclick=  (e) => {
        e.preventDefault()
        setOpen(false);
           axios.post('http://localhost:3001/api/login',data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                // console.log(res)
                // console.log(res.data)
                if(res.data=='email not exists'){
                    setLogged(res.data)
                     setOpen(true);
                }
                if(res.data=='invalid password'){
                    setLogged(res.data)
                   setOpen(true);
                }
                if(res.data.startsWith('ey')){
                  localStorage.setItem('token',res.data)
                    navigate('/create_account',{state:{header:res.data}})
            }
            })
    }
  return (
        <Grid container>
            <Grid item md={6} xs={12}>
                    <img src='/bg.png' alt='incident 'className={classes.img} /> 
            </Grid>
            <Grid item md={6} xs={12} className={classes.side}>
                
                    <Typography variant='h5' color='primary' className={classes.side}>
                    Sign In To IMS
                    </Typography>
                    <form onSubmit={handelclick}>
                    <TextField value={email} onChange={(e)=>setEmail(e.target.value)} variant="outlined" required label="Email"   color='primary' className={classes.form}/> <br/><br/>
                    <TextField value={password} onChange={(e)=>setPassword(e.target.value)} type='password' variant="outlined" required label="Password"  color='primary' className={classes.form}/>
                      <Typography variant='h5' color='primary' className={classes.forget} > Forget Password?</Typography>
                      <Button color='secondary' variant="contained"  type="submit" >Login</Button>
                      </form>
                      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
             Notification
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {logged}
            </Typography>
          </Box>
        </Fade>
      </Modal>
                
               
            </Grid>
        </Grid>
  )
}
