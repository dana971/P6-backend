const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//Modules Node
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const rateLimit = require('express-rate-limit');
const path = require('path');
//Les routes
const userRoutes = require('./routers/user');
const sauceRoutes = require ('./routers/sauces');


app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());


/**
 *Connexion MONGODB
 */
mongoose.connect(process.env.MONGODB_USER,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

/**
 * Paramétrage du CORS
 */

app.use(cors())

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})


/**
 * Fonction de limitation des requêtes à l'API
 */
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})
);

//appel des routes

app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;

