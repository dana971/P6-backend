const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

/**
 * Modèle de l'objet User
 * @type {*}
 */
const userSchema = mongoose.Schema ({
    email : {type: String, required: true },
    password: {type: String, required: true }
});

// ToDo: Commentaire
userSchema.plugin(validator);
module.exports = mongoose.model('user', userSchema);