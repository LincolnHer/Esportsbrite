const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router()

const { Event } = require('../../db/models')

// GET all events
// api/events/
router.get('/', asyncHandler(async(req, res) => {
    const event = await Event.findAll()

    return res.json(event)
}))

// GET a single event
// api/events/:eventId
router.get('/:eventId', asyncHandler(async(req, res) => {
    const eventId = req.params.eventId

    const event = await Event.findByPk(eventId)

    return res.json(event)
}))

// POST create an event
// api/events/
router.post('/', asyncHandler(async(req, res) => {
    const { hostId, category, date, description, location, name, imageUrl, price } = req.body

    const event = await Event.create({
        hostId: hostId,
        category: category,
        date: date,
        description: description,
        location: location,
        name: name,
        imageUrl: imageUrl,
        price: price,
    })

    return res.json(event)
}))

// PUT update an event
// api/events/:eventId
router.put('/:eventId', asyncHandler(async(req, res) => {
    const eventId = req.params.eventId

    const { category, date, description, location, name, imageUrl, price } = req.body

    const event = await Event.findByPk(eventId)

    const newEvent = await event.update({
        category: category,
        date: date,
        description: description,
        location: location,
        name: name,
        imageUrl: imageUrl,
        price: price,
     })

    return res.json(newEvent)
}))

// DELETE delete an event
// api/events/:eventId
router.delete('/:eventId', asyncHandler(async(req, res) => {
  const eventId = req.params.eventId

  const event = await Event.findByPk(eventId)
//   const hostId = event.hostId
  event.destroy()

  const events = await Event.findAll()

  return res.json(events)
}))

module.exports = router
