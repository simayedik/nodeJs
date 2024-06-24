const { body, validationResult } = require('express-validator');
var user = require('./user');


module.exports.index = function (req, res) {
    res.render('');
};
module.exports.login = function (req, res) {
    const errors = validationResult(req);
    res.render('login',{formData: req.body, errors : errors.array()});
};
module.exports.reqister = function (req, res) {

    const errors = validationResult(req);
    res.render('register',{formData: req.body, errors : errors.array()});
};
module.exports.loginPost = function (req, res) {
    const errors = validationResult(req);
    console.log(req.body);
    if(errors.isEmpty()){
        const locals={
            tur: 'eskikayit',
            ad: '',
        }
        res.render('index',locals);

    }
    else{
        res.render('login',{formData: req.body, errors : errors.array()});
    }
 
};

module.exports.reqisterPost = function (req, res) {
    
     const errors = validationResult(req);
     console.log(errors);
    if(errors.isEmpty()){
      
       const data = {
            ip : req.ip,
            ad : req.body.ad,
            soyad : req.body.soyad,
            email: req.body.email,
            lokasyon: req.body.lokasyon,
            sehir: req.body.sehir,
            sifre: req.body.sifre,
            nickname: req.body.nickname,
        }
       

        user.registerUser(data);
        const locals={
            tur: 'yenikayit',
            ad: req.body.ad,
        }
        res.render('index',locals);
    
    }
    else{
        res.render('register',{formData: req.body, errors : errors.array()});
    }

    
  
};