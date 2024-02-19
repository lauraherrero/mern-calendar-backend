const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const access = ( req, res = express.response ) => {

  res.json({
    ok: true
  })
}

const createUser = async( req, res = express.response ) => {

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email: email });
    console.log(user);

    if( user ) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe'
      })
    }

    user = new User( req.body );

    //Encriptar contraseña:
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );


    await user.save();


    //Generar el JWT
    const token = await generateJWT( user.id, user.name );

    res.status( 201 ).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token: token
      // email,
      // password
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor'
    })
  }

  
}


const loginUser = async( req, res = express.response ) => {

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email: email });

    if( !user ) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe un usuario con ese email.'
      })
    
    }

    //Confirmar los passwords
    const validPassword = bcrypt.compareSync( password, user.password );

    if( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'La contraseña no es correcta.'
      })
    }

    //Generar nuestro JWT
    const token = await generateJWT( user.id, user.name );

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token: token
    })
    

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor'
    })
  }

  
}

const validateToken = async( req, res = express.response ) => {

  const uid = req.uid;
  const name = req.name;


  //Generar un nuevo JWT y retornarlo en esta petición:
  const token = await generateJWT( uid, name );


  res.json({
    ok: true,
    uid,
    name,
    token: token
  })
}


module.exports = {
  access,
  createUser,
  loginUser,
  validateToken
}