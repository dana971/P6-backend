const Sauce = require('../models/sauces');


exports.displaySauce= (req, res, next) => {
   Sauce.find()
        .then(() => {res.status(201).json();
        }
    ).catch((error) => {res.status(400).json({error});
});

};


exports.displayOneSauce=(req, res, next)=>{
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {res.status(200).json(sauce);})
        .catch((error) => {res.status(404).json({error: error});
});
};



exports.unknowSauceFunction=(req, res, next)=>{};


exports.UpdateSauce = (req, res, next) => {
    Sauce.updateOne({_id: req.params.id}, Sauce)
        .then((sauce) => {res.status(200).json(sauce);
        })
        .catch((error) => {res.status(404).json({error: error});
        });
};

    exports.deleteSauce = (req, res, next) => {
        Sauce.deleteOne({_id: req.params.id}, Sauce)
            .then((sauce) => {res.status(200).json(sauce);
            })
            .catch((error) => {res.status(404).json({error: error});
            });
    };

exports.likeSauce = (req, res, next) => {
    if (like === 1) {
        // increment like -> $inc
        // ajouter le userId dans le tableau de userLiked -> $push
    } else if(like === -1)
    {
        // increment dislike -> $inc
        // ajouter le userId dans le tableau de userLiked -> $push
    } else if (like === 0)
    {
    // trouve la sauce a parti de son id/

        // si le userid es tdans le tableau userliked

    }
}



