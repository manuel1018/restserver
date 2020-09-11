require('./config/config'); /// configuración de puerto en archivo config.js

const express = require('express');
const mongoose = require('mongoose');

const app = express()
const bodyParser = require('body-parser'); /// constante utilizada para realizar el parseo de una petición tipo json a una respuesta con formato json

app.use(bodyParser.urlencoded({ extended: false })) //app.use siempre representa un middleware
    //funcion que siempre se ejecuta cada vez que se realiza una petición
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

//mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
        (err, res) => {
            if (err) throw err;
            console.log("Base connectada...");
        }),

    app.listen(process.env.PORT, () => {
        console.log("Escuchando puerto " + process.env.PORT);

    })