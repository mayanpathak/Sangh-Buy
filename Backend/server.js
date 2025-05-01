const express = require('express');
const cors = require('cors');
const newsRouter = require('./routes/news');

const app = express();

// Detailed CORS configuration for development environment
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173','https://sangh-buy.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Add a simple health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// News routes
app.use('/api/news', newsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Server error',
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/news/business`);
    console.log(`Health check at http://localhost:${PORT}/health`);
}); 