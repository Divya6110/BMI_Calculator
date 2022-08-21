const express=require('express')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',function(req,res){
    res.sendFile(__dirname+"/bmi.html")
})
app.post('/', function(req, res){
    const h = parseFloat( req.body.height)
    const w = parseFloat( req.body.weight)
    var bmi = w /(h*h)
    bmi= bmi.toFixed()
    const req_name=req.body.Name
    res.send(`<h1>Hello ${req_name}, 
    Your BMI Around:${bmi} kg/m^2</h1>`)
    
    
})
app.listen(4000, function(req, res){
    console.log("Server Running Successfully ...")


})
