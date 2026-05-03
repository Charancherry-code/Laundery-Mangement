# Laundry Order Management System

A complete, minimal, production-like Laundry Order Management System built with Node.js, Express, MongoDB, and React...

## Features

- **Order Creation**: Create orders with customer details and multiple garment items
- **Order Status Management**: Update order status (RECEIVED, PROCESSING, READY, DELIVERED)
- **Order Filtering**: Filter orders by status, customer name, or phone number
- **Dashboard**: View total orders, revenue, and status counts with animated icons
- **Automatic Calculations**: Total amount calculated automatically based on garments
- **Unique Order IDs**: UUID-based order identification
- **Estimated Delivery Dates**: Optional delivery date tracking
- **Modern UI**: Beautiful gradient design with smooth animations and transitions
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Loading States**: Visual feedback during data fetching
- **Empty States**: Friendly empty state messages when no data is available

## Tech Stack

### Backend
- Node.js + Express
- MongoDB with Mongoose
- UUID for order IDs
- dotenv for configuration
- CORS enabled

### Frontend
- React 18
- Basic CSS (no UI libraries)
- Fetch API for HTTP requests

## Project Structure

```
laundry-management/
├── backend/
│   ├── config/
│   ├── controllers/
│   │   └── orderController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Order.js
│   ├── routes/
│   │   └── orderRoutes.js
│   ├── utils/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── OrderForm.js
│   │   │   └── OrdersList.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   └── package.json
├── POSTMAN_COLLECTION.md
├── AI_USAGE_REPORT.md
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally OR MongoDB Atlas cloud account)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:

**Option A: Local MongoDB**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/laundry-management
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas and create a free account
2. Create a new cluster (free tier)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your Atlas credentials
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/laundry-management?retryWrites=true&w=majority
```

5. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders (with optional filters)
- `GET /api/orders/:id` - Get a specific order by ID
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete an order

### Dashboard

- `GET /api/orders/dashboard` - Get dashboard statistics

### Query Parameters for GET /api/orders

- `status` - Filter by status (RECEIVED, PROCESSING, READY, DELIVERED)
- `customerName` - Filter by customer name (case-insensitive search)
- `phone` - Filter by phone number

## Sample Order Data

```json
{
  "customerName": "John Doe",
  "phone": "1234567890",
  "garments": [
    {
      "type": "Shirt",
      "quantity": 5,
      "price": 2.50
    },
    {
      "type": "Pants",
      "quantity": 3,
      "price": 3.00
    }
  ],
  "estimatedDeliveryDate": "2024-05-01"
}
```

## Frontend Usage

1. **Dashboard**: View total orders, revenue, and status counts
2. **Orders**: View all orders with filtering and status update capabilities
3. **New Order**: Create new orders with dynamic garment items

## Error Handling

- Input validation for all required fields
- Phone number validation (10 digits)
- Positive quantity and non-negative price validation
- Proper error messages for invalid operations
- Global error handling middleware

## Development Notes

- The system uses async/await throughout for asynchronous operations
- Code is modular but simple - no over-engineering
- Comments are added where necessary for clarity
- CORS is enabled for cross-origin requests
- Timestamps are automatically added to all orders (createdAt, updatedAt)

## Future Improvements

With more time, the following could be added:
- User authentication and authorization
- Advanced search by garment type
- Email notifications for status changes
- PDF invoice generation
- Customer history tracking
- Payment integration
- Mobile-responsive design improvements
- Unit tests and integration tests
