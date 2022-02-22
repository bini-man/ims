const mongoose=require('mongoose')

const IncidentSchema = new mongoose.Schema({
    incident_name:{
        type:String
        
    },
    incident_description:{
        type:String
       
    },
    incident_owner:{
        type:String
    },
    incident_created_date:{
        type:Date,
        default: Date.now
    },
    incident_created_by:{
        type:String
    },
    incident_status:{
        type:String
    },
    incident_assigned_to:{
        type:String
    }
}) 
module.exports=mongoose.model('Incident',IncidentSchema)