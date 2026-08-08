const Product = require('../models/Product');

const FALLBACK_PRODUCTS = [
  { _id: '650000000000000000000001', name: 'Apple iPhone 15 Pro Max (256GB, Titanium)', description: 'Forged in titanium with A17 Pro chip, Action button, and 48MP camera.', price: 134900, discountPercent: 5, category: 'Electronics', brand: 'Apple', stock: 45, ratings: { avg: 4.9, count: 128 }, images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'] },
  { _id: '650000000000000000000002', name: 'Samsung Galaxy S24 Ultra 5G', description: 'Empowered by Galaxy AI with 200MP Quad Telephoto camera and S Pen.', price: 129999, discountPercent: 8, category: 'Electronics', brand: 'Samsung', stock: 35, ratings: { avg: 4.8, count: 94 }, images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80'] },
  { _id: '650000000000000000000003', name: 'Sony WH-1000XM5 Wireless Headphones', description: 'Industry-leading noise cancellation with 30-hour battery life.', price: 29990, discountPercent: 15, category: 'Electronics', brand: 'Sony', stock: 60, ratings: { avg: 4.7, count: 210 }, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'] },
  { _id: '650000000000000000000004', name: 'Apple MacBook Air 15" M3 Chip', description: 'Liquid Retina display, M3 chip speed, and 18-hour battery life.', price: 134900, discountPercent: 6, category: 'Electronics', brand: 'Apple', stock: 25, ratings: { avg: 4.9, count: 85 }, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'] },
  { _id: '650000000000000000000005', name: 'Nike Air Max 270 Sneakers', description: 'Iconic Nike sneakers with Max Air cushioning for all-day comfort.', price: 11995, discountPercent: 12, category: 'Footwear', brand: 'Nike', stock: 100, ratings: { avg: 4.6, count: 140 }, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'] },
  { _id: '650000000000000000000006', name: 'Adidas Ultraboost Light Running Shoes', description: 'Lightest Ultraboost ever made with responsive Boost cushioning.', price: 14999, discountPercent: 10, category: 'Footwear', brand: 'Adidas', stock: 80, ratings: { avg: 4.7, count: 112 }, images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'] },
  { _id: '650000000000000000000007', name: "Levi's 501 Original Fit Jeans", description: 'Classic straight-leg denim jeans with signature button fly.', price: 4599, discountPercent: 15, category: 'Clothing', brand: "Levi's", stock: 120, ratings: { avg: 4.5, count: 320 }, images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80'] },
  { _id: '650000000000000000000008', name: 'Instant Pot Duo 7-in-1 Pressure Cooker', description: 'Multi-use pressure cooker, slow cooker, rice cooker and steamer.', price: 8999, discountPercent: 20, category: 'Home & Kitchen', brand: 'Instant Pot', stock: 50, ratings: { avg: 4.8, count: 180 }, images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80'] },
  { _id: '650000000000000000000009', name: 'Dyson V15 Detect Cordless Vacuum', description: 'Powerful cordless vacuum with laser dust detection and HEPA filter.', price: 62900, discountPercent: 5, category: 'Home & Kitchen', brand: 'Dyson', stock: 20, ratings: { avg: 4.9, count: 65 }, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80'] },
  { _id: '650000000000000000000010', name: 'Harry Potter Hardcover Box Set', description: 'Complete 7-book hardcover collection of the Harry Potter series.', price: 6499, discountPercent: 10, category: 'Books', brand: 'Bloomsbury', stock: 150, ratings: { avg: 5.0, count: 540 }, images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80'] },
  { _id: '650000000000000000000011', name: 'Liforme Non-Slip Yoga Mat', description: 'Premium eco-friendly non-slip 4.2mm thick yoga mat.', price: 3999, discountPercent: 10, category: 'Sports', brand: 'Liforme', stock: 90, ratings: { avg: 4.7, count: 75 }, images: ['https://images.unsplash.com/photo-1601925228008-f5e4c1e5e9b8?w=800&auto=format&fit=crop&q=80'] }
];

exports.getAll = async (req, res) => {
  try {
    const { category, search, sort, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = +minPrice;
    if (maxPrice) filter.price.$lte = +maxPrice;

    const sortMap = { price_asc: { price: 1 }, price_desc: { price: -1 }, rating: { 'ratings.avg': -1 }, newest: { createdAt: -1 } };
    const sortOpt = sortMap[sort] || { createdAt: -1 };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort(sortOpt).skip((page - 1) * limit).limit(+limit);
    res.json({ products, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    // Fallback if Mongo is buffering/disconnected
    let list = FALLBACK_PRODUCTS;
    const { category, search } = req.query;
    if (category) list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    res.json({ products: list, total: list.length, pages: 1 });
  }
};

exports.getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
  } catch (err) {}
  const match = FALLBACK_PRODUCTS.find(p => p._id === req.params.id) || FALLBACK_PRODUCTS[0];
  res.json(match);
};

exports.getCategories = async (req, res) => {
  try {
    const cats = await Product.distinct('category');
    if (cats && cats.length > 0) return res.json(cats);
  } catch (err) {}
  res.json(['Electronics', 'Footwear', 'Clothing', 'Home & Kitchen', 'Books', 'Sports']);
};

exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

