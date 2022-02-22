const route= require('express').Router()
const Incident=require('../model/Incident')
const User = require('../model/User')
require("dotenv").config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verify = require('./Verify')

// for createing incident
route.post("/incident_creat", verify,async (req,res)=>{
    const user_id=req.user._id;
   
    User.findById({_id:user_id},(async function(err,result){
        if(err) return res.send(err)
       try {
        const incident = new Incident({
            incident_name:req.body.name,
            incident_description:req.body.description,
            incident_owner:req.body.owner,
            incident_created_by:result.email,
            incident_status:req.body.status,
            incident_assigned_to:''
        })
        const saved_incident=await incident.save()
        res.send(saved_incident)
    } catch (error) {
        res.send(error)
    }
    }))
   
})
// for creating user
route.post("/user_creat",  verify, async (req,res)=>{
    const email_check=await User.findOne({email:req.body.email})
    if(email_check) return res.send("email alredy exists")
    const salt= await bcrypt.genSalt(10)
    const hashPassword= await bcrypt.hash(req.body.password,salt)
    try {
        const user = new User({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            role:req.body.role,
            password:hashPassword,
            status:"active"
        })
        const saved_user=await user.save()
        res.send(saved_user)
    } catch (error) {
        res.send(error)
    }
})
// to see all user
route.get('/all_user', verify,(req,res)=>{
   
    User.find({},(function(err,result){
        if(err) return res.send(err)
        res.json(result)
    })
    )
})

// to see all incident
route.get('/all_incident', verify,(req,res)=>{
    Incident.find({},(function(err,result){
        if(err) return res.send(err)
        res.json(result)
    })
    )
})
// to return specific user
route.get('/user/:id',verify,(req,res)=>{
    const user_id= req.params.id;
    User.findById({_id:user_id},(function(err,result){
        if(err) return res.send(err)
        res.json(result)
    }))
})
// to return specific incident
route.get('/incident/:id', verify, (req,res)=>{
    const incident_id= req.params.id;
    Incident.findById({_id:incident_id},(function(err,result){
        if(err) return res.send(err)
        res.json(result)
    }))
})
// to Delete specific user
route.post('/user/:id',  verify,(req,res)=>{
    const user_id= req.params.id;
    User.findByIdAndDelete({_id:user_id},(function(err,result){
        if(err) return res.send(err)
        res.json("user successfuly deleted")
    }))
})
// to Delete specific incident
route.post('/incident/:id', verify, (req,res)=>{
    const incident_id= req.params.id;
    Incident.findByIdAndDelete({_id:incident_id},(function(err,result){
        if(err) return res.send(err)
        res.json("incident successfuly deleted")
    }))
})
// to update specific user information
route.post('/update_user/:id', verify, async (req,res)=>{
    const user_id= req.params.id;
    const salt= await bcrypt.genSalt(10)
    const hashPassword= await bcrypt.hash(req.body.password,salt)
    User.findByIdAndUpdate({_id:user_id},{
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            role:req.body.role,
            password:hashPassword,
            status:req.body.status
    },(function(err,result){
        if(err) return res.send(err)
        res.json("user information successfuly updated")
    }))
})
// to update specific incident information
route.post('/update_incident/:id', verify,(req,res)=>{
    const incident_id= req.params.id;
    Incident.findByIdAndUpdate({_id:incident_id},{
        incident_name:req.body.name,
        incident_description:req.body.description,
        incident_owner:req.body.owner,
        incident_created_by:req.body.created_by,
        incident_status:req.body.status
    },(function(err,result){
        if(err) return res.send(err)
        res.json("incident information successfuly updated")
    }))
})
//to login
route.post('/login',async (req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user) return res.send("email not exists")
    const valid_password= await bcrypt.compare(req.body.password,user.password)
    if(!valid_password) return res.send("invalid password")
    const token= jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token);
})
// to assign incidents to users
route.post('/assign_incident/:id', verify,(req,res)=>{
    const incident_id= req.params.id;
    const user_id=req.user._id
    User.findById({_id:user_id},(async function(err,result){
        if(err) return res.send(err)
        if(result.role=="admin"){
    Incident.findByIdAndUpdate({_id:incident_id},{
        incident_assigned_to:req.body.assigned_to
    },(function(err,result){
        if(err) return res.send(err)
        res.json("incident information successfuly updated")
    }))
}else{
    res.send("you don't have a previleage to assign incidents")
}
}))
})
//List of unassigned incidents
route.get('/all_unassigned',verify,(req,res)=>{
    const query={incident_assigned_to:''}
    Incident.find(query,(function(err,result){
        if(err) return res.send(err)
        
        res.json(result)
    }))
})
// incident's created by user's or assigned to them
route.get('/created_assigned', verify,(req,res)=>{
    const user_id=req.user._id
   
    User.findById({_id:user_id},( async function(err,result){
        if(err) return res.send(err)
        const query={incident_created_by:User.email}
        console.log(User.email) 
    Incident.find(query,(function(err,result){
        if(err) return res.send(err)
        
        res.json(result)
    }))
    }))
})
// Activate and Deactivate user
route.post('/active_deactive/:id', verify,(req,res)=>{
    const user_id= req.params.id;
    console.log(req)
    User.findByIdAndUpdate({_id:user_id},{
        status:req.body.status
    },(function(err,result){
        if(err) return res.send(err)
        res.json("User information successfuly updated")
    }))
})
module.exports=route;
