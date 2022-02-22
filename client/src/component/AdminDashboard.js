import { Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core'
import { AirplanemodeActiveOutlined, CreateOutlined } from '@material-ui/icons'
import { EditAttributesOutlined } from '@material-ui/icons'
import { AssignmentIndOutlined } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

function AdminDashboard() {
    const drawerwidth = 260

    const item=[{
            text:'Create Account',
            path:'/create_account',
            key:1,
            icon: <CreateOutlined color="secondary"/>,
    },
    {
        text:'Manage Account',
        path:'/manage_account',
        key:2,
        icon: <EditAttributesOutlined color="secondary"/>,
},
{
    text:'Create Incident',
    path:'/create_Incident',
    key:3,
    icon: <CreateOutlined color="secondary"/>,
},
{
    text:'Manage Incident',
    path:'/manage_incident',
    key:4,
    icon: <EditAttributesOutlined color="secondary"/>,
},
{
    text:'Assign Incident',
    path:'/assign_incident',
    key:5,
    icon: <AssignmentIndOutlined color="secondary"/>,
},
{
    text:'Deactivate/Activate User',
    path:'/activate_user',
    key:6,
    icon: <AirplanemodeActiveOutlined color="secondary"/>,
}]
const navigate=useNavigate()
const location=useLocation()
const useStyles=makeStyles({
    active:{
        background:'#f4f4f4'
    },
    // root:{
    //     display:'flex'
    // },
    drawerpaper:{
        width:drawerwidth
    },
    drawer:{
        width:drawerwidth
    },
})
const classes=useStyles()
const token=localStorage.getItem('token');

useEffect(()=>{
    if(!token) navigate('/login')
},[])
  return (
    <div >
       
        <Drawer  variant="permanent" classes={{ paper: classes.drawerpaper}}anchor="left" className={classes.drawer}>
            <Typography variant='h6' color='primary'>Admin Dashboadrd</Typography>
            <List>
                {item.map(items=>(
                    <ListItem key={items.key} button onClick={()=> navigate(items.path)} className={location.pathname==items.path? classes.active:null} >
                       
                        <ListItemIcon>
                            {items.icon}
                        </ListItemIcon>
                            <ListItemText primary={items.text} color='secondary'/>
                                
                          
                    </ListItem>
                ))}
            </List>
               
        </Drawer >
    </div>
  )
}

export default AdminDashboard