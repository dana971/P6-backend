// export de fonctions

const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


/**
 * Création de nouveaux utilisateurs
 * @param req
 * @param res
 * @param next
 */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //fonction hash pour crypter le mdp
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message:'Compte créé !'}))
                .catch(error => res.status(401).json({error}));
    })
    .catch(error => res.status(500).json({error}));
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
                return res.status(401).json({message: 'Unauthorized'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
                    if(!valid){
                        return res.status(402).json({message:'Unauthorized'});
                    }
                    res.status(200).json({
                        UserId: user._id,
                        token:jwt.sign(
                        { UserId: user._id},
                        'RANDOM_SECRET_TOKEN',
                        {expiresIn:'24h'}
                        )
                    });
                })
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(400).json({error}));
};