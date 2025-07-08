# Akkshara Hotel - Backend Setup

## Prerequisites
- Node.js (v16 or higher)
- Cashfree account (for payment processing)

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
1. Copy the `.env` file and update with your Cashfree credentials:
```bash
# Get these from your Cashfree dashboard
CASHFREE_CLIENT_ID=your_actual_client_id
CASHFREE_CLIENT_SECRET=your_actual_client_secret
CASHFREE_ENVIRONMENT=SANDBOX  # Use PRODUCTION for live
```

### 3. Get Cashfree Credentials
1. Sign up at [Cashfree Dashboard](https://merchant.cashfree.com/)
2. Go to Settings > API Keys
3. Copy Client ID and Client Secret
4. Update the `.env` file

### 4. Start the Backend Server
```bash
npm run dev
```
The server will run on `http://localhost:5000`

### 5. Start the Frontend (in main directory)
```bash
npm start
```
The React app will run on `http://localhost:3000`

## API Endpoints

- `POST /api/create-order` - Creates a new payment order
- `POST /api/payment-webhook` - Handles payment status updates
- `GET /api/health` - Health check endpoint

## Testing
1. Make sure both backend and frontend are running
2. Go through the booking flow
3. When you click "Confirm Booking", it will open Cashfree's test payment gateway
4. Use test cards provided by Cashfree for testing

## Production Deployment
1. Set `CASHFREE_ENVIRONMENT=PRODUCTION` in backend `.env`
2. Set `mode: "production"` in frontend Cashfree SDK initialization
3. Update URLs to your production domains
