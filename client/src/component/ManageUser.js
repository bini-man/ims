import { CardContent, CardHeader, Typography } from '@material-ui/core';
import { Card, Grid, makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'

function ManageUser() {
  const useStyle=makeStyles({
    card:{
      borderRadius:'5px',
      margin:'10px'
    }
  })
  const [users,setUsers]=useState([]);
  const classes=useStyle()
   useEffect(()=>{
    axios.get('http://localhost:3001/api/all_user')
    .then(res=> res.data)
    .then(data=>{setUsers(data)
    console.log(data)
    console.log(users)
    })
   
  }
  ,[])
 
  return (
    <div>
       <Grid container>
        <Grid item md={3}>
      <AdminDashboard/>
      </Grid>
  
   {users.map(user=>(
     <Grid md={3} xs={12}>
     <Card  elevation={3} className={classes.card} key={user._id}>
       <CardHeader title={user.first_name}
                subheader={user.email}
               />
       <CardContent>
       <Typography variant="body" color="textSecondary">
        First name:{user.first_name}</Typography>
        <Typography variant="body" color="textSecondary">   Last name:{user.last_name}</Typography>
       <Typography variant="body" color="textSecondary">   Email:{user.email}</Typography>
       <Typography variant="body" color="textSecondary">  Role:{user.role}</Typography>
        <Typography variant="body" color="textSecondary">   Status:{user.status}</Typography>
       </CardContent>
       </Card>
       </Grid> 
   ))}
    </Grid> 
</div>
  )
}

export default ManageUser