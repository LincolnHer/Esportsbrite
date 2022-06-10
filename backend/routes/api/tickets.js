const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router()

const { Ticket } = require('../../db/models')

// GET get single ticket
// api/tickets/:ticketId
router.get('/:ticketId', asyncHandler(async(req, res) => {
    const ticketId = req.params.ticketId

    const ticket = await Ticket.findByPk(ticketId);

    return res.json(ticket)
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

// PUT update a ticket
// api/tickets/:ticketId
router.put('/:ticketId', asyncHandler(async(req, res) => {
    const ticketId = req.params.ticketId

    const { quantity } = req.body

    const ticket = await Ticket.findByPk(ticketId)

    const newTicket = await ticket.update({
        quantity: quantity,
    })

    return res.json(newTicket)
}))

// DELETE delete a ticket
// api/tickets/:ticketId
router.delete('/:ticketId', asyncHandler(async(req, res) => {
    const ticketId = req.params.ticketId

    const ticket = await Ticket.findByPk(ticketId)
    const userId = await ticket.userId
    ticket.destroy()

    const tickets = await Ticket.findAll({
        where: {
            userId: userId
        }
    })

    return res.json(tickets)
}))

module.exports = router
