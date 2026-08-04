const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const rawProducts = [
  // ELECTRONICS (15 products)
  {
    name: 'Apple iPhone 15 Pro Max (256GB, Titanium)',
    description: 'Forged in titanium with revolutionary A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.',
    price: 134900,
    discountPercent: 5,
    category: 'Electronics',
    brand: 'Apple',
    stock: 45,
    ratings: { avg: 4.9, count: 128 },
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Samsung Galaxy S24 Ultra 5G',
    description: 'Empowered by Galaxy AI with 200MP Quad Telephoto camera, embedded S Pen, and Snapdragon 8 Gen 3 processor.',
    price: 129999,
    discountPercent: 8,
    category: 'Electronics',
    brand: 'Samsung',
    stock: 35,
    ratings: { avg: 4.8, count: 94 },
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise cancellation with 8 microphones, Auto NC Optimizer, and 30-hour battery life.',
    price: 29990,
    discountPercent: 15,
    category: 'Electronics',
    brand: 'Sony',
    stock: 60,
    ratings: { avg: 4.7, count: 210 },
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Apple MacBook Air 15" M3 Chip',
    description: 'Stunning 15.3-inch Liquid Retina display, M3 chip speed, up to 18 hours of battery life, and silent fanless design.',
    price: 134900,
    discountPercent: 6,
    category: 'Electronics',
    brand: 'Apple',
    stock: 25,
    ratings: { avg: 4.9, count: 85 },
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Asus ROG Zephyrus G16 Gaming Laptop',
    description: 'Intel Core Ultra 9, RTX 4080 GPU, 240Hz OLED display, and ultra-thin CNC aluminum chassis for esports gaming.',
    price: 189990,
    discountPercent: 10,
    category: 'Electronics',
    brand: 'Asus',
    stock: 18,
    ratings: { avg: 4.8, count: 42 },
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Dell UltraSharp 27" 4K USB-C Hub Monitor',
    description: 'IPS Black panel technology, 100% sRGB color coverage, USB-C 90W power delivery, and ultra-thin bezel.',
    price: 48990,
    discountPercent: 12,
    category: 'Electronics',
    brand: 'Dell',
    stock: 30,
    ratings: { avg: 4.6, count: 64 },
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Bose SoundLink Revolve+ II Bluetooth Speaker',
    description: 'True 360-degree sound with deep bass, IP55 water-resistant rating, and up to 17 hours per charge.',
    price: 24500,
    discountPercent: 10,
    category: 'Electronics',
    brand: 'Bose',
    stock: 40,
    ratings: { avg: 4.7, count: 115 },
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Apple Watch Ultra 2 (GPS + Cellular)',
    description: 'Rugged titanium case, precision dual-frequency GPS, up to 36-hour battery, and 100m water resistance.',
    price: 89900,
    discountPercent: 4,
    category: 'Electronics',
    brand: 'Apple',
    stock: 22,
    ratings: { avg: 4.9, count: 76 },
    images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Canon EOS R6 Mark II Mirrorless Camera',
    description: '24.2 MP full-frame CMOS sensor, 40 fps high-speed shooting, 4K 60p uncropped video, and Dual Pixel CMOS AF II.',
    price: 215995,
    discountPercent: 7,
    category: 'Electronics',
    brand: 'Canon',
    stock: 12,
    ratings: { avg: 4.9, count: 38 },
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'DJI Mini 4 Pro Fly More Combo',
    description: 'Under 249g ultralight drone, 4K/60fps HDR video, omnidirectional obstacle sensing, and 34-min flight time.',
    price: 94990,
    discountPercent: 5,
    category: 'Electronics',
    brand: 'DJI',
    stock: 15,
    ratings: { avg: 4.8, count: 52 },
    images: ['https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Apple iPad Pro 11" M4 (Wi-Fi 256GB)',
    description: 'Ultra Retina XDR OLED display, M4 chip performance, incredibly thin 5.3mm design, and Apple Pencil Pro support.',
    price: 99900,
    discountPercent: 5,
    category: 'Electronics',
    brand: 'Apple',
    stock: 28,
    ratings: { avg: 4.9, count: 68 },
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Sony PlayStation 5 Slim Console',
    description: 'Ultra-high speed SSD, haptic feedback, adaptive triggers, 3D Audio technology, and stunning 4K gaming graphics.',
    price: 54990,
    discountPercent: 10,
    category: 'Electronics',
    brand: 'Sony',
    stock: 50,
    ratings: { avg: 4.9, count: 320 },
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Samsung 55" Neo QLED 4K Smart TV',
    description: 'Quantum Matrix Technology with Mini LEDs, Neural Quantum Processor 4K, Dolby Atmos, and 120Hz refresh rate.',
    price: 114990,
    discountPercent: 15,
    category: 'Electronics',
    brand: 'Samsung',
    stock: 20,
    ratings: { avg: 4.7, count: 88 },
    images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Marshall Stanmore III Wireless Speaker',
    description: 'Iconic vintage amplifier design with wide soundstage, dynamic loudness, and Bluetooth 5.2 connectivity.',
    price: 31999,
    discountPercent: 8,
    category: 'Electronics',
    brand: 'Marshall',
    stock: 35,
    ratings: { avg: 4.8, count: 96 },
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Anker 737 Power Bank (PowerCore 24K)',
    description: '24,000mAh portable charger with 140W fast charging output, smart digital display, and 3 USB ports.',
    price: 14999,
    discountPercent: 20,
    category: 'Electronics',
    brand: 'Anker',
    stock: 80,
    ratings: { avg: 4.8, count: 140 },
    images: ['https://images.unsplash.com/photo-1609592424089-8d76e73715e2?w=800&auto=format&fit=crop&q=80']
  },

  // FASHION & ACCESSORIES (15 products)
  {
    name: 'Classic Genuine Leather Chronograph Watch',
    description: 'Handcrafted Italian leather strap, Japanese quartz movement, scratch-resistant sapphire crystal glass, and 50m water resistance.',
    price: 7999,
    discountPercent: 15,
    category: 'Fashion',
    brand: 'Chronos',
    stock: 40,
    ratings: { avg: 4.7, count: 56 },
    images: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Polarized Aviator Sunglasses Collection',
    description: 'UV400 protection polarized lenses with lightweight titanium frame and non-slip silicone nose pads.',
    price: 1999,
    discountPercent: 20,
    category: 'Fashion',
    brand: 'Ray-Ban',
    stock: 75,
    ratings: { avg: 4.6, count: 110 },
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Minimalist Waterproof Travel Backpack',
    description: 'Eco-friendly ballistic nylon with padded 16-inch laptop compartment, hidden anti-theft pocket, and USB charging port.',
    price: 3499,
    discountPercent: 25,
    category: 'Fashion',
    brand: 'UrbanCraft',
    stock: 65,
    ratings: { avg: 4.7, count: 82 },
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Fossil Men Neutra Chronograph Stainless Watch',
    description: 'Sleek gunmetal stainless steel bracelet watch with Roman numeral indexes and sub-eye stopwatches.',
    price: 14495,
    discountPercent: 30,
    category: 'Fashion',
    brand: 'Fossil',
    stock: 30,
    ratings: { avg: 4.8, count: 95 },
    images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Michael Kors Jet Set Leather Tote Bag',
    description: 'Saffiano leather handbag with gold-tone hardware, zip closure, and spacious interior organizer pockets.',
    price: 18900,
    discountPercent: 20,
    category: 'Fashion',
    brand: 'Michael Kors',
    stock: 25,
    ratings: { avg: 4.8, count: 74 },
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Tommy Hilfiger Genuine Bifold Leather Wallet',
    description: '100% cowhide leather with RFID blocking technology, 6 card slots, and removable passcase.',
    price: 2499,
    discountPercent: 15,
    category: 'Fashion',
    brand: 'Tommy Hilfiger',
    stock: 120,
    ratings: { avg: 4.6, count: 180 },
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Casio G-Shock Carbon Core Guard Watch',
    description: 'Shock resistant 200m water resistant digital-analog watch with double LED illuminator and countdown timer.',
    price: 9995,
    discountPercent: 10,
    category: 'Fashion',
    brand: 'Casio',
    stock: 55,
    ratings: { avg: 4.8, count: 160 },
    images: ['https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Oakley Holbrook Polarized Sunglasses',
    description: 'O Matter stress-resistant frame with Plutonite lenses filtering 100% UV rays.',
    price: 8490,
    discountPercent: 12,
    category: 'Fashion',
    brand: 'Oakley',
    stock: 45,
    ratings: { avg: 4.7, count: 68 },
    images: ['https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Herschel Little America Laptop Backpack',
    description: 'Iconic mountaineering silhouette with custom striped fabric liner, magnetic strap closures, and fleece laptop sleeve.',
    price: 7999,
    discountPercent: 15,
    category: 'Fashion',
    brand: 'Herschel',
    stock: 50,
    ratings: { avg: 4.7, count: 90 },
    images: ['https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Titan Regalia Opulent Quartz Watch',
    description: 'Gold-plated stainless steel watch with champagne dial, day-date window, and water-resistant casing.',
    price: 6495,
    discountPercent: 20,
    category: 'Fashion',
    brand: 'Titan',
    stock: 40,
    ratings: { avg: 4.6, count: 112 },
    images: ['https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Samsonite Omni Hard Shell Luggage Set',
    description: 'Lightweight polycarbonate spinner luggage with TSA locks and scratch-resistant micro-diamond texture.',
    price: 19999,
    discountPercent: 25,
    category: 'Fashion',
    brand: 'Samsonite',
    stock: 20,
    ratings: { avg: 4.8, count: 75 },
    images: ['https://images.unsplash.com/photo-1565026057447-b88e40e687ba?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Kate Spade New York Leather Crossbody',
    description: 'Refined grain leather crossbody handbag with spade flower jacquard lining and top zip closure.',
    price: 16490,
    discountPercent: 18,
    category: 'Fashion',
    brand: 'Kate Spade',
    stock: 28,
    ratings: { avg: 4.7, count: 48 },
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Seiko 5 Sports Automatic Mechanical Watch',
    description: '24-jewel automatic movement with manual winding capability, luminous hands, and transparent case back.',
    price: 26000,
    discountPercent: 10,
    category: 'Fashion',
    brand: 'Seiko',
    stock: 22,
    ratings: { avg: 4.9, count: 105 },
    images: ['https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Tumi Alpha 3 Organizer Briefcase',
    description: 'FXT ballistic nylon business briefcase with TUMI Tracer program and removable padded shoulder strap.',
    price: 42000,
    discountPercent: 10,
    category: 'Fashion',
    brand: 'Tumi',
    stock: 14,
    ratings: { avg: 4.9, count: 32 },
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Police Black Square Polarized Men Sunglasses',
    description: 'Acetate frame with anti-glare mirror lenses for driving and outdoors.',
    price: 6990,
    discountPercent: 20,
    category: 'Fashion',
    brand: 'Police',
    stock: 50,
    ratings: { avg: 4.6, count: 45 },
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80']
  },

  // FOOTWEAR (15 products)
  {
    name: 'Nike Air Jordan 1 Retro High OG',
    description: 'Iconic sneaker with premium leather upper, encapsulated Air-Sole unit, and solid rubber outsole.',
    price: 16995,
    discountPercent: 10,
    category: 'Footwear',
    brand: 'Nike',
    stock: 45,
    ratings: { avg: 4.9, count: 240 },
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Adidas Ultraboost Light Running Shoes',
    description: 'Lightest Ultraboost ever made with Light BOOST material for ultimate energy return and Primeknit+ upper.',
    price: 18999,
    discountPercent: 15,
    category: 'Footwear',
    brand: 'Adidas',
    stock: 60,
    ratings: { avg: 4.8, count: 180 },
    images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Puma Velocity Nitro 3 Running Shoes',
    description: 'NITROFOAM cushioning technology for lightweight responsiveness and PUMAGRIP durable rubber traction.',
    price: 11999,
    discountPercent: 20,
    category: 'Footwear',
    brand: 'Puma',
    stock: 75,
    ratings: { avg: 4.7, count: 130 },
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'New Balance 9060 Unisex Sneakers',
    description: 'Futuristic lifestyle sneaker featuring ABZORB and SBS cushioning with dual-density midsole.',
    price: 15999,
    discountPercent: 5,
    category: 'Footwear',
    brand: 'New Balance',
    stock: 35,
    ratings: { avg: 4.8, count: 98 },
    images: ['https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Clarks Genuine Leather Formal Oxfords',
    description: 'Handcrafted full-grain leather upper with Cushion Plus technology for all-day office comfort.',
    price: 8999,
    discountPercent: 25,
    category: 'Footwear',
    brand: 'Clarks',
    stock: 50,
    ratings: { avg: 4.6, count: 76 },
    images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Asics Gel-Kayano 30 Stability Shoes',
    description: '4D GUIDANCE SYSTEM for adaptive stability, PureGEL technology, and FF BLAST PLUS ECO cushioning.',
    price: 15999,
    discountPercent: 10,
    category: 'Footwear',
    brand: 'Asics',
    stock: 40,
    ratings: { avg: 4.9, count: 145 },
    images: ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Timberland 6-Inch Premium Waterproof Boot',
    description: 'Rugged nubuck leather, seam-sealed waterproof construction, 400 grams of PrimaLoft insulation.',
    price: 17990,
    discountPercent: 12,
    category: 'Footwear',
    brand: 'Timberland',
    stock: 30,
    ratings: { avg: 4.8, count: 110 },
    images: ['https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Converse Chuck Taylor All Star High Top',
    description: 'Timeless canvas upper, classic star ankle patch, and durable vulcanized rubber sole.',
    price: 4999,
    discountPercent: 15,
    category: 'Footwear',
    brand: 'Converse',
    stock: 100,
    ratings: { avg: 4.7, count: 350 },
    images: ['https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Vans Old Skool Core Classics',
    description: 'Iconic side-stripe skate shoe with sturdy suede and canvas uppers, re-enforced toecaps, and waffle outsoles.',
    price: 4599,
    discountPercent: 10,
    category: 'Footwear',
    brand: 'Vans',
    stock: 90,
    ratings: { avg: 4.7, count: 280 },
    images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Skechers Arch Fit Go Walk Slip-On',
    description: 'Podiatrist-certified arch support insole system with breathable athletic mesh fabric upper.',
    price: 6499,
    discountPercent: 20,
    category: 'Footwear',
    brand: 'Skechers',
    stock: 80,
    ratings: { avg: 4.6, count: 195 },
    images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Crocs Classic Clog Water Shoes',
    description: 'Lightweight Croslite foam footbed, ventilation ports for breathability, and pivoting heel straps.',
    price: 3495,
    discountPercent: 10,
    category: 'Footwear',
    brand: 'Crocs',
    stock: 120,
    ratings: { avg: 4.6, count: 420 },
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Birkenstock Arizona Unisex Sandals',
    description: 'Anatomically shaped cork-latex footbed with suede lining and adjustable metal pin buckles.',
    price: 8990,
    discountPercent: 5,
    category: 'Footwear',
    brand: 'Birkenstock',
    stock: 45,
    ratings: { avg: 4.8, count: 210 },
    images: ['https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Dr. Martens 1460 Smooth Leather Boot',
    description: '8-eyelet boot built on the iconic AirWair air-cushioned sole with yellow welt stitching.',
    price: 16990,
    discountPercent: 10,
    category: 'Footwear',
    brand: 'Dr. Martens',
    stock: 25,
    ratings: { avg: 4.8, count: 135 },
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Reebok Nano X4 Cross Training Shoes',
    description: 'LIFT AND RUN chassis system with Floatride Energy Foam for stability during intense workout sets.',
    price: 10999,
    discountPercent: 20,
    category: 'Footwear',
    brand: 'Reebok',
    stock: 60,
    ratings: { avg: 4.7, count: 88 },
    images: ['https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Under Armour Armor Phantom 3 SE',
    description: 'UA Intelliknit upper, SpeedForm 2.0 sockliner, and responsive UA HOVR cushioning.',
    price: 13999,
    discountPercent: 15,
    category: 'Footwear',
    brand: 'Under Armour',
    stock: 40,
    ratings: { avg: 4.7, count: 64 },
    images: ['https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&auto=format&fit=crop&q=80']
  },

  // CLOTHING (15 products)
  {
    name: 'Vintage Wash Heavyweight Denim Jacket',
    description: '100% heavy-duty organic cotton denim with custom brass buttons and relaxed unisex fit.',
    price: 3999,
    discountPercent: 25,
    category: 'Clothing',
    brand: "Levi's",
    stock: 70,
    ratings: { avg: 4.7, count: 92 },
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'The North Face McMurdo Down Parka',
    description: '600-fill recycled waterfowl down insulation with waterproof DryVent shell for sub-zero weather.',
    price: 24990,
    discountPercent: 15,
    category: 'Clothing',
    brand: 'The North Face',
    stock: 25,
    ratings: { avg: 4.9, count: 64 },
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Nike Sportswear Tech Fleece Full-Zip Hoodie',
    description: 'Smooth on both sides, Tech Fleece offers premium warmth without added weight or bulk.',
    price: 8995,
    discountPercent: 10,
    category: 'Clothing',
    brand: 'Nike',
    stock: 85,
    ratings: { avg: 4.8, count: 175 },
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: "Levi's 501 Original Fit Jeans",
    description: 'The archetype of all jeans since 1873. Straight leg cut with signature button fly.',
    price: 4999,
    discountPercent: 20,
    category: 'Clothing',
    brand: "Levi's",
    stock: 120,
    ratings: { avg: 4.8, count: 310 },
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Ralph Lauren Classic Fit Pique Polo Shirt',
    description: '100% breathable cotton pique with signature embroidered pony logo on the chest.',
    price: 7990,
    discountPercent: 15,
    category: 'Clothing',
    brand: 'Ralph Lauren',
    stock: 60,
    ratings: { avg: 4.7, count: 140 },
    images: ['https://images.unsplash.com/photo-1625910513413-5627255f0535?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Patagonia Better Sweater Fleece Jacket',
    description: '100% recycled polyester fleece dyed with a low-impact process that significantly reduces environmental impact.',
    price: 11990,
    discountPercent: 10,
    category: 'Clothing',
    brand: 'Patagonia',
    stock: 35,
    ratings: { avg: 4.9, count: 88 },
    images: ['https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Calvin Klein Modern Cotton Crewneck T-Shirt 3-Pack',
    description: 'Ultra-soft cotton modal stretch blend for breathable everyday comfort.',
    price: 3499,
    discountPercent: 25,
    category: 'Clothing',
    brand: 'Calvin Klein',
    stock: 100,
    ratings: { avg: 4.6, count: 210 },
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Zara Oversized Wool Blend Coat',
    description: 'Tailored notched lapel coat with double-breasted front and back vent.',
    price: 9990,
    discountPercent: 20,
    category: 'Clothing',
    brand: 'Zara',
    stock: 40,
    ratings: { avg: 4.7, count: 55 },
    images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Uniqlo Ultra Light Down Jacket',
    description: 'Packable water-repellent jacket insulated with premium down for warmth on the go.',
    price: 5990,
    discountPercent: 10,
    category: 'Clothing',
    brand: 'Uniqlo',
    stock: 90,
    ratings: { avg: 4.8, count: 240 },
    images: ['https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Hugo Boss Slim Fit Italian Wool Suit',
    description: 'Precision-tailored suit crafted in virgin wool woven in Italy for corporate occasions.',
    price: 49990,
    discountPercent: 15,
    category: 'Clothing',
    brand: 'Hugo Boss',
    stock: 15,
    ratings: { avg: 4.9, count: 34 },
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Champion Reverse Weave Sweatshirt',
    description: 'Heavyweight 12 oz. fleece cut on the cross-grain to resist vertical shrinkage.',
    price: 4499,
    discountPercent: 20,
    category: 'Clothing',
    brand: 'Champion',
    stock: 80,
    ratings: { avg: 4.7, count: 165 },
    images: ['https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Tommy Hilfiger Chino Trousers',
    description: 'Stretch organic cotton twill chinos in a modern slim tapered fit.',
    price: 6999,
    discountPercent: 25,
    category: 'Clothing',
    brand: 'Tommy Hilfiger',
    stock: 65,
    ratings: { avg: 4.6, count: 98 },
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Superdry Military Cargo Pants',
    description: 'Durable cotton canvas trousers featuring multi-pocket utility styling.',
    price: 5499,
    discountPercent: 15,
    category: 'Clothing',
    brand: 'Superdry',
    stock: 50,
    ratings: { avg: 4.6, count: 72 },
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Columbia Watertight II Rain Jacket',
    description: 'Fully seam-sealed Omni-Tech waterproof breathable nylon jacket.',
    price: 6499,
    discountPercent: 20,
    category: 'Clothing',
    brand: 'Columbia',
    stock: 55,
    ratings: { avg: 4.7, count: 110 },
    images: ['https://images.unsplash.com/photo-1508873696983-2df515122519?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Lacoste Classic Fit Pique Polo',
    description: 'The original polo shirt created by René Lacoste in 1933 with signature crocodile badge.',
    price: 8500,
    discountPercent: 10,
    category: 'Clothing',
    brand: 'Lacoste',
    stock: 45,
    ratings: { avg: 4.8, count: 140 },
    images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80']
  },

  // HOME & KITCHEN (15 products)
  {
    name: 'Lumina Smart LED Ambient Desk Lamp',
    description: 'Touch control lamp with customizable color temperature, wireless phone charger base, and auto-dimming sensor.',
    price: 2499,
    discountPercent: 20,
    category: 'Home & Kitchen',
    brand: 'Lumina',
    stock: 90,
    ratings: { avg: 4.7, count: 78 },
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'RoboClean Smart Robot Vacuum Cleaner',
    description: 'LiDAR laser navigation mapping, 4000Pa suction power, automatic mop washing dock, and smartphone app scheduling.',
    price: 29999,
    discountPercent: 15,
    category: 'Home & Kitchen',
    brand: 'RoboClean',
    stock: 25,
    ratings: { avg: 4.8, count: 62 },
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Dyson V15 Detect Cordless Vacuum',
    description: 'Laser reveals invisible dust on hard floors with piezo sensor counting and sizing particles in real time.',
    price: 65900,
    discountPercent: 5,
    category: 'Home & Kitchen',
    brand: 'Dyson',
    stock: 20,
    ratings: { avg: 4.9, count: 140 },
    images: ['https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Instant Pot Duo 7-in-1 Pressure Cooker',
    description: 'Replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker and warmer.',
    price: 8999,
    discountPercent: 30,
    category: 'Home & Kitchen',
    brand: 'Instant Pot',
    stock: 85,
    ratings: { avg: 4.8, count: 290 },
    images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Philips Airfryer XXL Digital 7.2L',
    description: 'Rapid CombiAir technology cooks food 40% faster with 90% less fat than traditional frying.',
    price: 17999,
    discountPercent: 20,
    category: 'Home & Kitchen',
    brand: 'Philips',
    stock: 40,
    ratings: { avg: 4.8, count: 185 },
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'DeLonghi Magnifica S Espresso Machine',
    description: 'Compact bean-to-cup espresso and cappuccino machine with manual milk frother and integrated grinder.',
    price: 49990,
    discountPercent: 12,
    category: 'Home & Kitchen',
    brand: 'DeLonghi',
    stock: 15,
    ratings: { avg: 4.9, count: 95 },
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Ninja Professional Countertop Blender 1000W',
    description: '1000 watts of professional power can crush ice into snow in seconds for smoothies and frozen drinks.',
    price: 9999,
    discountPercent: 25,
    category: 'Home & Kitchen',
    brand: 'Ninja',
    stock: 50,
    ratings: { avg: 4.7, count: 210 },
    images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'KitchenAid Artisan 4.8L Stand Mixer',
    description: 'Iconic tilt-head design with 10 speeds and planetary mixing action for mixing dough and batter.',
    price: 44990,
    discountPercent: 10,
    category: 'Home & Kitchen',
    brand: 'KitchenAid',
    stock: 18,
    ratings: { avg: 4.9, count: 175 },
    images: ['https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Le Creuset Enameled Cast Iron Dutch Oven 5.3L',
    description: 'Unmatched heat retention and distribution with durable porcelain enamel exterior.',
    price: 32990,
    discountPercent: 8,
    category: 'Home & Kitchen',
    brand: 'Le Creuset',
    stock: 12,
    ratings: { avg: 4.9, count: 84 },
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Dyson Purifier Cool Gen1 Air Purifier',
    description: 'HEPA H13 filter captures 99.95% of ultrafine particles with Air Multiplier technology to purify whole room.',
    price: 32900,
    discountPercent: 15,
    category: 'Home & Kitchen',
    brand: 'Dyson',
    stock: 25,
    ratings: { avg: 4.8, count: 102 },
    images: ['https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Cuisinart 12-Piece Stainless Steel Cookware Set',
    description: 'Triple-ply construction with aluminum core bonded to stainless steel for professional performance.',
    price: 19999,
    discountPercent: 30,
    category: 'Home & Kitchen',
    brand: 'Cuisinart',
    stock: 30,
    ratings: { avg: 4.7, count: 68 },
    images: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Nespresso VertuoPop Coffee Machine',
    description: 'Centrifusion technology brews 5 cup sizes at the touch of a single button.',
    price: 16999,
    discountPercent: 20,
    category: 'Home & Kitchen',
    brand: 'Nespresso',
    stock: 45,
    ratings: { avg: 4.7, count: 125 },
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Anker Eufy Security Cam S330 eufyCam 3',
    description: '4K solar powered outdoor security camera with BionicMind AI facial recognition.',
    price: 24999,
    discountPercent: 15,
    category: 'Home & Kitchen',
    brand: 'Eufy',
    stock: 35,
    ratings: { avg: 4.8, count: 58 },
    images: ['https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Breville Barista Touch Espresso Machine',
    description: 'Automation at every stage with touch screen menu, integrated precision conical burr grinder.',
    price: 99990,
    discountPercent: 10,
    category: 'Home & Kitchen',
    brand: 'Breville',
    stock: 8,
    ratings: { avg: 4.9, count: 42 },
    images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Zinus Memory Foam 10-Inch Mattress',
    description: 'Green tea infused memory foam mattress with pressure-relieving comfort and motion isolation.',
    price: 15999,
    discountPercent: 35,
    category: 'Home & Kitchen',
    brand: 'Zinus',
    stock: 40,
    ratings: { avg: 4.6, count: 190 },
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80']
  },

  // SPORTS & FITNESS (15 products)
  {
    name: 'ProForm Carbon TL Folding Treadmill',
    description: '2.6 CHP Mach Z motor, 0-10mph speed range, ProShox cushioning, and 5-inch high contrast display.',
    price: 54990,
    discountPercent: 20,
    category: 'Sports & Fitness',
    brand: 'ProForm',
    stock: 15,
    ratings: { avg: 4.7, count: 48 },
    images: ['https://images.unsplash.com/photo-1576678927484-cc909957088c?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Bowflex SelectTech 552 Adjustable Dumbbells',
    description: 'Replaces 15 sets of weights with dial adjustment from 5 lbs up to 52.5 lbs per dumbbell.',
    price: 34990,
    discountPercent: 15,
    category: 'Sports & Fitness',
    brand: 'Bowflex',
    stock: 25,
    ratings: { avg: 4.9, count: 180 },
    images: ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Liforme Premium Non-Slip Yoga Mat 4.2mm',
    description: 'Revolutionary GripForMe material with AlignForMe alignment system markers.',
    price: 11990,
    discountPercent: 10,
    category: 'Sports & Fitness',
    brand: 'Liforme',
    stock: 50,
    ratings: { avg: 4.9, count: 135 },
    images: ['https://images.unsplash.com/photo-1601925228008-f5e4c1e5e9b8?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Garmin Forerunner 965 GPS Running Smartwatch',
    description: 'AMOLED touchscreen display, titanium bezel, advanced training metrics, and full-color built-in maps.',
    price: 67990,
    discountPercent: 5,
    category: 'Sports & Fitness',
    brand: 'Garmin',
    stock: 20,
    ratings: { avg: 4.9, count: 92 },
    images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Theragun PRO G5 Deep Tissue Percussive Massager',
    description: 'Commercial-grade quiet motor with OLED screen, 6 attachments, and Bluetooth app connectivity.',
    price: 49990,
    discountPercent: 12,
    category: 'Sports & Fitness',
    brand: 'Therabody',
    stock: 18,
    ratings: { avg: 4.8, count: 75 },
    images: ['https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Wilson Pro Staff 97 v14 Tennis Racket',
    description: 'Precision braided graphite construction offering legendary feel and control for advanced players.',
    price: 23999,
    discountPercent: 10,
    category: 'Sports & Fitness',
    brand: 'Wilson',
    stock: 30,
    ratings: { avg: 4.8, count: 54 },
    images: ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Spalding NBA Official Game Basketball',
    description: 'Full grain horween leather cover designed for top indoor professional gameplay.',
    price: 12999,
    discountPercent: 15,
    category: 'Sports & Fitness',
    brand: 'Spalding',
    stock: 45,
    ratings: { avg: 4.9, count: 160 },
    images: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Concept2 Model D Indoor Rowing Machine',
    description: 'PM5 Performance Monitor for stroke tracking with air-resistance flywheel.',
    price: 99900,
    discountPercent: 5,
    category: 'Sports & Fitness',
    brand: 'Concept2',
    stock: 10,
    ratings: { avg: 4.9, count: 88 },
    images: ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Under Armour Undeniable 5.0 Duffle Bag',
    description: 'UA Storm water-resistant technology keeps gear dry with ventilated laundry pocket.',
    price: 3999,
    discountPercent: 20,
    category: 'Sports & Fitness',
    brand: 'Under Armour',
    stock: 70,
    ratings: { avg: 4.7, count: 140 },
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'TRX PRO4 System Suspension Trainer',
    description: 'Full body workout resistance straps with rubber handles and door anchor for home travel.',
    price: 19999,
    discountPercent: 15,
    category: 'Sports & Fitness',
    brand: 'TRX',
    stock: 35,
    ratings: { avg: 4.8, count: 110 },
    images: ['https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Trek Marlin 7 Hardtail Mountain Bike',
    description: 'Alpha Gold Aluminum frame with RockShox Judy fork and Shimano Deore 1x10 drivetrain.',
    price: 72990,
    discountPercent: 8,
    category: 'Sports & Fitness',
    brand: 'Trek',
    stock: 8,
    ratings: { avg: 4.9, count: 36 },
    images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Speedo Fastskin Hyper Elite Goggles',
    description: 'Hydrodynamic profile for maximum speed through water with IQfit 3D goggle seal.',
    price: 5999,
    discountPercent: 15,
    category: 'Sports & Fitness',
    brand: 'Speedo',
    stock: 50,
    ratings: { avg: 4.7, count: 82 },
    images: ['https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Hydro Flask 32 oz Wide Mouth Bottle',
    description: 'TempShield double wall vacuum insulation keeps beverages cold up to 24 hours.',
    price: 4499,
    discountPercent: 10,
    category: 'Sports & Fitness',
    brand: 'Hydro Flask',
    stock: 90,
    ratings: { avg: 4.8, count: 240 },
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Fitbit Charge 6 Fitness Tracker',
    description: 'Built-in GPS, 40+ exercise modes, 24/7 heart rate monitoring, and YouTube Music controls.',
    price: 14999,
    discountPercent: 15,
    category: 'Sports & Fitness',
    brand: 'Fitbit',
    stock: 65,
    ratings: { avg: 4.6, count: 170 },
    images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Rogue Ohio Bar 20KG Barbell',
    description: '190,000 PSI steel barbell manufactured in Columbus Ohio for weightlifting & powerlifting.',
    price: 29990,
    discountPercent: 10,
    category: 'Sports & Fitness',
    brand: 'Rogue',
    stock: 20,
    ratings: { avg: 4.9, count: 95 },
    images: ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80']
  },

  // BOOKS & MEDIA (15 products)
  {
    name: 'Atomic Habits by James Clear (Hardcover Edition)',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Over 15 million copies sold globally.',
    price: 699,
    discountPercent: 30,
    category: 'Books',
    brand: 'Penguin',
    stock: 200,
    ratings: { avg: 4.9, count: 540 },
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Harry Potter Complete Hardcover Boxed Set',
    description: 'All 7 books in the magical Harry Potter saga by J.K. Rowling in a collectible display trunk.',
    price: 6499,
    discountPercent: 20,
    category: 'Books',
    brand: 'Bloomsbury',
    stock: 60,
    ratings: { avg: 4.9, count: 410 },
    images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'The Psychology of Money by Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness doing well with money.',
    price: 499,
    discountPercent: 25,
    category: 'Books',
    brand: 'Harriman House',
    stock: 180,
    ratings: { avg: 4.8, count: 380 },
    images: ['https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    description: 'By Robert C. Martin. Essential reading for every software developer and engineer.',
    price: 2499,
    discountPercent: 15,
    category: 'Books',
    brand: 'Prentice Hall',
    stock: 80,
    ratings: { avg: 4.8, count: 210 },
    images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Designing Data-Intensive Applications by Martin Kleppmann',
    description: 'The big ideas behind reliable, scalable, and maintainable systems architecture.',
    price: 2999,
    discountPercent: 10,
    category: 'Books',
    brand: "O'Reilly",
    stock: 75,
    ratings: { avg: 4.9, count: 190 },
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'The Lord of the Rings Deluxe Edition Hardcover',
    description: 'J.R.R. Tolkien trilogy single-volume edition with red foil stamped cloth binding.',
    price: 4499,
    discountPercent: 15,
    category: 'Books',
    brand: 'HarperCollins',
    stock: 45,
    ratings: { avg: 4.9, count: 260 },
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Deep Work by Cal Newport',
    description: 'Rules for Focused Success in a Distracted World.',
    price: 599,
    discountPercent: 20,
    category: 'Books',
    brand: 'Grand Central',
    stock: 130,
    ratings: { avg: 4.7, count: 230 },
    images: ['https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Sapiens: A Brief History of Humankind',
    description: 'By Yuval Noah Harari. Explores how Homo sapiens conquered planet Earth.',
    price: 799,
    discountPercent: 30,
    category: 'Books',
    brand: 'Vintage',
    stock: 150,
    ratings: { avg: 4.8, count: 480 },
    images: ['https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Dune Deluxe Hardcover Illustrated Edition',
    description: 'Frank Herbert sci-fi masterpiece with custom endpapers and stained edges.',
    price: 2499,
    discountPercent: 15,
    category: 'Books',
    brand: 'Ace',
    stock: 55,
    ratings: { avg: 4.9, count: 175 },
    images: ['https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Thinking, Fast and Slow by Daniel Kahneman',
    description: 'Nobel Memorial Prize winner in Economic Sciences explains the two systems that drive human thought.',
    price: 699,
    discountPercent: 25,
    category: 'Books',
    brand: 'Farrar, Straus and Giroux',
    stock: 110,
    ratings: { avg: 4.7, count: 310 },
    images: ['https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'The Pragmatic Programmer: 20th Anniversary Edition',
    description: 'By David Thomas & Andrew Hunt. Your journey to mastery in software craft.',
    price: 3299,
    discountPercent: 10,
    category: 'Books',
    brand: 'Addison-Wesley',
    stock: 65,
    ratings: { avg: 4.9, count: 140 },
    images: ['https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Man Search for Meaning by Viktor E. Frankl',
    description: 'Psychiatrist Viktor Frankl memoir of surviving Nazi death camps.',
    price: 399,
    discountPercent: 20,
    category: 'Books',
    brand: 'Beacon Press',
    stock: 140,
    ratings: { avg: 4.9, count: 390 },
    images: ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Rich Dad Poor Dad by Robert T. Kiyosaki',
    description: 'What the rich teach their kids about money that the poor and middle class do not.',
    price: 499,
    discountPercent: 30,
    category: 'Books',
    brand: 'Plata Publishing',
    stock: 220,
    ratings: { avg: 4.7, count: 620 },
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Steve Jobs Biography by Walter Isaacson',
    description: 'The exclusive biography based on more than forty interviews with Jobs conducted over two years.',
    price: 899,
    discountPercent: 20,
    category: 'Books',
    brand: 'Simon & Schuster',
    stock: 85,
    ratings: { avg: 4.8, count: 210 },
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Zero to One: Notes on Startups by Peter Thiel',
    description: 'How to build the future from Paypal co-founder and Palantir investor Peter Thiel.',
    price: 599,
    discountPercent: 25,
    category: 'Books',
    brand: 'Crown Business',
    stock: 95,
    ratings: { avg: 4.7, count: 180 },
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80']
  },

  // BEAUTY & PERSONAL CARE (10 products)
  {
    name: 'Dyson Airwrap Multi-Styler Complete Long',
    description: 'Curl, shape, smooth and hide flyaways using Coanda airflow with no extreme heat.',
    price: 49900,
    discountPercent: 5,
    category: 'Beauty & Care',
    brand: 'Dyson',
    stock: 18,
    ratings: { avg: 4.9, count: 155 },
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'La Mer Crème de la Mer Moisturizing Cream 60ml',
    description: 'Infused with Miracle Broth to soothe sensitivities and restore skin radiance.',
    price: 32500,
    discountPercent: 8,
    category: 'Beauty & Care',
    brand: 'La Mer',
    stock: 12,
    ratings: { avg: 4.8, count: 64 },
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Estée Lauder Advanced Night Repair Serum 50ml',
    description: 'Patented Chronolux Power Signal Technology for fast visible repair and youth-generating power.',
    price: 9500,
    discountPercent: 15,
    category: 'Beauty & Care',
    brand: 'Estée Lauder',
    stock: 40,
    ratings: { avg: 4.8, count: 210 },
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Chanel Bleus de Chanel Eau De Parfum 100ml',
    description: 'An aromatic woody fragrance with captivating trail of New Caledonian sandalwood.',
    price: 14500,
    discountPercent: 10,
    category: 'Beauty & Care',
    brand: 'Chanel',
    stock: 30,
    ratings: { avg: 4.9, count: 185 },
    images: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Philips Norelco Series 9000 Electric Shaver',
    description: 'SkinIQ technology senses and adapts to hair density with Dual SteelPrecision self-sharpening blades.',
    price: 19999,
    discountPercent: 20,
    category: 'Beauty & Care',
    brand: 'Philips',
    stock: 35,
    ratings: { avg: 4.7, count: 92 },
    images: ['https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Olaplex No. 3 Hair Perfector Repairing Treatment',
    description: 'Patented bond building treatment reduces breakage and visibly strengthens hair.',
    price: 3200,
    discountPercent: 10,
    category: 'Beauty & Care',
    brand: 'Olaplex',
    stock: 75,
    ratings: { avg: 4.8, count: 310 },
    images: ['https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'FOREO LUNA 4 Smart Facial Cleansing Brush',
    description: 'T-Sonic pulsations remove 99% of dirt, oil and makeup residue in 1 minute.',
    price: 21900,
    discountPercent: 15,
    category: 'Beauty & Care',
    brand: 'FOREO',
    stock: 22,
    ratings: { avg: 4.7, count: 48 },
    images: ['https://images.unsplash.com/photo-1512290900676-26c2a4d4b51b?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Dior Sauvage Elixir Parfum 60ml',
    description: 'Concentrated fragrance steeped in the iconic freshness of Sauvage with a intoxicating heart of spices.',
    price: 16900,
    discountPercent: 5,
    category: 'Beauty & Care',
    brand: 'Dior',
    stock: 28,
    ratings: { avg: 4.9, count: 240 },
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'CeraVe Hydrating Facial Cleanser 473ml',
    description: 'Formulated with 3 essential ceramides and hyaluronic acid to cleanse without stripping skin barrier.',
    price: 1650,
    discountPercent: 15,
    category: 'Beauty & Care',
    brand: 'CeraVe',
    stock: 120,
    ratings: { avg: 4.8, count: 450 },
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80']
  },
  {
    name: 'Charlotte Tilbury Magic Cream Moisturizer',
    description: 'Hyaluronic acid and Rosehip oil infused cushion cream for glowing runway-ready skin.',
    price: 9000,
    discountPercent: 10,
    category: 'Beauty & Care',
    brand: 'Charlotte Tilbury',
    stock: 30,
    ratings: { avg: 4.7, count: 86 },
    images: ['https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80']
  }
];

// Add unique SKU code to every product item
const products = rawProducts.map((p, idx) => ({
  ...p,
  sku: `SKU-${p.category.toUpperCase().slice(0, 4)}-${100 + idx}`
}));

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB database');

  try {
    await Product.collection.dropIndexes();
    console.log('Cleared old indexes');
  } catch (err) {
    console.log('No old indexes to drop');
  }

  await Product.deleteMany({});
  const inserted = await Product.insertMany(products);
  console.log(`✅ SUCCESS! Seeded ${inserted.length} products across all categories into MongoDB!`);

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(console.error);
