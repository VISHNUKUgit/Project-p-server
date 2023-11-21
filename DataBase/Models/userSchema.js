const mongoose = require('mongoose')
const {Schema} = mongoose;
const validator = require('validator')

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        min:[3,'Must be at least 3,got{value}']
    },email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    github:{
        type:String,
        
    },
    linkedin:{
        type:String,
        
    },
    profile:{
        type:String,
        
    }
})
const users = mongoose.model('users',userSchema)
module.exports = users