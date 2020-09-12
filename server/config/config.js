//////////////////////////////////
// Configuración puerto // 
////////////////////////////////
process.env.PORT = process.env.PORT || 3000;

//////////////////////////////////
// Entorno// 
////////////////////////////////
process.env.NODE_ENV = process.env.NODE_ENV || 'local';

//////////////////////////////////
// Vencimiento del token// 
////////////////////////////////
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

//////////////////////////////////
// SEED// 
////////////////////////////////
process.env.SEED = process.env.SEED
let urlDB
    //if (process.env.NODE_ENV === 'local') {
    // urlDB = 'mongodb://localhost:27017/cafe';
    //} else {
    //urlDB = process.env.MONGO_URI; //variable de entorno creada : heroku config:set MONGO_URI="mongodb+srv://user_test:1234@cluster0.kl2rk.mongodb.net/test"
    //} 
urlDB = 'mongodb+srv://user_test:1234@cluster0.kl2rk.mongodb.net/test';
process.env.URLDB = urlDB;