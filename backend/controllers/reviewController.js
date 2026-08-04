const Review = require('../models/Review');
const Product = require('../models/Product');

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const existing = await Review.findOne({ product: req.params.productId, user: req.user._id });
    if (existing) return res.status(400).json({ message: 'Already reviewed' });
    const review = await Review.create({ product: req.params.productId, user: req.user._id, rating, comment });

    const reviews = await Review.find({ product: req.params.productId });
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(req.params.productId, { 'ratings.avg': +avg.toFixed(1), 'ratings.count': reviews.length });

    res.status(201).json(review);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name').sort('-createdAt');
    res.json(reviews);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
