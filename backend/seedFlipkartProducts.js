const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const flipkartProducts = [
  // MOBILES & ELECTRONICS
  {
    name: 'Apple iPhone 15 (128 GB, Blue)',
    description: 'Dynamic Island, 48MP Main Camera with 2x Telephoto, A16 Bionic chip, and durable color-infused glass design with USB-C.',
    price: 65999,
    discountPercent: 12,
    category: 'Electronics',
    brand: 'Apple',
    stock: 50,
    ratings: { avg: 4.8, count: 1450 },
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Samsung Galaxy S23 FE 5G (128 GB, Mint)',
    description: 'Flagship 50MP camera with Nightography, Exynos 2200 processor, Dynamic AMOLED 2X display, and IP68 water resistance.',
    price: 39999,
    discountPercent: 50,
    category: 'Electronics',
    brand: 'Samsung',
    stock: 65,
    ratings: { avg: 4.6, count: 980 },
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Motorola Edge 50 Pro 5G (256 GB, Luxe Lavender)',
    description: 'World 1st Pantone validated display & camera, 125W TurboPower charging, Snapdragon 7 Gen 3, and IP68 underwater protection.',
    price: 31999,
    discountPercent: 23,
    category: 'Electronics',
    brand: 'Motorola',
    stock: 40,
    ratings: { avg: 4.7, count: 620 },
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Realme 12 Pro+ 5G (Submarine Blue, 256 GB)',
    description: '64MP Periscope Portrait Camera with 120x SuperZoom, Sony IMX890 OIS camera, and luxury watch design by Ollivier Savéo.',
    price: 29999,
    discountPercent: 14,
    category: 'Electronics',
    brand: 'Realme',
    stock: 80,
    ratings: { avg: 4.6, count: 850 },
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Poco X6 Pro 5G (Racing Yellow, 256 GB)',
    description: 'Dimensity 8300-Ultra processor, 120Hz 1.5K AMOLED display, 64MP OIS triple camera, and 67W Turbo Charge.',
    price: 25999,
    discountPercent: 16,
    category: 'Electronics',
    brand: 'Poco',
    stock: 90,
    ratings: { avg: 4.7, count: 1120 },
    images: ['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'OnePlus Nord CE 4 5G (Dark Chrome, 128 GB)',
    description: 'Snapdragon 7 Gen 3, 100W SUPERVOOC fast charging, 50MP Sony LYT-600 OIS camera, and 5500 mAh battery.',
    price: 24999,
    discountPercent: 10,
    category: 'Electronics',
    brand: 'OnePlus',
    stock: 75,
    ratings: { avg: 4.7, count: 940 },
    images: ['https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Acer Swift Go 14 OLED Intel Core Ultra 5 Laptop',
    description: '14" 2.8K 90Hz OLED display, Intel Core Ultra 5 125H processor, 16GB LPDDR5X RAM, 512GB SSD, and Intel Arc Graphics.',
    price: 59990,
    discountPercent: 25,
    category: 'Electronics',
    brand: 'Acer',
    stock: 20,
    ratings: { avg: 4.8, count: 310 },
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Asus TUF Gaming F15 Core i5 11th Gen Laptop',
    description: 'NVIDIA GeForce RTX 2050 GPU, 144Hz FHD gaming display, 16GB RAM, 512GB NVMe SSD, and military-grade durability.',
    price: 49990,
    discountPercent: 33,
    category: 'Electronics',
    brand: 'Asus',
    stock: 30,
    ratings: { avg: 4.6, count: 1840 },
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Boult Audio Z40 TWS Earbuds (60H Playtime)',
    description: 'Zen ENC mic noise cancellation, 13mm bass drivers, low latency gaming mode, and IPX5 water resistance.',
    price: 1299,
    discountPercent: 74,
    category: 'Electronics',
    brand: 'Boult',
    stock: 150,
    ratings: { avg: 4.5, count: 3200 },
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Noise ColorFit Pulse 2 Max Smartwatch (1.85" Display)',
    description: '1.85-inch TFT display, Bluetooth calling, 550 nits brightness, 100+ sports modes, and 10-day battery life.',
    price: 1499,
    discountPercent: 75,
    category: 'Electronics',
    brand: 'Noise',
    stock: 200,
    ratings: { avg: 4.6, count: 4100 },
    images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80']
  },

  // HOME APPLIANCES & FASHION
  {
    name: 'Mi 32 inch HD Ready Smart Google TV',
    description: 'Vivid Picture Engine, Dolby Audio 20W speakers, Google TV with voice assistant, and bezel-less metallic frame.',
    price: 11999,
    discountPercent: 52,
    category: 'Home & Kitchen',
    brand: 'Xiaomi',
    stock: 45,
    ratings: { avg: 4.7, count: 2150 },
    images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Godrej 180 L 4 Star Direct Cool Refrigerator',
    description: 'Farm fresh crispness technology, toughened glass shelves, 16.5L jumbo vegetable tray, and Turbo Cooling.',
    price: 14990,
    discountPercent: 28,
    category: 'Home & Kitchen',
    brand: 'Godrej',
    stock: 25,
    ratings: { avg: 4.6, count: 680 },
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Voltas 1.5 Ton 3 Star Inverter Split AC',
    description: '4-in-1 adjustable cooling modes, 100% copper condenser coil, anti-dust filter, and eco-friendly R32 refrigerant.',
    price: 32990,
    discountPercent: 47,
    category: 'Home & Kitchen',
    brand: 'Voltas',
    stock: 18,
    ratings: { avg: 4.6, count: 1420 },
    images: ['https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Prestige Iris 750W Mixer Grinder (4 Jars)',
    description: '750 Watt heavy-duty motor, 3 stainless steel jars + 1 juicer jar, and ergonomic handles.',
    price: 2999,
    discountPercent: 50,
    category: 'Home & Kitchen',
    brand: 'Prestige',
    stock: 85,
    ratings: { avg: 4.5, count: 2890 },
    images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Puma Men Flyer Runner Running Shoes',
    description: 'SoftFoam+ comfort sockliner for instant step-in, lightweight EVA midsole, and durable rubber outsole traction.',
    price: 1799,
    discountPercent: 55,
    category: 'Footwear',
    brand: 'Puma',
    stock: 95,
    ratings: { avg: 4.7, count: 1850 },
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Nike Men Revolution 7 Running Shoes',
    description: 'Soft foam cushioning for smoother ride, breathable mesh upper, and generative traction pattern.',
    price: 2995,
    discountPercent: 20,
    category: 'Footwear',
    brand: 'Nike',
    stock: 70,
    ratings: { avg: 4.8, count: 1240 },
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Bata Men Formal Genuine Leather Oxfords',
    description: 'Premium full grain leather upper with cushioned footbed for office and business formal wear.',
    price: 1499,
    discountPercent: 25,
    category: 'Footwear',
    brand: 'Bata',
    stock: 60,
    ratings: { avg: 4.5, count: 780 },
    images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'U.S. Polo Assn. Solid Cotton Casual Shirt',
    description: '100% pure premium cotton twill woven shirt with signature USPA logo embroidery.',
    price: 1299,
    discountPercent: 45,
    category: 'Clothing',
    brand: 'U.S. Polo Assn.',
    stock: 110,
    ratings: { avg: 4.6, count: 950 },
    images: ['https://images.unsplash.com/photo-1625910513413-5627255f0535?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Roadster Men Slim Fit Denim Jacket',
    description: 'Classic washed blue denim jacket with flap chest pockets, spread collar, and button closures.',
    price: 1199,
    discountPercent: 60,
    category: 'Clothing',
    brand: 'Roadster',
    stock: 80,
    ratings: { avg: 4.5, count: 1640 },
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Wildcraft 45L Unisex Rucksack Trekking Backpack',
    description: 'Ergonomic padded shoulder straps, rain cover included, multi-compartment outdoor trekking bag.',
    price: 1999,
    discountPercent: 50,
    category: 'Fashion',
    brand: 'Wildcraft',
    stock: 65,
    ratings: { avg: 4.7, count: 870 },
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80']
  }
];

async function seedFlipkart() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const inserted = await Product.insertMany(flipkartProducts);
  const totalCount = await Product.countDocuments();
  console.log(`✅ ${inserted.length} Flipkart Bestseller products added successfully! Total products in database: ${totalCount}`);

  await mongoose.disconnect();
  console.log('Done!');
}

seedFlipkart().catch(console.error);
