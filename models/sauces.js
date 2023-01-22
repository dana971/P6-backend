const mongoose = require ('mongoose');
const validator = require('mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
    UserId:{type:String, Required:true, unique:true},
    name:{type:String},
    manufacturer:{type:String},
    description:{type:String},
    mainPepper:{type:String},
    imageUrl:{type:String},
    heat:{type:Number},
    likes:{type:Number},
    dislikes:{type:Number},
    usersLiked:[{type:String, UserId:true}],
    usersDisliked:[{type:String, UserId: true}],
});

sauceSchema.plugin(validator);
module.exports = mongoose.model('sauce', sauceSchema);