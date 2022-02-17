import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { TextField } from '@mui/material';
import { width } from '@mui/system';
import React from 'react'

export default function Login() {
    const useStyle=makeStyles({
        img:{
            width:'100%',
            height:'140%',
            marginTop:'5px'
        },
        side:{
            marginTop:'5px'
        },
        form:{
            marginTop: 20,
            marginBottom: 20,
            display:'block'
        }
    })
    const classes=useStyle();
  return (
        <Grid container>
            <Grid item md={6} >
                    <img src='/bg.png' className={classes.img} /> 
            </Grid>
            <Grid item md={6} className={classes.side}>
                <Paper elevation={0}>
                    <Typography variant='h5' color='primary' >
                    Sign In To IMS
                    </Typography>
                    <TextField variant="outlined" required label="Email" fullWidth color='secondary' className={classes.form}/>
                    
                    
                    <TextField variant="outlined" required label="Password" fullWidth color='secondary' className={classes.form}/>
                      
                </Paper>
            </Grid>
        </Grid>
  )
}
