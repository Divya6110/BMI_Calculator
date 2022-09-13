const express=require('express');
const router=express.Router();
router.get('/history',function(req,res){
    email=req.query.EMAIL
    User.findOne({EMAIL:email},function(err,data){
        if (err) throw err;
        else
        res.send(data.user_data)
    })
})

module.exports=router;