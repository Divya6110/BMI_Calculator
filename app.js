var express = require('express')
var bodyparser = require('body-parser')
var mongoose = require('mongoose')
var User = require('./models/user');
var app = express()
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
mongoose.connect('mongodb://localhost:27017/mydb',{  //connecting database
    useNewUrlParser: true,
    useUnifiedTopology: true                     
});
var db = mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))
app.post('/register',  function(req, res){
console.log(req.body);
var personInfo = req.body;
if(!personInfo.EMAIL || !personInfo.PASSWORD || !personInfo.CONFIRM_PASSWORD){
    res.send("Enter values")
    } else {
        if (personInfo.PASSWORD == personInfo.CONFIRM_PASSWORD) {
            User.findOne({EMAIL:personInfo.EMAIL}, function(err,data){
            if(!data){
                User.findOne({}, function(err,data){
                    var newPerson = new User({
                    EMAIL:personInfo.EMAIL,
                    PASSWORD: personInfo.PASSWORD,
                    });
                    newPerson.save(function(err, Person){
                    if(err)
                        console.log(err);
                    else
                        console.log('Success');
                    });
                    }).sort({_id: -1}).limit(1);
                      // res.send('you are registered')
                      
                   // res.sendFile(__dirname+"/public/login.html")
            res.redirect('/login')
                        
                    }else{
                        res.send("Email is already used.");
                    }   
                });
            }else{
                res.send("password is not matched");
            }
        }
})
app.post('/login', function (req, res, next) {
	User.findOne({EMAIL:req.body.EMAIL},function(err,data){
		if(data){
			
			if(data.PASSWORD==req.body.PASSWORD){
                
               // res.sendFile(__dirname+"/public/profile.html")
                res.redirect('/profile')

				
			}else{
				res.send("Wrong password!");
			}
		}else{
			res.send("This Email Is not regestered!");
		}
	});
});
app.post('/profile', function(req, res,next){
    email=req.body.EMAIL

    var w=parseFloat(req.body.WEIGHT);
        var h=parseFloat(req.body.HEIGHT);
        bmi = w /(h*h)
        bmi= bmi.toFixed(2)
        var bmi_d 
        if(bmi<18.5){
                bmi_d="UnderWeight"
            }
            else if(bmi>=18.5&&bmi<=24.9){
                bmi_d="Normal Weight"
            }
            else if(bmi>=25&&bmi<=29.9){
                bmi_d="OverWeight"
            }
            else {
                bmi_d="Obesity"
            }
        
var temp_user_data = []
User.findOne({EMAIL:email},function(err,data){
        if (err) throw err;
        else
console.log(data.user_data.length)
    if(data.user_data.length==0){

         temp_user_data = [{WEIGHT:w,HEIGHT:h,AGE:req.body.AGE,DATE:req.body.DATE,BMI:bmi,BMI_DESC:bmi_d}]
        console.log(w,h)
        
    }
    else{

        temp_user_data = data.user_data

        temp_user_data.push({WEIGHT:w,HEIGHT:h,AGE:req.body.AGE,DATE:req.body.DATE,BMI:bmi,BMI_DESC:bmi_d})
    }
    console.log(typeof(temp_user_data))
    console.log(email)
    const us=User.updateOne({EMAIL:email}, {$set:{user_data:temp_user_data}},function(){
        //res.send(data.user_data)
res.send(temp_user_data)
    })

   })
 })
app.get('/history',function(req,res){
    email=req.query.EMAIL
    User.findOne({EMAIL:email},function(err,data){
        if (err) throw err;
        else
        res.send(data.user_data)
    })
})
app.listen(4000, function(req, res){  

    console.log("Server Running Successfully ...")
})
