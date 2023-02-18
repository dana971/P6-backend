const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const mongooseError = require('mongoose-mongodb-errors');


/**
 * Modèle de l'objet User
 */
const userSchema = mongoose.Schema ({
    email : {type: String, required: true, unique: true},
    password: {type: String, required: true }
});

userSchema.plugin(mongooseError);
// Plugin de validation du schema
//Permet de valider l'unicité d'un mail
userSchema.plugin(validator);
module.exports = mongoose.model('user', userSchema);