const mongoose = require ('mongoose');

/**
 * Modèles de l'objet Sauce
 * @type {*}
 */
const sauceSchema = mongoose.Schema({
    userId:{type:String, Required:true},
    name:{type:String, Required:true},
    manufacturer:{type:String, Required:true},
    description:{type:String, Required:true},
    mainPepper:{type:String, Required:true},
    imageUrl:{type:String, Required:true},
    heat:{type:Number, Required:true},
    likes:{type:Number, default:0},
    dislikes:{type:Number, default:0},
    usersLiked:{type:[String]},
    usersDisliked:{type:[   String]},
});

module.exports = mongoose.model('sauce', sauceSchema);