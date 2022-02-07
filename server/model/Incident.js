const mongoose=require('mongoose')

const IncidentSchema = new mongoose.Schema({
    incident_name:{
        type:String,
        required:true,
        min:6
    },
    incident_description:{
        type:String,
        required:true,
        min:6
    },
    incident_owner:{
        type:String,
        required:true,
        min:6
    },
    incident_created_date:{
        type:Date,
        default: Date.now
    },
    incident_created_by:{
        type:String,
        required:true,
        min:6
    },
    incident_status:{
        type:String,
        required:true,
    },
    incident_assigned_to:{
        type:String
    }
}) 
module.exports=mongoose.model('Incident',IncidentSchema)