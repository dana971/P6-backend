
//Import du model Sauce
const Sauce = require('../models/sauces');
const fs = require("fs");

/**
 * Fonction d'affichage des sauces
 * @param req
 * @param res
 * @param next
 */
exports.displaySauces= (req, res, next) => {
    Sauce.find()
       .then((sauces) => {res.status(201).json(sauces)}, )
       .catch((error) => {res.status(400).json({error})});
}

/**
 *Fonction d'affichage d'une sauce grâce à son id
 * @param req
 * @param res
 */
exports.displayOneSauce=(req, res,) => {
   // On vérifie que l'id de la sauce est le meme que celui du paramètre
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {res.status(200).json(sauce);})
        .catch((error) => {res.status(404).json({error: error});
});
};

/**
 *Fonction de création d'une sauce
 * @param req
 * @param res
 * @constructor objet sauce
 */
exports.CreateSauce=(req, res,) => {
    const sauceObject =JSON.parse(req.body.sauce);
    delete sauceObject._id;

    //Création d'une instance du modèle Sauce
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    //Enregistrement de la sauce dans la base de donnée
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistrée'}))
        .catch(error => res.status(400).json({error}));
};

/**
 *Fonction de MAJ d'une sauce et de son image
 * @param req
 * @param res
 * @param next
 * @constructor
 */
exports.UpdateSauce = (req, res, next) => {
    // On vérifie si l'objet Sauce existe et s'il a un champ file
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    // On supprime le userId de la requête
    delete sauceObject.userId;

// On vérifie que l'id de la sauce est le meme que celui du paramètre
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            //On vérifie que l'id du User === l'id du créateur de la sauce
            if (sauce.userId !== req.auth.userId) {
                res.status(401).json({ message : 'Modification non autorisée'});
            } else {
                //Nous récupérons le nom de l'image dans le champ imageUrl
                const filename = sauce.imageUrl.split('/images')[1];
                // Nous supprimons notre image grace a unlink
                fs.unlink(`images/${filename}`, () =>{
                    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                        .then(() => res.status(200).json({message : 'Objet modifié!'}))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => {res.status(400).json({ error });
        });
};

/**
 * Suppression d'une sauce de la base de donnée et de son image
 * @param req
 * @param res
 */
exports.deleteSauce = (req, res,) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            //On vérifie que l'id du User === l'id du créateur de la sauce
            if (sauce.userId !== req.auth.userId) {
                res.status(401).json({message: 'Suppression non autorisé'});
            } else {
                //Nous récupérons le nom de l'image dans le champ imageUrl
                const filename = sauce.imageUrl.split('/images')[1];
                // Nous supprimons notre image grace a unlink
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => {res.status(200).json({message:'Objet supprimé'})})
                        .catch(error => {res.status(401).json({error})});
                    });
                }
            })
        .catch(error => {res.status(400).json({error});
        });
};


/**
 *Fonction de like d'une sauce
 * @param req
 * @param res
 */
exports.likeSauce = (req, res,) => {
    if ( req.body.like === 1) {
        // increment like -> $inc
        Sauce.updateOne(
            {_id: req.params.id},
            { $inc : {likes : 1}, $push : { usersLiked : req.body.userId}})
            .then(() => res.status(200).json({message : 'Sauce likée !'}))
            .catch(error => res.status(401).json({ error }));
        // ajouter le userId dans le tableau de userLiked -> $push

    } else if(req.body.like === -1)
    {
        // increment dislike -> $inc
        Sauce.updateOne(
            {_id: req.params.id},
            { $inc : {dislikes : 1}, $push : { usersDisliked : req.body.userId}})
            .then(() => res.status(200).json({message : 'Sauce Dislikée !'}))
            .catch(error => res.status(401).json({ error }));
            // ajouter le userId dans le tableau de userLiked -> $push

    } else if (req.body.like === 0) // on annule le vote du User
    {
        Sauce.findOne({_id: req.params.id}) // trouve la sauce à partir de son id/
            //si like ou dislike === 0 $pull UserdId
            .then((sauce) => {
                if(sauce.usersLiked.includes(req.body.userId) ){
                    // si le userid est dans le tableau userliked j'actualise son like
                    Sauce.updateOne(
                        {_id: req.params.id},
                        {$inc : {likes : -1}, $pull: {usersLiked : req.body.userId }})
                        .then(() => res.status(200).json({message: 'like comptabilisé'}))
                        .catch(error => res.status(401).json({error}));
                } else if(sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        {_id: req.params.id},
                        {$inc : {dislikes : -1}, $pull: {usersDisliked : req.body.userId}})
                        .then(() => res.status(200).json({message: 'Dislike comptabilisé'}))
                        .catch(error => res.status(401).json({error}));
                }
            })
            .catch(error => res.status(401).json({error}));

    }
}



