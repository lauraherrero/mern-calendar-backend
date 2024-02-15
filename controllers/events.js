const express = require('express');
const Event = require('../models/Event');


const getEvents = async( req, res = express.response ) => {

  const events = await Event.find()
                              .populate('user', 'name');

  res.json({
    ok: true,
    events: events
  })
}

const createEvent = async( req, res = express.response ) => {

  const event = new Event( req.body );

  //Verificar que tengo el evento
  console.log( req.body);


  try {

    event.user = req.uid;

    const eventSaved = await event.save();
    res.json({
      ok: true,
      event: eventSaved
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor'
    })
  }
}

const updateEvent = async( req, res = express.response ) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById( eventId );

    if( !event ) {
      return res.status(400).json({
        ok: false,
        msg: 'El evento no existe'
      })
    }

    if( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'El usuario no puede actualizar el evento'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid,
    }

    const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent ,{new: true});
    
    res.json({
      ok: true,
      evento: eventUpdated
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor'
    });
  }

}

const deleteEvent = async( req, res = express.response ) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById( eventId );

    if( !event ) {
      return res.status(400).json({
        ok: false,
        msg: 'El evento no existe'
      })
    }

    if( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'El usuario no puede eliminar el evento'
      })
    }


    const eventDeleted = await Event.findByIdAndDelete( eventId );
    
    res.json({
      ok: true,
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor'
    });
  }

}


module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}