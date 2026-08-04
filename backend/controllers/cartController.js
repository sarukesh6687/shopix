const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (cart && cart.items) {
      // Filter out deleted/null products automatically
      const validItems = cart.items.filter(i => i.product != null);
      if (validItems.length !== cart.items.length) {
        cart.items = validItems;
        await cart.save();
        cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
      }
    }
    res.json(cart || { items: [] });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.addItem = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    const existing = cart.items.find(i => i.product && i.product.toString() === productId);
    if (existing) existing.quantity += quantity;
    else cart.items.push({ product: productId, quantity });
    await cart.save();
    cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    const item = cart.items.find(i => i._id.toString() === req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (quantity <= 0) cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId);
    else item.quantity = quantity;
    await cart.save();
    cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.removeItem = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId);
    await cart.save();
    cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ message: 'Cart cleared' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
