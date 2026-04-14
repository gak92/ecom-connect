# Ecom-Connect 🚀

**Ecom-Connect** is a full-featured, modern MERN (MongoDB, Express, React, Node.js) e-commerce platform designed for a seamless shopping experience. It features a sleek, responsive UI with robust state management and secure payment integration.

---

## ✨ Features

- **Product Management**: Browse products by category, search with filters, and view detailed product information.
- **User Authentication**: Secure registration and login with JWT and OTP verification.
- **Shopping Cart**: Advanced cart functionality with persistent storage.
- **Checkout Flow**: Streamlined 3-step checkout (Shipping → Confirm Order → Payment).
- **Payment Integration**: Secure payments powered by **Stripe**.
- **Admin Dashboard**: Comprehensive admin tools for managing products, orders, and users.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
- **Reviews & Ratings**: Customer reviews and star ratings for every product.

---

## 🛠️ Technology Stack

### Frontend
- **React 19**: Modern UI development.
- **Redux Toolkit**: Efficient state management.
- **Vite**: Ultra-fast build tool and dev server.
- **CSS3 (Vanilla)**: Custom, premium styling without heavy frameworks.
- **Material UI Icons**: Professional iconography.

### Backend
- **Node.js**: Scalable server-side runtime.
- **Express.js**: Lightweight web server framework.
- **MongoDB**: Flexible NoSQL database with Mongoose ODM.
- **JWT**: Secure authentication tokens.
- **Cloudinary**: Cloud storage for product images.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local installation
- Stripe Account (for payments)
- Cloudinary Account (for image hosting)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ecom-connect.git
   cd ecom-connect
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder and add your credentials:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   STRIPE_API_KEY=your_stripe_key
   STRIPE_SECRET_KEY=your_stripe_secret
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the application:**
   - In `backend` folder: `npm run dev`
   - In `frontend` folder: `npm run dev`

---

## 📸 Screenshots

### Admin Dashboard
![Admin Dashboard](./app%20images/Admin%20Dashboard.PNG)

### All Products (Admin)
![All Products Admin](./app%20images/All%20Products%20-%20Admin%20Dashboard.PNG)

### Create Products (Admin)
![Create Products Admin](./app%20images/Create%20Products%20-%20Admin%20Dashboard.PNG)

### All Reviews (Admin)
![All Reviews Admin](./app%20images/All%20Reviews%20-%20Admin%20Dashboard.PNG)

### All Products (Storefront)
![All Products](./app%20images/All%20Products.PNG)

### Product Detail Page
![Product Detail](./app%20images/Product%20Detail%20Page.PNG)

### Cart Page
![Cart Page](./app%20images/Cart%20Page.PNG)

### Checkout Page
![Checkout Page](./app%20images/Checkout%20Page.PNG)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
