const mongoose = require('mongoose')

const schema = mongoose.Schema;

const movieratingschem = new schema({
    userid:{
        type:String,
        required:true
    },
    movieid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const Movieratingmodel = mongoose.model('rating',movieratingschem)

module.exports = Movieratingmodel