var db = require('./db');
const { v4: uuidv4 } = require('uuid');
var sha256Hash = require('./sha256Hash');


class user {
  static async registerUser(data) {
    db.connect((error) => {
      if (error) {
        console.error("Bağlantı Hatası : " + error);
      }
      const sql = 'INSERT INTO reqister (IP,uuid,email,ad,soyad,lokasyon,sehir,sifre,nickname) VALUES (?,?,?,?,?,?,?,?,?)';
      db.execute(sql, [data.ip, uuidv4(), data.email, data.ad, data.soyad, data.lokasyon, data.sehir, sha256Hash(data.sifre), data.nickname], (error, result) => {
        if (error) {
          console.error("Insert Sorgu Hatası : " + error);
        }

        console.log(result);

      }); // execute sonu
    }); // connect sonu
    db.end();
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.connect((error) => {
        if (error) {
          console.error("Bağlantı Hatası : " + error);
        }
        const sql = 'SELECT *FROM  reqister WHERE  email = ?';
        db.execute(sql, [email], (error, result) => {
          if (error) {
            console.error("findByEmail Select hatası : " + error);
          }

          resolve(result[0]);
        });
      }); // connect sonu
    });
    db.end();

  }

  static async findByNickname(nickname) {
    return new Promise((resolve, reject) => {
      db.connect((error) => {
        if (error) {
          console.error("Bağlantı Hatası : " + error);
        }
        const sql = 'SELECT * FROM  reqister WHERE  nickname = ?';
        db.execute(sql, [nickname], (error, result) => {
          if (error) {
            console.error("findBynickname Select hatası : " + error);
          }

          resolve(result[0]);
        });
      }); // connect sonu
    });
    db.end();

  }


}

module.exports = user;