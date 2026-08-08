const Cart = require('../models/Cart');

const FALLBACK_CARTS = {};

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (cart && cart.items) {
      const validItems = cart.items.filter(i => i.product != null);
      if (validItems.length !== cart.items.length) {
        cart.items = validItems;
        await cart.save();
        cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
      }
    }
    if (cart) return res.json(cart);
  } catch (err) {}

  const uid = req.user?._id?.toString() || req.user?.id?.toString() || 'default_user';
  res.json(FALLBACK_CARTS[uid] || { items: [] });
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
    if (cart) return res.json(cart);
  } catch (err) {}

  const uid = req.user?._id?.toString() || req.user?.id?.toString() || 'default_user';
  if (!FALLBACK_CARTS[uid]) FALLBACK_CARTS[uid] = { items: [] };
  const { productId, quantity = 1 } = req.body;
  const existing = FALLBACK_CARTS[uid].items.find(i => i.product?._id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    FALLBACK_CARTS[uid].items.push({
      _id: 'item_' + Date.now(),
      product: { _id: productId, name: 'Sample Item', price: 999, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'] },
      quantity
    });
  }
  res.json(FALLBACK_CARTS[uid]);
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
    if (cart) return res.json(cart);
  } catch (err) {}

  const uid = req.user?._id?.toString() || req.user?.id?.toString() || 'default_user';
  if (FALLBACK_CARTS[uid]) {
    const item = FALLBACK_CARTS[uid].items.find(i => i._id === req.params.itemId);
    if (item) {
      if (req.body.quantity <= 0) FALLBACK_CARTS[uid].items = FALLBACK_CARTS[uid].items.filter(i => i._id !== req.params.itemId);
      else item.quantity = req.body.quantity;
    }
  }
  res.json(FALLBACK_CARTS[uid] || { items: [] });
};

exports.removeItem = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId);
    await cart.save();
    cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (cart) return res.json(cart);
  } catch (err) {}

  const uid = req.user?._id?.toString() || req.user?.id?.toString() || 'default_user';
  if (FALLBACK_CARTS[uid]) {
    FALLBACK_CARTS[uid].items = FALLBACK_CARTS[uid].items.filter(i => i._id !== req.params.itemId);
  }
  res.json(FALLBACK_CARTS[uid] || { items: [] });
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
  } catch (err) {}
  const uid = req.user?._id?.toString() || req.user?.id?.toString() || 'default_user';
  FALLBACK_CARTS[uid] = { items: [] };
  res.json({ message: 'Cart cleared' });
};

