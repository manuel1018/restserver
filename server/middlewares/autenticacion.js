const jwt = require('jsonwebtoken');
const userAdmin = 'ADMIN_ROLE';
//////////////////////////////////
// Verificar el token// 
////////////////////////////////
let verificarToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

//////////////////////////////////
// Verificar token de Admin// 
////////////////////////////////

let verificarAdministrador = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        let userRole = decoded.usuario.role;
        if (userRole !== userAdmin) {
            return res.status(400).json({
                ok: false,
                message: 'No tiene permisos para realizar esta acción'
            });
        };



        next();
    });
};

module.exports = {
    verificarToken,
    verificarAdministrador
}