const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Event, Ticket } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .isLength({ max: 30 })
    .withMessage('Username must be 30 characters or less'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// GET all users
// /api/users
router.get('/', asyncHandler(async(req, res) => {
  const user = await User.findAll()

  return res.json(user)
}))

// GET all events of one user
// /api/users/:hostId/events
router.get('/:hostId/events', asyncHandler(async(req, res) => {
    const hostId = req.params.hostId

    const events = await Event.findAll({
        where: {
            hostId: hostId
        },
        order: [
          ['createdAt', 'ASC']
        ]
    })

    return res.json(events)
}))

// GET all tickets of one user only
// api/users/:userId/ticket
router.get('/:userId/tickets', asyncHandler(async(req, res) => {
  const userId = req.params.userId

  const tickets = await Ticket.findAll({
      where: {
          userId: userId
      },
      order: [
          ['updatedAt', 'ASC']
      ]
  })

  return res.json(tickets)
}))

module.exports = router;
