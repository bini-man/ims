import { Button, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import { Card, Grid, makeStyles } from '@material-ui/core'
import { EditOutlined } from '@material-ui/icons';
import { DeleteOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import { useNavigate } from "react-router-dom";

function ManageUser() {
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
  const navigate = useNavigate();
  
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
  const hadeldelete = async (id)=>{
    console.log(id)
             axios.delete(`http://localhost:3001/api/user/${id}`, {
              headers: {
                                     'auth-token':token
               }
           })
           .then(res =>{console.log(res.data)})
    }
  return (
    <div className={classes.root}>
       {/* <Grid container>
        <Grid item md={3}> */}
      <AdminDashboard/>
      {/* </Grid> */}
      
      <Grid container >
      <Grid item md={12} >
      <Typography color='primary' variant='h3'>Manage User</Typography>
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
       <Typography variant="body" color="textSecondary">  Role:{user.role}</Typography><br/>
        <Typography variant="body" color="textSecondary">   Status:{user.status}</Typography><br/><br/>
        <Button variant="contained" color='primary' fullWidth onClick={()=>hadeldelete(user._id)}  startIcon={<DeleteOutlined />}>
  Delete
</Button><br/><br/>
<Button variant="contained" color='secondary' fullWidth startIcon={<EditOutlined />} onClick={()=>{
   console.log(user._id)
   navigate(`/update_user/${user._id}`)
}}>
  Edit
</Button>
       </CardContent>
       </Card>
      </Grid> 
   ))}
   </Grid> 
</div>
  )
}

export default ManageUser