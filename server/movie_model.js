const mongoose = require('mongoose')


const schema = mongoose.Schema;

const movieschema = new schema({
    userid:{
        type:String,
        required:true
    },
    moviename:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    publish:{
        type:Number,
        required:true
    }
},{timestamps:true})            //when a movie is created by default the time will be entered to database

const Moviesmodel = mongoose.model('movie',movieschema)
module.exports = Moviesmodel