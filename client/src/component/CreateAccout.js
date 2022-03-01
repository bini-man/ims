import { Backdrop, Box, Button, Container, Fade, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, Snackbar, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import AdminDashboard from './AdminDashboard'
import {useLocation} from 'react-router-dom';
import Modal from './Modal';
import { Alert } from '@mui/material';

export default function CreateAccout() {
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [role,setRole]=useState('')
  const [password,setPassword]=useState('')
  const [cpassword,setCpassword]=useState('')
  const [open, setOpen] = useState(false);
  const [message,setMessage]=useState('')
 const token=localStorage.getItem('token');
 const handleClose = () => setOpen(true);
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

  const hadelclick =() =>{
    if(password==cpassword){
    let data={
      "first_name":firstName,
      "last_name":lastName,
      "email":email,
      "role":role,
      "password":password
    }
    axios.post('http://localhost:3001/api/user_creat',data, {
      headers: {
          'Content-Type': 'application/json',
          'auth-token':token
      }
  })
  .then(res =>{setMessage(res.data)
  setOpen(true)})
}else{
  setMessage("the password and confirm password are not the same")
  setOpen(true)
}
  }
  const useStyle=makeStyles((theme)=>{
    return{
      root:{
        display: "flex"
      },
      page:{
        background:'#f9f9f9',
       
    },
    field:{
      width:'75%'
    }
  }
  })
  const classes=useStyle()
  return (
    <div className={classes.root}>
     
   
      {/* <Grid container>
        <Grid item md={3}> */}
      <AdminDashboard />
      {/* </Grid> */}
      <Grid item md={12} className={classes.page}>
        <Typography color='primary' variant='h3'>Create User</Typography>
      <TextField value={firstName} onChange={(e)=>setFirstName(e.target.value)} variant="outlined" className={classes.field} required label="First Name"   color='primary' /> <br/><br/>
      <TextField value={lastName} onChange={(e)=>setLastName(e.target.value)} variant="outlined" required label="Last Name" className={classes.field}  color='primary' /> <br/><br/>
      <TextField value={email} onChange={(e)=>setEmail(e.target.value)} variant="outlined" required label="Email" className={classes.field}  color='primary' /> <br/><br/>
      <TextField value={password} onChange={(e)=>setPassword(e.target.value)} variant="outlined" type='password' required label="Password" className={classes.field}  color='primary' /> <br/><br/>
      <TextField value={cpassword} onChange={(e)=>setCpassword(e.target.value)} variant="outlined" type='password' required label="Coniform Password" className={classes.field} color='primary' /><br/><br/>
      <FormControl className={classes.field}>
        <FormLabel>Role</FormLabel>
        <RadioGroup value={role} onChange={(e) =>setRole(e.target.value)}>
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="Admin" control={<Radio />} label="Admin"/>   
           
        </RadioGroup>
        </FormControl>
        <br/>
   <Button color="secondary"  type="submit" variant="contained" onClick={hadelclick}>Submit</Button>
      </Grid>          
              <Snackbar
  open={open}
  autoHideDuration={6000}
  onClose={handleClose}
  message={message}
 
/> 
    </div>
  )
}
