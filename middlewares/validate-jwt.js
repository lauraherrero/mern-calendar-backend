const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) => {

  //Recibir el JWT
  // x-token headers

  const token = req.header('x-token');
  console.log(token);

  if( !token ) {
    return res.status( 401 ).json({
      ok: false,
      msg: 'No hay token en la petición'
    })
  }

  try {

    const payload = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    );

    console.log(payload);

    req.uid = payload.uid;
    req.name = payload.name;
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  }

  next();

}


module.exports = {
  validateJWT
}