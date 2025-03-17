# Green Thumb - Plant E-commerce Application

Green Thumb is a full-stack plant e-commerce application that provides a seamless shopping experience for plant lovers. This app supports role-based access, secure authentication, and an intuitive UI for both users and admins.

## Features

### User Features:
- **Browse Plants**: View available plants with details and images.
- **Add to Cart**: Easily add plants to the shopping cart.
- **Checkout**: Users can store up to **three addresses** and select one at checkout.
- **Secure Payments**: Integrated **Sandbox PayPal** for transactions.
- **Real-time Notifications**: Uses **Toast component** for instant feedback.
- **Responsive UI**: Fully optimized for all devices.

### Admin Features:
- **Product Management**: Create, update, and delete products.
- **Order Management**: Track, update, and manage orders efficiently.
- **Role-Based Access**: Uses **JWT tokens** for secure authentication.

## Tech Stack

### Frontend:
- **React.js**: Component-based UI development.
- **Tailwind CSS**: Utility-first styling.
- **Shadcn UI**: Prebuilt and customizable components.
- **React Redux**: State management.

### Backend:
- **Node.js & Express.js**: Server-side logic and API routes.
- **MongoDB**: NoSQL database for storing user and product data.
- **JWT Authentication**: Secure authentication and role-based access control.

## Installation & Setup

### Prerequisites:
- Node.js installed
- MongoDB setup (cloud-based)
- PayPal Developer Account for sandbox testing

### Steps to Run Locally:

#### 1. Clone the Repository:
```sh
git clone https://github.com/your-username/green-thumb.git
cd green-thumb
```

#### 2. Install Dependencies:
```sh
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

#### 3. Set Up Environment Variables:
Create a `.env` file in the `server` directory and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
```

#### 4. Run the Application:
```sh
# Start backend
cd server
npm start

# Start frontend
cd client
npm start
```

The app will be available at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|------------|-----------------------------|
| POST | `/api/auth/login` | User login with JWT authentication |
| POST | `/api/auth/register` | User registration |
| GET | `/api/products` | Fetch all products |
| POST | `/api/admin/products` | Add a new product (Admin only) |
| PUT | `/api/admin/orders/:id` | Update order status (Admin only) |

## Folder Structure
```
Green-Thumb/
│── client/         # React Frontend
│── server/         # Express Backend
│── models/         # MongoDB Schemas
│── routes/         # API Endpoints
│── controllers/    # Business Logic
│── middleware/     # Authentication & Security
│── .env.example    # Example Environment Variables
│── README.md       # Documentation
```

## Future Enhancements
- **Deploy to Production** (e.g., Vercel & Render)
- **Add More Payment Options** (Stripe, Razorpay, etc.)
- **Wishlist Feature** for Users
- **Admin Dashboard Analytics**
- **More Enhanced shopping cart UI**

## Contribution
Feel free to open an issue or submit a pull request to contribute.

## License
This project is licensed under the MIT License.

---


