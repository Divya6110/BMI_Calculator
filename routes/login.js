const express=require('express');
const router=express.Router();

router.post('/login', function (req, res, next) {
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
module.exports=router;