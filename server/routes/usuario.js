//import { verificarToken } from './middlewares/autenticacion.js'
const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();
const Usuario = require('../models/usuario');
//const usuario = require('../models/usuario');
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarAdministrador } = require('../middlewares/autenticacion');


app.get('/usuario', verificarToken, (req, res) => {

        return res.json({
            usuario: req.usuario,
            nombre: req.usuario.nombre,
            email: req.usuario.email,
        })

        let desde = req.query.desde || 0;
        desde = Number(desde);

        let limite = req.query.limite || 5;
        limite = Number(limite);

        //Usuario.find({ google: true })// retorno de objetos con condición 
        Usuario.find({ estado: true })
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                Usuario.count({ estado: true }, (err, conteo) => {
                    res.json({
                        ok: true,
                        usuarios,
                        usuariosTotal: conteo
                    })
                })
            })
    })
    //app.post('/usuario', [verificarToken,verificarAdministrador], (req, res) => {///para colocar 2 middlewares
app.post('/usuario', verificarAdministrador, (req, res) => { /// petición POST, se requiere el parámetro nombre con un valor asignado
    let body = req.body; ///para usuar body es necesario instalar body-parser

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)),
        // password: bcrypt.hashSync(body.p10, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            /////// Metodo dos para borrar y no mostrar password al retornar el objeto JSON /////
            /*
             usuarioDB.password = undefined;
             usuarioDB = JSON.parse(JSON.stringify(usuarioDB));
             */
            //////////////////////////////////////////////
            res.json({
                ok: true,
                usuario: usuarioDB
            });

        })
        /*
        if (body.nombre === undefined) {
            res.status(400).json({ /// en caso de que el parámetro nombre no se especifique se enviará un código de error
                ok: false,
                mensaje: 'El nombre es necesario'
            })
        }
        res.json({
            persona: body
        })
        */
})

app.put('/usuario/:id', verificarToken, (req, res) => { /// alta simple exp: /usuario/32
    let id = req.params.id;
    //let body = req.body;
    /// Se hara uso de la libreria underscore(npm install underscore), esto con el fin evitar que el usuario modifique 
    ///valores no permiridos como el password
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                usuario: usuarioDB
            })
        })
        /*
            res.json({
                id
            });
        */
})

app.delete('/usuario/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    /*
    Usuario.findByIdAndRemove(id, (err, userDelete) => {        
    
        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: userDelete
        });
    });
    */
    req.body.estado = false;
    // let body = _.pick(req.body, ['estado']);
    Usuario.findByIdAndUpdate(id, req.body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})



module.exports = app;