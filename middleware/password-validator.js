const passwordValidator =require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8,'Password should be at least 8 charachters long')
    .is().max(20)
    .has().uppercase(2)
    .has().digits(2)
    .has().not().spaces();

module.exports = passwordSchema;