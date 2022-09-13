var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	//unique_id:String,
	EMAIL: String,
	PASSWORD: String,
	user_data:Array,
	WEIGHT:String,
    HEIGHT:String,
    AGE:String,
    DATE:Date,
    BMI:String,
    BMI_DESC:String              
 })
User = mongoose.model('user1', userSchema);
module.exports = User;