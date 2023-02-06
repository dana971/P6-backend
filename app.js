const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/**
 * Modules Node
 */

const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const path = require('path');


/**
 * Les routes
 */
const userRoutes = require('./routers/user');
const sauceRoutes = require ('./routers/sauces');
const rateLimit = require('./middleware/rate-limiter');


app.use(express.json());
app.use(bodyParser.json());
//Paramétrage des headers http - Protection contre les attaques XSS
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin" }));


/**
 * Paramétrage du CORS
 */
app.use(cors())


/**
 *Connexion MONGODB
 */
mongoose.connect(process.env.MONGODB_USER,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

/**
 * appel des routes
 */
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', rateLimit, userRoutes);


module.exports = app;

