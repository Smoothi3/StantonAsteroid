var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ScoreSchema = new Schema({
    /*
    score:{
        type:String,
        required:true
    }
    */
   score: Number,
   name: String
})

mongoose.model('score', ScoreSchema)