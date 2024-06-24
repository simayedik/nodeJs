const crypto = require('crypto');

// SHA-256 hash oluşturma fonksiyonu
function  sha256Hash(metin) {
    const hash = crypto.createHash('sha256');
    hash.update(metin);
    return hash.digest('hex');
}



module.exports = sha256Hash;