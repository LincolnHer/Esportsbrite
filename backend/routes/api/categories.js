const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router()

const { Category, Event } = require('../../db/models')

// GET all categories
// api/categories/
router.get('/', asyncHandler(async(req, res) => {
    const category = await Category.findAll()

    return res.json(category)
}))

// GET all Events filtered by categoryId
// api/categories/:categoryId
router.get('/:categoryId', asyncHandler(async(req, res) => {
    const categoryId = req.params.categoryId

    const events = await Event.findAll({
        where: {
            categoryId
        }
    })

    return res.json(events)
}))

module.exports = router
