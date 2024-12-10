const express = require('express');
const { ROLES } = require('../models/user.model');
const { auth, checkRole } = require('../middleware/auth.middleware');

const router = express.Router();

// Public resource - accessible to all
router.get('/public', (req, res) => {
  res.json({
    message: 'This is a public resource',
    data: {
      id: 1,
      type: 'public',
      content: 'Anyone can access this'
    }
  });
});

// Protected resource - authenticated users only
router.get('/protected',
  auth,
  (req, res) => {
    res.json({
      message: 'This is a protected resource',
      data: {
        id: 2,
        type: 'protected',
        content: 'Only authenticated users can access this'
      }
    });
});

// Admin resource - admin only
router.get('/admin',
  auth,
  checkRole([ROLES.ADMIN]),
  (req, res) => {
    res.json({
      message: 'This is an admin resource',
      data: {
        id: 3,
        type: 'admin',
        content: 'Only admins can access this'
      }
    });
});

// Moderator resource - moderator and admin
router.get('/moderator',
  auth,
  checkRole([ROLES.ADMIN, ROLES.MODERATOR]),
  (req, res) => {
    res.json({
      message: 'This is a moderator resource',
      data: {
        id: 4,
        type: 'moderator',
        content: 'Only moderators and admins can access this'
      }
    });
});

module.exports = router;
