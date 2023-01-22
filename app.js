const express = require('express');
const app = express();
const mongoose = require('mongoose');



//Les routes
const userRoutes = require('./routers/user');
const sauceRoutes = require ('./routers/sauces');

app.use(express.json());

mongoose.connect('mongodb+srv://dara:WzaGORLcrEujseN@cluster0.ace8fne.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE , PATCH, OPTIONS');
    next();
});

//appel des routes

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;

