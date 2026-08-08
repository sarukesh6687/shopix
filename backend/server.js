const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.set('bufferCommands', false);

const app = express();
app.use(cors());
app.use(express.json());


async function autoSeed() {
  try {
    const Product = require('./models/Product');
    const User = require('./models/User');
    const Cart = require('./models/Cart');

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Database empty. Seeding product catalog...');
      const seedProducts = [
        { name: 'Apple iPhone 15 Pro Max (256GB, Titanium)', description: 'Forged in titanium with A17 Pro chip, Action button, and 48MP camera.', price: 134900, discountPercent: 5, category: 'Electronics', brand: 'Apple', stock: 45, images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'] },
        { name: 'Samsung Galaxy S24 Ultra 5G', description: 'Empowered by Galaxy AI with 200MP Quad Telephoto camera and S Pen.', price: 129999, discountPercent: 8, category: 'Electronics', brand: 'Samsung', stock: 35, images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80'] },
        { name: 'Sony WH-1000XM5 Headphones', description: 'Industry-leading noise cancellation with 30-hour battery life.', price: 29990, discountPercent: 15, category: 'Electronics', brand: 'Sony', stock: 60, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'] },
        { name: 'Apple MacBook Air 15" M3 Chip', description: 'Liquid Retina display, M3 chip speed, and 18-hour battery life.', price: 134900, discountPercent: 6, category: 'Electronics', brand: 'Apple', stock: 25, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'] },
        { name: 'Nike Air Max 270 Sneakers', description: 'Iconic Nike sneakers with Max Air cushioning for all-day comfort.', price: 11995, discountPercent: 12, category: 'Footwear', brand: 'Nike', stock: 100, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'] },
        { name: 'Adidas Ultraboost Light Running Shoes', description: 'Lightest Ultraboost ever made with responsive Boost cushioning.', price: 14999, discountPercent: 10, category: 'Footwear', brand: 'Adidas', stock: 80, images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'] },
        { name: "Levi's 501 Original Fit Jeans", description: 'Classic straight-leg denim jeans with signature button fly.', price: 4599, discountPercent: 15, category: 'Clothing', brand: "Levi's", stock: 120, images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80'] },
        { name: 'Instant Pot Duo 7-in-1 Pressure Cooker', description: 'Multi-use pressure cooker, slow cooker, rice cooker and steamer.', price: 8999, discountPercent: 20, category: 'Home & Kitchen', brand: 'Instant Pot', stock: 50, images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80'] },
        { name: 'Dyson V15 Detect Cordless Vacuum', description: 'Powerful cordless vacuum with laser dust detection and HEPA filter.', price: 62900, discountPercent: 5, category: 'Home & Kitchen', brand: 'Dyson', stock: 20, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80'] },
        { name: 'Harry Potter Hardcover Box Set', description: 'Complete 7-book hardcover collection of the Harry Potter series.', price: 6499, discountPercent: 10, category: 'Books', brand: 'Bloomsbury', stock: 150, images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80'] },
        { name: 'Liforme Non-Slip Yoga Mat', description: 'Premium eco-friendly non-slip 4.2mm thick yoga mat.', price: 3999, discountPercent: 10, category: 'Sports', brand: 'Liforme', stock: 90, images: ['https://images.unsplash.com/photo-1601925228008-f5e4c1e5e9b8?w=800&auto=format&fit=crop&q=80'] }
      ];
      await Product.insertMany(seedProducts);
      console.log('✅ Seeded catalog products successfully!');
    }

    let admin = await User.findOne({ email: 'admin@shopez.com' });
    if (!admin) {
      admin = await User.create({ name: 'Admin', email: 'admin@shopez.com', password: 'admin123', role: 'ADMIN' });
      await Cart.create({ user: admin._id, items: [] });
      console.log('✅ Created default Admin account: admin@shopez.com / admin123');
    }
  } catch (err) {
    console.error('Auto-seed warning:', err.message);
  }
}

async function connectDB() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/shopez';
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2500 });
    console.log('Connected to MongoDB at', mongoUri);
  } catch (err) {
    console.log('Local MongoDB not reachable. Initializing In-Memory MongoDB...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server-core');
      const mongoServer = await MongoMemoryServer.create({ binary: { version: '4.4.26' } });
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('Connected to In-Memory MongoDB server at', uri);
    } catch (memErr) {
      console.error('In-Memory Mongo error:', memErr.message);
    }
  }
  await autoSeed();
}

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/admin', require('./routes/admin'));

app.use((err, req, res, next) => res.status(500).json({ message: err.message }));

app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));

