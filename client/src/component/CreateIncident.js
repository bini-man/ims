import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import AdminDashboard from './AdminDashboard'

export default function CreateIncident() {
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  const [owner,setOwner]=useState('')
  const [status,setStatus]=useState('Store')
const token=localStorage.getItem('token');
  
  const hadelclick =() =>{
    console.log(name,description,owner,status)
    let data={
            "name":name,
            "description":description,
            "owner":owner,
            "status":status
    }
         
    
    axios.post('http://localhost:3001/api/incident_creat',data, {
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
      <Typography color='primary' variant='h3'>Create Incident</Typography>
      <TextField value={name} onChange={(e)=>setName(e.target.value)} variant="outlined" className={classes.field} required label="Incident Name"   color='primary' /> <br/><br/>
      <TextField value={owner} onChange={(e)=>setOwner(e.target.value)} variant="outlined" required label="Incident Owner" className={classes.field}  color='primary' /> <br/><br/>
      <TextField multiline minRows={4} value={description} onChange={(e)=>setDescription(e.target.value)} variant="outlined" required label="Incident Description" className={classes.field}  color='primary' /> <br/><br/>
      <FormControl className={classes.field}>
        <FormLabel>Incident Status</FormLabel>
        <RadioGroup value={status} onChange={(e) =>setStatus(e.target.value)}>
            <FormControlLabel value="Store" control={<Radio />} label="Store" />
            <FormControlLabel value="Operational" control={<Radio />} label="Operational"/>   
            <FormControlLabel value="Retired" control={<Radio />} label="Retired" />
            <FormControlLabel value="Unknown" control={<Radio />} label="Unknown"/> 
        </RadioGroup>
        </FormControl>
        <br/>
   <Button color="secondary"  type="submit" variant="contained" onClick={hadelclick}>Submit</Button>
      </Grid>          
      {/* </Grid> */}
    </div>
  )
}
