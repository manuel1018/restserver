//////////////////////////////////
// Configuración puerto // 
////////////////////////////////

process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'local';

let urlDB
if (process.env.NODE_ENV === 'local') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;