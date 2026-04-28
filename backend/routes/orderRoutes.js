const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getDashboard
} = require('../controllers/orderController');

// Dashboard
router.get('/dashboard', getDashboard);

// CRUD operations
router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
