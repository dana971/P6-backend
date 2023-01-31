const express = require ('express');
const router = express.Router();

const sauceController = require('../controllers/sauce');

const auth = require('../middleware/auth'); // Gestion de l'authentification
const multer = require('../middleware/multer-config');


router.get('/',auth, sauceController.displaySauces);
router.get('/:id',auth,sauceController.displayOneSauce);
router.post('/',auth, multer, sauceController.CreateSauce);
router.put('/:id',auth, multer, sauceController.UpdateSauce);
router.delete('/:id',auth,sauceController.deleteSauce);
router.post('/:id/like', auth,sauceController.likeSauce);


module.exports = router;