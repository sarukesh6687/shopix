# Retail Individual ShopEZ

Retail Individual ShopEZ is your one-stop destination for effortless online shopping. Designed and implemented with clean MERN Stack architecture (MongoDB, Express, React, Node.js) and modern Glassmorphism UI visual design aesthetics.

---

## DEMO AND GITHUB REPOSITORY LINKS

> [!IMPORTANT]
> 📁 **Project Documentation (Google Drive):** https://drive.google.com/drive/folders/1uJpqWGgphVuCg45ArVcMNFsByrO0JkHT?usp=sharing  
> 🌐 **Live Vercel Link:** https://shopix.vercel.app  
> 📦 **GitHub Repository:** https://github.com/sarukesh6687/shopix.git  
> 🔑 **Pre-configured Admin Account:**
> - **Account Email:** `admin@shopez.com`
> - **Password:** `admin123`

---

## PROBLEM STATEMENT

Traditional e-commerce platforms often suffer from complex user onboarding, sluggish cart management, lack of direct purchasing options, and fragmented administrative tools. Small-to-medium retail businesses need an integrated, full-stack platform that offers:

- **Seamless Shopping Experience:** Instant product discovery, real-time category filtering, direct checkout flows ("Shop Now"), and order tracking.
- **Decoupled Architecture:** High-performance RESTful backend API with secure JWT authentication and scalable MongoDB data modeling.
- **Unified Admin Portal:** Centralized dashboard to manage product inventory, monitor customer orders, update delivery statuses, and analyze platform sales metrics.
- **Modern Aesthetic & UI:** A responsive, visually engaging Glassmorphism interface for superior user experience across desktop and mobile devices.

---

## 1. PROJECT ARCHITECTURE

### TECHNICAL ARCHITECTURE

The application follows a decoupled client-server architecture:

```
+-----------------------------------------------------------------------+
|                            FRONTEND LAYER                             |
| - React 18 (Vite / React Scripts)                                     |
| - Glassmorphism Design Tokens & Vanilla CSS System                    |
| - Context API (AuthContext, CartContext)                              |
| - React Router DOM Navigation                                         |
| - Pages: Home, Catalog, Product Detail, Cart/Checkout, Profile, Admin |
+-----------------------------------------------------------------------+
                                   |
                                   | REST API (HTTP / JSON / JWT)
                                   v
+-----------------------------------------------------------------------+
|                            BACKEND LAYER                              |
| - Node.js & Express.js REST API Server                                |
| - JWT Authentication & Bcrypt Hashing Middleware                      |
| - Controllers: AuthController, ProductController, CartController, etc |
+-----------------------------------------------------------------------+
                                   |
                                   | Mongoose ORM
                                   v
+-----------------------------------------------------------------------+
|                            DATABASE LAYER                             |
| - MongoDB (Users, Products, Cart, Orders, Reviews)                    |
+-----------------------------------------------------------------------+
```

### ER DIAGRAM

```
  +------------------+             +--------------------+
  |       USER       |             |      PRODUCT       |
  +------------------+             +--------------------+
  | _id (PK)         |             | _id (PK)           |
  | name             |             | name               |
  | email            |             | description        |
  | password         |             | price              |
  | role             |             | discountPercent    |
  | address          |             | category           |
  +--------+---------+             | brand              |
           |                       | stock              |
           | 1                     | images             |
           |                       | ratings            |
           v 1:1                   +---------+----------+
  +------------------+                       |
  |       CART       |                       | 1:N
  +------------------+                       v
  | _id (PK)         |             +--------------------+
  | user (FK)        |             |       ORDER        |
  | items [product,  |             +--------------------+
  |        quantity] |             | _id (PK)           |
  +------------------+             | user (FK)          |
                                   | items [product,    |
                                   |        name, price,|
                                   |        quantity]   |
                                   | shippingAddress    |
                                   | totalAmount        |
                                   | status             |
                                   | paymentMethod      |
                                   +--------------------+
```

### FEATURES

1. **Comprehensive Product Catalog:** Extensive listing of products across categories (Electronics, Footwear, Clothing, Home & Kitchen, Books, Sports) with real-time category filtering, search keyword matching, gender/brand tags, and price sorting.
2. **Shop Now Button (Direct Checkout Flow):** Each product listing features a prominent "Shop Now" button that immediately adds the item to the order queue and opens the checkout screen.
3. **Cart & Order Details Form:** Review items, adjust quantities, select clothing sizes, enter recipient shipping address, pincode, and pick preferred payment method (COD, Card, UPI).
4. **User Profile & Tracking:** User profile page showing saved shipping information alongside live status updates on placed orders ("Pending", "Processing", "Shipped", "Delivered", "Cancelled").
5. **Unified Admin Console (`admin@shopez.com` / `admin123`):**
   - Total sales metrics & revenue tracking.
   - Product Management: Add new store items, edit existing price/stock, and delete listings.
   - Order Management: Monitor customer orders and update shipping status.
   - User Management: Access registered customer accounts and role access.

- **Customer (User):** Browse catalog, filter items, add to cart, trigger direct "Shop Now", manage shipping details, place orders, and track order history.
- **Admin:** Log in using `admin@shopez.com` / `admin123`, access the Admin Portal, create new store inventory items, monitor platform sales, manage registered accounts, and update order statuses.

### USER FLOW

