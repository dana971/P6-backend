const express = require ('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Gestion de l'authentification

//const multer = require ('../middleware/multer-config');


const sauceController = require('../controllers/sauce');

router.get('/',auth, sauceController.displaySauce);
router.get('/:id',auth,sauceController.displayOneSauce);
router.post('/',auth, sauceController.unknowSauceFunction);
router.put('/:id',auth, sauceController.UpdateSauce);
router.delete('/:id',auth,sauceController.deleteSauce);
router.post('/:id/like', auth,sauceController.likeSauce);


module.exports = router;