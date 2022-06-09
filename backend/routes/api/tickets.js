const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router()

const { Ticket } = require('../../db/models')

// GET all tickets of one user only
// api/tickets/:userId
router.get('/:userId', asyncHandler(async(req, res) => {
    const userId = req.params.userId

    const tickets = await Ticket.findAll({
        where: {
            userId: userId
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    })

    return res.json(tickets)
}))

// POST create a ticket
// api/tickets/
router.post('/', asyncHandler(async(req, res) => {
    const { eventId, userId,quantity } = req.body

    const ticket = await Ticket.create({
        eventId: eventId,
        userId: userId,
        quantity: quantity,
    })

    return res.json(ticket)
}))



module.exports = router
