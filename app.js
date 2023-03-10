const express = require('express');
const app = express();

// Modules Node
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const path = require('path');


//Les routes
const userRoutes = require('./routers/user');
const sauceRoutes = require ('./routers/sauces');
const rateLimit = require('./middleware/rate-limiter');


// Cette fonction permet de parser les requêtes Json
//Et envoie cette requête dans le body
app.use(express.json());
//Paramétrage des headers http - Protection contre les attaques XSS
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin" }));


//Application du CORS
app.use(cors())


//Connexion MONGODB
mongoose.connect(process.env.MONGODB_USER,
    { useNewUrlParser: true,
            useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


//Appel des routes

//On configure notre serveur pour le transit d'image
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', rateLimit, userRoutes);


module.exports = app;

