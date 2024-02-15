const express = require('express');
const { validationResult } = require('express-validator');




const fieldValidator = (req, res = express.response, next ) => {

  //Manejo de errores
  const errors = validationResult( req );
  if( !errors.isEmpty() ) {
    return res.status( 400 ).json({
      ok: false,
      erorrs: errors.mapped()
    });
  }


  next()

}


module.exports = {
  fieldValidator
}