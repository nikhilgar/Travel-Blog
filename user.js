// const joi=require('joi')
// const mongoose=require('mongoose')
// const user=mongoose.model('User',new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         minlength:5,
//         maxlength:50
//     },
//     email:{
//         type:String,
//         required:true,
//         minlength:5,
//         unique:true,
//         maxlength:50
//     },
//     password:{
//         type:String,
//         required:true,
//         minlength:5,
//         maxlength:50,
//         unique:true
//     }
// }));
// function validateUser(user){
//     const Schema={
//         name:joi.string.min(5).max(50).required(),
//         email:joi.string.min(5).max(50).required().email(),
//         password:joi.string.min(5).max(50).required()
//     };
//     return joi.validate(user,Schema);
// }
// exports.user=user;
// exports.validateUser=validateuser;