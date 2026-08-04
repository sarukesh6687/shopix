const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');

const products = [
  { name: 'iPhone 15 Pro', description: 'Latest Apple flagship with A17 Pro chip, titanium design, and 48MP camera.', price: 999, discountPercent: 5, category: 'Electronics', brand: 'Apple', stock: 50, images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop'] },
  { name: 'Samsung Galaxy S24', description: 'Android powerhouse with Snapdragon 8 Gen 3 and AI features.', price: 849, discountPercent: 10, category: 'Electronics', brand: 'Samsung', stock: 40, images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop'] },
  { name: 'Sony WH-1000XM5', description: 'Industry-leading noise cancelling wireless headphones.', price: 349, discountPercent: 15, category: 'Electronics', brand: 'Sony', stock: 80, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'] },
  { name: 'MacBook Air M3', description: '15-inch MacBook Air with M3 chip, 18-hour battery life.', price: 1299, discountPercent: 0, category: 'Electronics', brand: 'Apple', stock: 30, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'] },
  { name: 'Nike Air Max 270', description: 'Iconic Nike sneakers with Max Air cushioning for all-day comfort.', price: 150, discountPercent: 20, category: 'Footwear', brand: 'Nike', stock: 100, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'] },
  { name: 'Adidas Ultraboost 23', description: 'Premium running shoes with responsive Boost midsole.', price: 180, discountPercent: 10, category: 'Footwear', brand: 'Adidas', stock: 90, images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop'] },
  { name: "Levi's 501 Jeans", description: 'Classic straight-fit jeans in premium denim.', price: 69, discountPercent: 0, category: 'Clothing', brand: "Levi's", stock: 150, images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'] },
  { name: 'The North Face Jacket', description: 'Waterproof and windproof outdoor jacket for all seasons.', price: 220, discountPercent: 25, category: 'Clothing', brand: 'The North Face', stock: 60, images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop'] },
  { name: 'Instant Pot Duo 7-in-1', description: 'Multi-use pressure cooker, slow cooker, rice cooker and more.', price: 99, discountPercent: 30, category: 'Home & Kitchen', brand: 'Instant Pot', stock: 70, images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop'] },
  { name: 'Dyson V15 Vacuum', description: 'Cordless vacuum with laser dust detection and HEPA filtration.', price: 749, discountPercent: 5, category: 'Home & Kitchen', brand: 'Dyson', stock: 25, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'] },
  { name: 'Harry Potter Box Set', description: 'Complete 7-book hardcover collection of the Harry Potter series.', price: 85, discountPercent: 10, category: 'Books', brand: 'Bloomsbury', stock: 200, images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop'] },
  { name: 'Yoga Mat Premium', description: 'Non-slip 6mm thick yoga mat with carrying strap.', price: 45, discountPercent: 0, category: 'Sports', brand: 'Liforme', stock: 120, images: ['https://images.unsplash.com/photo-1601925228008-f5e4c1e5e9b8?w=400&h=400&fit=crop'] },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);

  let admin = await User.findOne({ email: 'admin@shopez.com' });
  if (!admin) {
    admin = await User.create({ name: 'Admin', email: 'admin@shopez.com', password: 'admin123', role: 'ADMIN' });
    await Cart.create({ user: admin._id, items: [] });
    console.log('Admin: admin@shopez.com / admin123');
  }

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(console.error);
