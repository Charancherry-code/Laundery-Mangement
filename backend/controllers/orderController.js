const Order = require('../models/Order');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { customerName, phone, garments, estimatedDeliveryDate } = req.body;

    // Validation
    if (!customerName || !phone || !garments || garments.length === 0) {
      return res.status(400).json({ 
        error: 'Customer name, phone, and at least one garment are required' 
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Phone must be a 10-digit number' });
    }

    garments.forEach(garment => {
      if (!garment.type || !garment.quantity || !garment.price) {
        throw new Error('Each garment must have type, quantity, and price');
      }
      if (garment.quantity <= 0 || garment.price < 0) {
        throw new Error('Quantity must be positive and price must be non-negative');
      }
    });

    const order = new Order({
      customerName,
      phone,
      garments,
      estimatedDeliveryDate: estimatedDeliveryDate ? new Date(estimatedDeliveryDate) : undefined
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders with optional filters
exports.getAllOrders = async (req, res) => {
  try {
    const { status, customerName, phone } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (customerName) filter.customerName = new RegExp(customerName, 'i');
    if (phone) filter.phone = phone;

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ orderId: req.params.id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get dashboard statistics
exports.getDashboard = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    const statusCounts = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusMap = {
      'RECEIVED': 0,
      'PROCESSING': 0,
      'READY': 0,
      'DELIVERED': 0
    };

    statusCounts.forEach(item => {
      statusMap[item._id] = item.count;
    });

    res.json({
      totalOrders,
      totalRevenue,
      statusCounts: statusMap
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
