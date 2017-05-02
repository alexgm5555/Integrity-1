var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


router.get('/pageError', function(req, res, next) {
  res.render('error404', { title: 'Express' });
});

router.get('/olvidoContrasenia', function(req, res, next) {
  res.render('olvidoContrasenia', { title: 'Express' });
});
//////////////////////////////////Rutas--Seguras///////////////////////////////////////

var jwt = require('jsonwebtoken');
var secret = require('../secret');

//---------------decode Token para todas las rutas------------------//
router.use('/',function(req, res, next) {
  console.log(req.originalUrl)
  var token = req.body.idWeb || req.query.idWeb || req.headers['idWeb'];
  if((req.originalUrl !== "/autenticate")||(req.originalUrl !== "/olvidoContrasenia")){
    jwt.verify(token, secret.passToken, function(err, decoded) {
      if(err){
        res.redirect('/pageError');
        //res.status(403).send({message:'No tiene permisos'});
      }else{
        next();
      }
    });
  }else{
    next();
  }
});

module.exports = router;
