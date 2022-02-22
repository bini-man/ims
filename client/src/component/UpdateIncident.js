import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import { useParams } from "react-router-dom";

export default function UpdateIncident() {
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  const [owner,setOwner]=useState('')
  const [status,setStatus]=useState('Store')
const token=localStorage.getItem('token');
let params = useParams();
  const incident_id= params.id
  console.log(incident_id)
  useEffect(()=>{
      axios.get(`http://localhost:3001/api/incident/${incident_id}`,{
          headers:{
              'auth-token':token
          }
      })
      .then(res=>{
          console.log(res.data)
        setName(res.data.incident_name)
        setDescription(res.data.incident_description)
        setOwner(res.data.incident_owner)
        setStatus(res.data.incident_status)
      })
  },[])
  console.log(name,description,owner,status)
  const hadelclick =() =>{
  
    let data={
            "name":name,
            "description":description,
            "owner":owner,
            "status":status
    }
         
    
    axios.post(`http://localhost:3001/api/update_incident/${incident_id}`,data, {
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
      <Typography color='primary' variant='h3'>Update Incident</Typography>
      <TextField value={name } onChange={(e)=>setName(e.target.value)} variant="outlined" className={classes.field} required label="Incident Name"   color='primary' /> <br/><br/>
      <TextField value={owner} onChange={(e)=>setOwner(e.target.value)} variant="outlined" required label="Incident Owner" className={classes.field}  color='primary' /> <br/><br/>
      <TextField multiline minRows={4} value={description} onChange={(e)=>setDescription(e.target.value)} variant="outlined" required label="Incident Description" className={classes.field}  color='primary' /> <br/><br/>
      <FormControl className={classes.field}>
        <FormLabel>Incident Status</FormLabel>
        <RadioGroup value={status } onChange={(e) =>setStatus(e.target.value)}>
            <FormControlLabel value="Store" control={<Radio />} label="Store" />
            <FormControlLabel value="Operational" control={<Radio />} label="Operational"/>   
            <FormControlLabel value="Retired" control={<Radio />} label="Retired" />
            <FormControlLabel value="Unknown" control={<Radio />} label="Unknown"/> 
        </RadioGroup>
        </FormControl>
        <br/>
   <Button color="secondary"  type="submit" variant="contained" onClick={hadelclick}>Update</Button>
      </Grid>          
      {/* </Grid> */}
    </div>
  )
}
