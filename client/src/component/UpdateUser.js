import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import {useLocation} from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function UpdateUser() {
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [role,setRole]=useState('')
  const [password,setPassword]=useState('')
  const [cpassword,setCpassword]=useState('')

 const token=localStorage.getItem('token');
 let params = useParams();
  const user_id= params.id
  console.log(user_id)
  useEffect(()=>{
      axios.get(`http://localhost:3001/api/user/${user_id}`,{
          headers:{
              'auth-token':token
          }
      })
      .then(res=>{
          console.log(res.data)
        setFirstName(res.data.first_name)
        setLastName(res.data.last_name)
        setEmail(res.data.email)
        setRole(res.data.role)
})
  },[])
  const hadelclick =() =>{
    let data={
      "first_name":firstName,
      "last_name":lastName,
      "email":email,
      "role":role
    }
    axios.post(`http://localhost:3001/api/update_user/${user_id}`,data, {
      headers: {
          'Content-Type': 'application/json',
          'auth-token':token
      }
  })
  .then(res =>{console.log(res.data)})
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
        <Typography color='primary' variant='h3'>Update User</Typography>
      <TextField value={firstName} onChange={(e)=>setFirstName(e.target.value)} variant="outlined" className={classes.field} required label="First Name"   color='primary' /> <br/><br/>
      <TextField value={lastName} onChange={(e)=>setLastName(e.target.value)} variant="outlined" required label="Last Name" className={classes.field}  color='primary' /> <br/><br/>
      <TextField value={email} onChange={(e)=>setEmail(e.target.value)} variant="outlined" required label="Email" className={classes.field}  color='primary' /> <br/><br/>
        <FormControl className={classes.field}>
        <FormLabel>Role</FormLabel>
        <RadioGroup value={role} onChange={(e) =>setRole(e.target.value)}>
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="Admin" control={<Radio />} label="Admin"/>   
           
        </RadioGroup>
        </FormControl>
        <br/>
   <Button color="secondary"  type="submit" variant="contained" onClick={hadelclick}>UPdate</Button>
      </Grid>          
      {/* </Grid> */}
    </div>
  )
}
