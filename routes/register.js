const express=require('express');
const router=express.Router();

router.post('/register',  function(req, res){
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


module.exports=router;