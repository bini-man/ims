import { CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { Card, Grid, makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'

function AssignIncident() {
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
  const [incident,setIncident]=useState([]);
  const classes=useStyle()
const token=localStorage.getItem('token');
const [email,setEmail]=useState([])
   useEffect(()=>{
    axios.get('http://localhost:3001/api/all_unassigned',{
      headers: {
         'auth-token':token
      }
  })
    .then(res=> res.data)
    .then(data=>{setIncident(data)
    console.log(data)
    console.log(incident)
    })
    axios.get('http://localhost:3001/api/all_user',{
      headers: {
         'auth-token':token
      }
  })
    .then(res=> res.data)
    .then(data=>{setEmail(data)
    })
   
  }
  ,[])
const handleChange =(event)=>{
setEmail(event.target.value)
}
  return (
    <div className={classes.root}>
       {/* <Grid container>
        <Grid item md={3}> */}
      <AdminDashboard/>
      {/* </Grid> */}
      
      <Grid container >
      <Grid item md={12} >
      <Typography color='primary' variant='h3'>Assign Incident</Typography>
      </Grid>
   {incident.map(incidents=>(
    <Grid item md={4}>
     <Card  elevation={3} className={classes.card} key={incidents._id}>
       <CardHeader title={incidents.first_name}
                subheader={incidents.email}
               />
       <CardContent>
       <Typography variant="body" color="textSecondary">
        Incident name:{incidents.incident_name}</Typography>
        <Typography variant="body" color="textSecondary">   Incident description:{incidents.incident_description}</Typography>
       <Typography variant="body" color="textSecondary">   Owner:{incidents.incident_owner}</Typography>
       <Typography variant="body" color="textSecondary">  Created by:{incidents.incident_created_by}</Typography>
        <Typography variant="body" color="textSecondary">  Incident Status:{incidents.incident_status}</Typography>
       
       
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Select an Email</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    onChange={handleChange}
    label="email"
    value={email}
  >
    {
      email.map(emails=>(
        <MenuItem value={emails.email}  >{emails.email}</MenuItem>
      ))
    }
   
  </Select>
</FormControl>
       </CardContent>
       </Card>
      </Grid> 
   ))}
   </Grid> 
</div>
  )
}

export default AssignIncident