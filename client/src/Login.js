import { EditAttributesOutlined } from '@material-ui/icons'
import { Button, TextField, Typography } from '@mui/material'

import React from 'react'
import bg from './assets/bg.png'
export default function Login() {
    const mystyle = {
            width:'50%',
            height:'600px',
            borderRadius:'35px',
            float:'left',
            marginTop:'8px',
           
    }
    const color_style = {
        color:'#A7E2F4',
        fontSize:'36px',
        fontFamily:'Salsa',
        marginTop:'168px',
        float:'left',
        align:'left',
        marginLeft:'140px'
    }
    const user_field={
        marginTop:'248px',
        marginLeft:'-100px',
        float:'left',
        align:'left',
        color:'#A7E2F4',
    }
    const pass_field={
        marginTop:'40px',
        marginLeft:'258px',
        float:'left',
        align:'left',
        color:'#A7E2F4',
    }
    const forget_pass={
        marginTop:'40px',
        marginLeft:'298px',
        float:'right',
        align:'right',
        color:'black',
    }
    const butt={
        marginTop:'35px',
        marginLeft:'350px',
        float:'left',
        align:'left',
    }
  return (
      <div>
          <div>
   <img src={bg} style={mystyle} />
   </div>
   <div>
   <Typography variant="h1" component="h2" style={color_style} >
Sign In To IMS
</Typography>
<TextField label="Email"  style={user_field} focused placeholder='please enter your email' />
<TextField label="Password"  style={pass_field} focused placeholder='******' />
<Typography  style={forget_pass}  >
Forget Password ?
</Typography>
<Button variant="contained"  ><EditAttributesOutlined/> Login</Button>
   </div>

</div>
  )
}
