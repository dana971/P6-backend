const passwordValidator =require('password-validator');

/**
 * Paramétrage du format des mdp valide
 */
const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)
    .is().max(20)
    .has().uppercase(2)
    .has().digits(2)
    .has().not().spaces();

module.exports = passwordSchema;