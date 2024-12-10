const express = require('express');
const { User, ROLES, PERMISSIONS } = require('../models/user.model');
const { auth, checkRole, checkPermission } = require('../middleware/auth.middleware');

const router = express.Router();

// Get all users (Admin only)
router.get('/', 
  auth, 
  checkRole([ROLES.ADMIN]), 
  async (req, res) => {
    try {
      const users = await User.find({}).select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Get user by ID (Admin and Moderator)
router.get('/:id',
  auth,
  checkRole([ROLES.ADMIN, ROLES.MODERATOR]),
  checkPermission(PERMISSIONS.READ_USER),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// Update user role (Admin only)
router.patch('/:id/role',
  auth,
  checkRole([ROLES.ADMIN]),
  checkPermission(PERMISSIONS.MANAGE_ROLES),
  async (req, res) => {
    try {
      const { role } = req.body;
      
      if (!Object.values(ROLES).includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Set default permissions based on role
      let permissions = [];
      switch (role) {
        case ROLES.ADMIN:
          permissions = Object.values(PERMISSIONS);
          break;
        case ROLES.MODERATOR:
          permissions = [PERMISSIONS.READ_USER, PERMISSIONS.UPDATE_USER];
          break;
        case ROLES.USER:
          permissions = [PERMISSIONS.READ_USER];
          break;
      }

      user.role = role;
      user.permissions = permissions;
      await user.save();

      res.json({ message: 'User role updated', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user role', error: error.message });
    }
});

// Delete user (Admin only)
router.delete('/:id',
  auth,
  checkRole([ROLES.ADMIN]),
  checkPermission(PERMISSIONS.DELETE_USER),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Prevent deleting the last admin
      if (user.role === ROLES.ADMIN) {
        const adminCount = await User.countDocuments({ role: ROLES.ADMIN });
        if (adminCount <= 1) {
          return res.status(400).json({ message: 'Cannot delete the last admin user' });
        }
      }

      await user.remove();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

module.exports = router;
