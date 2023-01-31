const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema ({
    email : {type: String, required: true },
    password: {type: String, required: true }
});

userSchema.plugin(validator);
module.exports = mongoose.model('user', userSchema);