const mongoose = require('mongoose')
const {Schema} = mongoose;

const projectSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    languages:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    projectImg:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    
}) 
const projects = mongoose.model("projects",projectSchema)
module.exports = projects