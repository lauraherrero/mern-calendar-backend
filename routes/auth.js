// Rutas de usuarios / Auth
// host + /api/auth


const express = require('express');
const { check } = require('express-validator');
const router = express.Router();


const { createUser, validateToken, loginUser, access } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');


router.get('/', access );

router.post(
  '/new',
  [
    //middlewares
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'El password debe de tener 6 caracteres.').isLength({ min: 6 }),
    fieldValidator
  ],
  createUser );

router.post(
  '/', 
  [
    check('email', 'El email es obligatorio.').isEmail(),
    check('password', 'El password debe de tener 6 caracteres.').isLength({ min: 6 }),
    fieldValidator
  ],
  loginUser);

router.get('/renew', validateJWT, validateToken );




module.exports = router;