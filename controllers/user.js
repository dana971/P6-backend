// export de fonctions

const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passwordSchema = require('../middleware/password-validator');

/**
 * Création de nouveaux utilisateurs
 * @param req
 * @param res
 * @param next
 */
exports.signup = (req, res, next) => {
    //Avant d'enregistrer le user on vérifie que le psw soit conforme au schema
    if(!passwordSchema.validate(req.body.password)){
        res.status(401).json({message:'Votre mot de passe doit comporter 2 majuscules,2 nombres et aucun espace'})
    } else {
        bcrypt.hash(req.body.password, 10) //fonction hash pour crypter le mdp
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({message:'Compte créé !'}))
                    .catch(() => res.status(401).json({message:'Compte non enregistré'}));
            })
            .catch(error => res.status(400).json({error}));
    }

};



/**
 *Connexion des utilisateurs
 * @param req
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {
    User.findOne({email:req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({message: 'Veuillez verifier vos identifiants'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
                    if(!valid){
                        return res.status(402).json({message:'Veuillez verifier vos identifiants'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token:jwt.sign(
                        { userId: user._id},
                        process.env.JWT_USER_TOKEN,
                        {expiresIn:'24h'}
                        )
                    });
                })
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(400).json({error}));
};