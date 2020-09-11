//////////////////////////////////
// Configuración puerto // 
////////////////////////////////

process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'local';

let urlDB
if (process.env.NODE_ENV === 'local') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://user_test:1234@cluster0.kl2rk.mongodb.net/test';
    urlDB = 'mongodb+srv://user_test:1234@cluster0.kl2rk.mongodb.net/test';
}

process.env.URLDB = urlDB;