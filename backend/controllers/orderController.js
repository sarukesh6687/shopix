const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User authentication required' });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    // Safely filter out null/deleted product items from cart
    const validCartItems = cart.items.filter(i => i && i.product && i.product._id);
    if (validCartItems.length === 0) {
      await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
      return res.status(400).json({ message: 'Cart contained obsolete items. Please add items to cart again.' });
    }

    const items = validCartItems.map(i => ({
      product: i.product._id,
      name: i.product.name || 'Product',
      price: i.product.discountPercent > 0 ? +(i.product.price * (1 - i.product.discountPercent / 100)).toFixed(2) : (i.product.price || 0),
      quantity: i.quantity || 1
    }));

    const totalAmount = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    // Safely reduce stock for valid products
    for (const item of validCartItems) {
      if (item.product && item.product._id) {
        await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -(item.quantity || 1) } }).catch(() => {});
      }
    }

    const cleanAddress = {
      street: shippingAddress?.street || 'N/A',
      city: shippingAddress?.city || 'N/A',
      zip: shippingAddress?.zip || 'N/A',
      country: shippingAddress?.country || 'India'
    };

    const order = await Order.create({ 
      user: req.user._id, 
      items, 
      shippingAddress: cleanAddress, 
      totalAmount, 
      paymentMethod: paymentMethod || 'COD' 
    });

    // Clear cart after successful order creation
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.status(201).json(order);
  } catch (err) { 
    console.error('Order Error:', err);
    res.status(500).json({ message: err.message || 'Error placing order' }); 
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (!['Pending', 'Processing'].includes(order.status)) return res.status(400).json({ message: 'Cannot cancel this order' });
    order.status = 'Cancelled';
    await order.save();
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
