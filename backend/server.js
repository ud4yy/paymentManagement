const express = require('express');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors'); // Import the CORS package

// Connect to the database
connectDb();

const app = express();

// Swagger setup for API documentation
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Adjust according to your route files location
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Enable CORS with specific configuration
const corsOptions = {
  origin: 'http://localhost:5173',  // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
  credentials: true,  // Enable sending cookies with cross-origin requests
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(errorHandler);

// Routes
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api', require('./routes/userRoutes'));

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
