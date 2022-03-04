import React, { useEffect } from 'react'
import {Navigate, useNavigate } from 'react-router'

export default function Logout() {
 console.log("biniyam")
localStorage.removeItem("token")
const navigate=useNavigate()
console.log("deleted now going to login")
useEffect(()=>{
navigate('/login')
})
return(
   <div>logout</div> 
)
}