```
[ Visitor / Customer ]
         |
         v
[ Browse Home / Product Catalog ]
         |
         +---> Click "Product Details" ---> Select Size & Qty ---> Click "Add to Cart"
         |
         +---> Click "Shop Now" Button ---------------------------------------+
                                                                              |
                                                                              v
                                                                    [ Shopping Cart / Checkout ]
                                                                              |
                                                                              v
                                                                     [ Place Order (COD/UPI/Card) ]
                                                                              |
                                                                              v
                                                                     [ Track Order Status ]
```

### MVC PATTERN EXPLANATION

- **Model Layer (`backend/models/`):** Mongoose models defining schemas for `User.js`, `Product.js`, `Cart.js`, `Order.js`, and `Review.js`.
- **View Layer (`frontend/src/`):** Dynamic React components rendered with glassmorphism CSS backdrop filters, responsive grid structures, and interactive states.
- **Controller Layer (`backend/routes/`):** Business logic processing requests, performing database CRUD operations, and returning structured JSON API payloads.

---

## 2. PROJECT DOCUMENTATION

> 📁 **Project Documentation Drive Folder:** https://drive.google.com/drive/folders/1uJpqWGgphVuCg45ArVcMNFsByrO0JkHT?usp=sharing

### System Architecture Overview

The system utilizes a decoupled full-stack JavaScript architecture:
- **Frontend (Client):** Single Page Application built with React 18 and state management via Context API.
- **Backend (Server):** Node.js and Express.js REST API providing stateless communication through JWT authentication tokens.
- **Database:** MongoDB instance managing collections with Mongoose ORM models.

### API Endpoints Reference

| Endpoint | Method | Description | Auth Required | Access |
|---|---|---|---|---|
| `/api/auth/register` | POST | Register new user | No | Public |
| `/api/auth/login` | POST | Authenticate user & issue JWT | No | Public |
| `/api/auth/me` | GET | Fetch authenticated user profile | Yes | User/Admin |
| `/api/products` | GET | Fetch all products with filter & pagination | No | Public |
| `/api/products/:id` | GET | Get product details by ID | No | Public |
| `/api/cart` | GET | Get current user cart | Yes | User/Admin |
| `/api/cart` | POST | Add or update product in cart | Yes | User/Admin |
| `/api/orders` | POST | Place new order | Yes | User/Admin |
| `/api/orders/myorders` | GET | Fetch orders placed by logged-in user | Yes | User/Admin |
| `/api/reviews/:productId` | POST | Submit product review & rating | Yes | User/Admin |
| `/api/admin/products` | POST/PUT/DELETE | Manage inventory items | Yes | Admin Only |
| `/api/admin/orders` | GET/PUT | View all orders and update delivery status | Yes | Admin Only |
| `/api/admin/users` | GET | List registered users | Yes | Admin Only |

### Data Schemas & Models

- **User Model:** Stores credentials, encrypted password hash (bcrypt), assigned role (`USER` / `ADMIN`), and default shipping address.
- **Product Model:** Stores product title, category, price, discount percentage, stock level, ratings, and image URLs.
- **Cart Model:** Links user ID to an array of product references with quantities.
- **Order Model:** Captures purchase snapshots (items, prices, quantities, total amount, shipping address, payment method, and live order status).
- **Review Model:** Tracks star ratings (1-5) and user comments per product.

---

## 3. PROJECT SETUP AND CONFIGURATION

### Folder Structure

```
E-commerce application/
├── frontend/        # React Frontend
├── backend/         # Node.js + Express Backend REST API
└── README.md
```

### Installation Steps

1. **Server Setup:**
```bash
cd backend
npm install
```

2. **Client Setup:**
```bash
cd frontend
npm install
```

---

## 4. BACKEND DEVELOPMENT

### Backend Server Configuration (`backend/server.js`)

- Express app mounting routes: `/api/auth`, `/api/products`, `/api/cart`, `/api/orders`, `/api/reviews`, `/api/admin`.
- Middleware: CORS enabled, JSON parsing, JWT validation.

### Database Seeding:

Populates default admin account (`admin@shopez.com` / `admin123`) and sample product inventory:

```bash
cd backend
node seed.js
```

---

## 5. DATABASE DEVELOPMENT (MongoDB)

- **MongoDB URI:** `mongodb://localhost:27017/shopez`
- **Database connector:** `backend/server.js` using Mongoose ORM.

---

## 6. FRONTEND DEVELOPMENT

Built with **React 18**, **Vite / React Scripts**, **Lucide Icons**, and **Vanilla CSS** styled with **Glassmorphism Design System** (`glass-panel`, `glass-card`, `glass-nav`, backdrop blurs, glow borders, and responsive flex/grid layouts).

---

## 7. PROJECT EXECUTION

### Step 1: Start Backend API Server

```bash
cd backend
node seed.js
npm run dev
# Running on http://localhost:5002
```

### Step 2: Start Frontend React Server

```bash
cd frontend
npm start
# Running on http://localhost:3000
```

---

## DEMO & EVALUATION LINKS SUMMARY

- **Project Documentation (Google Drive):** https://drive.google.com/drive/folders/1uJpqWGgphVuCg45ArVcMNFsByrO0JkHT?usp=sharing
- **Live Vercel Link:** https://shopix.vercel.app
- **GitHub Repository:** https://github.com/sarukesh6687/shopix.git
- **Admin Email:** `admin@shopez.com`
- **Admin Password:** `admin123`
