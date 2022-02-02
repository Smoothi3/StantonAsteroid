var express = require('express')
var app = express()
var path = require('path')
var bodyparser = require('body-parser')
var mongoose = require('mongoose')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/scoreEntries',{
    useNewURLParser:true
}).then(function(){
    console.log("Connected to Mongo DB Database");
}).catch(function(err){
    console.log(err)
})

require('./models/Score')
var Score = mongoose.model('score')

//Right now saving score redirects the page
app.post('/saveScore', function(req, res){
    console.log("Request Made")
    console.log(req.body)
    new Score(req.body).save().then(function(){
        res.redirect('highScore.html')
    })
})

app.get('/getData', function(req,res){
    Score.find().sort({score:-1}).then(function(score){
        console.log("Retrieving Scores")
        res.json({score})
    })
    
})

app.post('/deleteScore', function(req, res){
    console.log("Score Deleted", req.body._id)
    Score.findByIdAndDelete(req.body._id).exec()
    res.redirect('highScore.html')
})

app.use(express.static(__dirname+"/views"))
app.listen(5000, function(){
    console.log("Listening on Port 5000")
})