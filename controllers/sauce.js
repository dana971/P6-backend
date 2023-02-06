const Sauce = require('../models/sauces');
const fs = require("fs");

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.displaySauces= (req, res, next) => {
   Sauce.find()
       .then((sauces) => {res.status(201).json(sauces)})
       .catch((error) => {res.status(400).json({error});
});

};

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.displayOneSauce=(req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {res.status(200).json(sauce);})
        .catch((error) => {res.status(404).json({error: error});
});
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @constructor
 */
exports.CreateSauce=(req, res, next) => {
    const sauceObject =JSON.parse(req.body.sauce);
    delete sauceObject._id;
    //delete sauceObject.userId;
    const sauce = new Sauce({
        ...sauceObject,
        //userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistrée'}))
        .catch(error => res.status(400).json({error}));
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @constructor
 */
exports.UpdateSauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    console.log(req.body);

    delete sauceObject.userId;

    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId !== req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                const filename = sauce.imageUrl.split('/images')[1];
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
 *Fonction de suppression de sauce et d'image du back-end
 * @param req
 * @param res
 * @param next
 */
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if (sauce.userId !== req.auth.userId) {
                res.status(401).json({message: 'Suppression non autorisé'});
            } else {
                const filename = sauce.imageUrl.split('/images')[1];
                fs.unlink(`images/${filename}`, () => {
                        Sauce.deleteOne({_id: req.params.id})
                            .then(() => {res.status(200).json({message:'Objet supprimé'})})
                            .catch(error => {res.status(401).json({error})});
                    });
                }
            })
        .catch(error => {res.status(500).json({error});

        });

    };


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.likeSauce = (req, res, next) => {
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
            .then(() => res.status(200).json({message : 'Sauce likée !'}))
            .catch(error => res.status(401).json({ error }));
            // ajouter le userId dans le tableau de userLiked -> $push

    } else if (req.body.like === 0) // on annule le vote du User
    {
        Sauce.findOne({_id: req.params.id}) // trouve la sauce a partir de son id/
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
                        .then(() => res.status(200).json({message: 'like comptabilisé'}))
                        .catch(error => res.status(401).json({error}));
                }
            })
            .catch(error => res.status(401).json({error}));

    }
}



