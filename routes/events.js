const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { fieldValidator } = require('../middlewares/field-validator');



const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');




//Todas tienen que pasar por la validación del token
router.use( validateJWT );

//Obtener eventos
router.get('/', getEvents )


//Crear un nuevo evento
router.post('/', 
[
  check('title', 'El título es obligatorio').not().isEmpty(),
  check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
  check('end', 'Fecha fin es obligatoria').custom( isDate ),
  fieldValidator
],
createEvent)


//Actualizar un evento
router.put('/:id', 
[
  
],
updateEvent)


//Borrar un evento
router.delete('/:id', 
[
  
],
deleteEvent)


module.exports = router;