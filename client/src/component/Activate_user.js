import { Button, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Card, Grid, makeStyles } from '@material-ui/core'
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'

function Activate_user() {
  const useStyle=makeStyles((theme)=>{
    return{
    card:{
      borderRadius:'5px',
      margin:'10px',
      padding:theme.spacing(4)
    },
    root:{
      display:'flex'
    }
  }
  })
  const [users,setUsers]=useState([]);
  const classes=useStyle()
  const token=localStorage.getItem('token');
   useEffect(()=>{
    axios.get('http://localhost:3001/api/all_user',{
      headers: {
         'auth-token':token
      }
  })
    .then(res=> res.data)
    .then(data=>{setUsers(data)
    console.log(data)
    console.log(users)
    })
   
  }
  ,[])
 
  return (
    <div className={classes.root}>
       {/* <Grid container>
        <Grid item md={3}> */}
      <AdminDashboard/>
      {/* </Grid> */}
      
      <Grid container >
      <Grid item md={12} >
      <Typography color='primary' variant='h3'>Activate/Deactivate User</Typography>
      </Grid>
   {users.map(user=>(
    <Grid item md={4}>
     <Card  elevation={3} className={classes.card} key={user._id}>
       <CardHeader title={user.first_name}
                subheader={user.email}
               />
       <CardContent>
       <Typography variant="body" color="textSecondary">
        First name:{user.first_name}</Typography><br/>
        <Typography variant="body" color="textSecondary">   Last name:{user.last_name}</Typography><br/>
       <Typography variant="body" color="textSecondary">   Email:{user.email}</Typography><br/>
       <Typography variant="body" color="textSecondary">  Role:{user.role} </Typography><br/>
      {
               user.status=='active' ? <Button variant="contained" disableElevation color="secondary" fullWidth onClick={()=>{
                let data={
                    "status":'deactive'
                }        
                axios.post(`http://localhost:3001/api/active_deactive/${user._id}`,data, {
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token':token
                            }
                        })
                        .then(res =>{console.log(res.data)}) }}>Deactivate</Button>
               :<Button variant="contained" disableElevation color="primary" fullWidth onClick={()=>{
                let data={
                    "status":"active"
                }        
                axios.post(`http://localhost:3001/api/active_deactive/${user._id}`,data, {
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token':token
                            }
                        })
                        .then(res =>{console.log(res.data)}) }}>Activate</Button>
     }
       </CardContent>
       </Card>
      </Grid> 
   ))}
   </Grid> 
</div>
  )
}

export default Activate_user