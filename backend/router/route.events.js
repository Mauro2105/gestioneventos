const express = require('express');
const { createEvent, updateEvent, deleteEvent, getEvents, filterEvents } = require('../controllers/events');
const router = express.Router();
const { validate } = require('../middleware/auth')

router.get('/', validate, getEvents)
router.get('/filter', validate, filterEvents)
router.post('/', validate, createEvent);
router.put('/:id', validate, updateEvent);
router.delete('/:id', validate, deleteEvent);


module.exports = router;