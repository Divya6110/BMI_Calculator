const express = require('express')
const bodyparser = require('body-parser')
const User = require('./models/user');

const registerPath=require('./routes/register');
const loginPath=require('./routes/login');
const profilePath=require('./routes/profile')
const historyPath=require('./routes/history');

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mydb',{  //connecting database
    useNewUrlParser: true,
    useUnifiedTopology: true                     
});
const db = mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

const app = express()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.get('/register',function(req,res){
    res.sendFile(__dirname+"/public/register.html")
})
app.get('/login',function(req,res){
    res.sendFile(__dirname+"/public/login.html")
})
app.get('/profile',function(req,res){
    res.sendFile(__dirname+"/public/profile.html")
})

app.use(registerPath);
app.use(loginPath);
app.use(profilePath);
app.use(historyPath);

app.use(function(req,res,next){
    res.status(404).send('page not found')
})
app.listen(4000, function(req, res){  

    console.log("Server Running Successfully ...")
})
