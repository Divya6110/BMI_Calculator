const express=require('express');
const router=express.Router();

router.post('/profile', function(req, res,next){
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


module.exports=router;
