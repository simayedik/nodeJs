var controller = require('./controller');
var express = require('express');
var user = require('./user');
var router = express.Router();
const { body, validationResult, Result } = require('express-validator');
const sha256Hash = require('./sha256Hash');

router.get('/',controller.index);

router.post('/',controller.index);

router.get('/login',controller.login);

router.get('/register',controller.reqister);

router.post('/login',[
    body('email')
    .notEmpty()
    .withMessage('Bu alan boş bırakılamaz')
    .custom(async (value) => {
        if (value) {
            try {
                const userdata = await user.findByEmail(value);
                 if (!userdata) {
                    throw new Error('Bu kullanııcı bulunamadı');
                }
            } catch (error) {
                throw new Error(error.message); // findByEmail'den gelen hata mesajını doğrudan iletiyoruz
            }
        }
        return true;
    })
    ,
    body('sifre')
    .notEmpty()
    .withMessage('Bu alan boş bırakılamaz')
    .custom(async (value,{req}) => {
        if (value ) {
            try {
                const userdata = await user.findByEmail(req.body.email);
                if (userdata.sifre != sha256Hash(value) ) {
                    throw new Error('Şifre ve mail adresi uyuşmuyor');
                }
            } catch (error) {
                throw new Error(error.message); // findByEmail'den gelen hata mesajını doğrudan iletiyoruz
            }
        }
        return true;
    })
    ,
    
],controller.loginPost);

router.post('/register',[
    body('ad')
    .isLength({min:3})
    .withMessage('En az üç karakter içermelidir')
    ,
    body('soyad')
    .isLength({min:3})
    .withMessage('En az üç karakter içermelidir')
    ,
    body('email')
    .isEmail()
    .withMessage('Geçerli bir email adresi giriniz')
    .custom(async (value) => {
        if (value) {
            try {
                const userdata = await user.findByEmail(value);
             
                if (userdata) {
                    throw new Error('Bu email başkası tarafından kullanılmaktadır');
                }
            } catch (error) {
                throw new Error(error.message); // findByEmail'den gelen hata mesajını doğrudan iletiyoruz
            }
        }
        return true;
    })
    ,
    body('lokasyon')
    .isLength({min:3})
    .withMessage('En az üç karakter içermelidir')
    ,
    body('sehir')
    .isLength({min:3})
    .withMessage('En az üç karakter içermelidir')
    ,
    body('sifre')
    .isLength({min:5})
    .withMessage('En az beş karakter içermelidir')
    ,
    body('sifredogrulama')
    .notEmpty()
    .withMessage('Şifre doğrulama boş bırakılmaz')
    .custom((value, { req }) => {
        if (value !== req.body.sifre) {
            throw new Error('Şifreler eşleşmiyor');
        }
        return true;
    })
    ,
    body('nickname')
    .isLength({min:3})
    .withMessage('En az üç karakter içermelidir')
    .custom(async (value) => {
        if (value) {
            try {
                const userdata = await user.findByNickname(value);
                if (userdata) {
                    throw new Error('Bu nickname başkası tarafından kullanılmaktadır');
                }
            } catch (error) {
                throw new Error(error.message); // findByEmail'den gelen hata mesajını doğrudan iletiyoruz
            }
        }
        return true;
    })
    ,
],controller.reqisterPost);


module.exports = router;
