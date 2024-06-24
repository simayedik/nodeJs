// mysql2 paketini require etme
const mysql = require('mysql2');

// Veritabanı bağlantı bilgileri
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // kullanıcı adı
  password: '!45Wts2516?', // şifre
  database: 'nodedeneme' // kullanılacak veritabanı
});



module.exports = connection;








