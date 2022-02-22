import { Button, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Card, Grid, makeStyles } from '@material-ui/core'
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'

function ManageIncident() {
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

   useEffect(()=>{
    axios.get('http://localhost:3001/api/all_incident',{
      headers: {
         'auth-token':token
      }
  })
    .then(res=> res.data)
    .then(data=>{setIncident(data)
    console.log(data)
    console.log(incident)
    })
   
  }
  ,[])
 const hadeldelete =(id)=>{
 console.log(id)
          axios.post(`http://localhost:3001/api/incident/${id}`, {
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
      <Typography color='primary' variant='h3'>Manage Incident</Typography>
      </Grid>
   {incident.map(incidents=>(
    <Grid item md={4}>
     <Card  elevation={3} className={classes.card} key={incidents._id}>
       <CardHeader title={incidents.first_name}
                subheader={incidents.email}
               />
       <CardContent>
       <Typography variant="body" color="textSecondary">
        Incident name:{incidents.incident_name}</Typography><br/>
        <Typography variant="body" color="textSecondary">   Incident description:{incidents.incident_description}</Typography><br/>
       <Typography variant="body" color="textSecondary">   Owner:{incidents.incident_owner}</Typography><br/>
       <Typography variant="body" color="textSecondary">  Created by:{incidents.incident_created_by}</Typography><br/>
        <Typography variant="body" color="textSecondary">  Incident Status:{incidents.incident_status}</Typography><br/><br/>
        <Button variant="contained" color='primary' onClick={()=>{
         hadeldelete(incidents._id)
        }} fullWidth startIcon={<DeleteOutlined />}>
  Delete
</Button><br/><br/>
<Button variant="contained" color='secondary' fullWidth startIcon={<EditOutlined />}>
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


export default ManageIncident