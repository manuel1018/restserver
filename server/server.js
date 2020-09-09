require('./config/config'); /// configuración de puerto en archivo config.js

const express = require('express')
const app = express()
const bodyParser = require('body-parser'); /// constante utilizada para realizar el parseo de una petición tipo json a una respuesta con formato json

app.use(bodyParser.urlencoded({ extended: false })) //app.use siempre representa un middleware
    //funcion que siempre se ejecuta cada vez que se realiza una petición
app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
    res.json('getUsuario')
})

app.post('/usuario', (req, res) => { /// petición POST, se requiere el parámetro nombre con un valor asignado
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({ /// en caso de que el parámetro nombre no se especifique se enviará un código de error
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    }
    res.json({
        persona: body
    })
})

app.put('/usuario/:id', (req, res) => { /// alta simple exp: /usuario/32
    let id = req.params.id;

    res.json({
        id
    });

})

app.delete('/usuario', (req, res) => {
    res.json('deleteUsuario')
})

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto " + process.env.PORT);

})