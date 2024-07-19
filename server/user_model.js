//Tokens - when a user logs in, a token might be generated and stored in this array
//Tokens can also be used to manage permissions. Different tokens can represent different levels of access or different roles within the application.
const mongoose = require('mongoose')
const validator = require('validator')

const schema = mongoose.Schema;

const userschema = new schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){                       //This parameter represents the value being set for the email field.
            if(!validator.isEmail(value)){              //returns true if its in proper email format else false
                throw new Error("Not valid Email")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String
        }
    }]                
},{timestamps:true})



const Usermodel = mongoose.model('user',userschema)

module.exports = Usermodel;