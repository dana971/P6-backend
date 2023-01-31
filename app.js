const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

const path = require('path');

//Les routes
const userRoutes = require('./routers/user');
const sauceRoutes = require ('./routers/sauces');


app.use(express.json());

mongoose.connect('mongodb+srv://dara:WzaGORLcrEujseN@cluster0.ace8fne.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(cors())

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
})

app.use(bodyParser.json());


app.use(helmet());

//appel des routes

app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);



module.exports = app;

