const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cart = require('../models/Cart');

const token = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const safe = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role, address: u.address });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password });
    await Cart.create({ user: user._id, items: [] });
    res.status(201).json({ token: token(user._id), user: safe(user) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ token: token(user._id), user: safe(user) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMe = (req, res) => res.json(safe(req.user));

exports.updateProfile = async (req, res) => {
  try {
    const { name, address } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, address }, { new: true });
    res.json(safe(user));
  } catch (err) { res.status(500).json({ message: err.message }); }
};
