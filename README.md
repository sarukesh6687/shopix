# Shopix - Online Shopping Platform

A full-stack MERN e-commerce application.

## Quick Start

### Backend
```bash
cd backend
npm install
node seed.js        # seeds 12 products + admin account
npm run dev         # runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start           # runs on http://localhost:3000
```

## Default Admin
| Email              | Password  |
|--------------------|-----------|
| admin@shopez.com   | admin123  |

New users can register and start shopping immediately.

## Features
- Browse & search products with category filters and sorting
- Product detail page with reviews and star ratings
- Shopping cart with quantity management
- Checkout with shipping address and payment method
- Order tracking with cancel option
- User profile with saved address
- Admin: add/edit/delete products, manage orders (update status), manage users

## Pages
| Route            | Description              |
|------------------|--------------------------|
| /                | Home with featured items |
| /products        | Product catalog          |
| /products/:id    | Product detail + reviews |
| /cart            | Shopping cart            |
| /checkout        | Place order              |
| /orders          | My orders                |
| /orders/:id      | Order detail             |
| /profile         | Edit profile             |
| /admin           | Admin dashboard          |
