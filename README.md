
# Payment Management API

This is a comprehensive backend API for managing payment transactions, built with a robust tech stack and featuring structured authentication, efficient request handling, and scalability through design patterns.
 This project allows secure user registration, login, and payment operations, all while adhering to high coding standards and leveraging modern design patterns.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API Documentation**: Swagger (available at [Swagger UI](https://paymentmanagement-j9mk.onrender.com/api-docs/))
- **Authentication**: JSON Web Tokens (JWT) 
- **Hosting**: Render
- **API Testing**: Postman
- **Source Control**: GitHub

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Payment Management**: Users can create and view payments.
- **API Documentation**: Interact with APIs directly from [Swagger UI](https://paymentmanagement-j9mk.onrender.com/api-docs/).
- **Error Handling**: Custom error handling middleware for managing exceptions.
- **Design Patterns**: Code follows modern design principles including Factory, Singleton, and Dependency Injection patterns.

## Key Design Patterns

1. **Factory Pattern**: Used to create instances of services and controllers, enhancing scalability and maintainability.
2. **Singleton Pattern**: Ensures single instances of db connetion.
3. **Dependency Injection**: Injects dependencies (services) into controllers, promoting modularity.
4. **Middleware**: Used for handling JWT validation, error handling.

## REST API Endpoints

All API endpoints can be interacted with using the [Swagger UI](https://paymentmanagement-j9mk.onrender.com/api-docs/).

### Authentication APIs

1. **Register** - Register a new user  
   **POST**: [`/api/register`](https://paymentmanagement-j9mk.onrender.com/api/register)  
   **Payload**: `{ "email": "string", "fullname": "string", "username": "string", "password": "string" }`

2. **Login** - User login  
   **POST**: [`/api/login`](https://paymentmanagement-j9mk.onrender.com/api/login)  
   **Payload**: `{ "username": "string", "password": "string" }`

3. **Current User** - Get current user information  
   **GET**: [`/api/current`](https://paymentmanagement-j9mk.onrender.com/api/current)  
   **Description**: Protected route that requires an access token from the user cookie.

4. **Refresh Token** - Refresh access token  
   **POST**: [`/api/refresh-token`](https://paymentmanagement-j9mk.onrender.com/api/refresh-token)

### Payment APIs

1. **Create Payment** - Create a new payment  
   **POST**: [`/api/payment`](https://paymentmanagement-j9mk.onrender.com/api/payment)  
   **Description**: Protected route; identifies the user by access token.

2. **Get All Payments** - Fetch all payments within a date range (optional)  
   **GET**: [`/api/payment?from=2024-11-01&to=2024-11-02`](https://paymentmanagement-j9mk.onrender.com/api/payment?from=2024-11-01&to=2024-11-02)  
   **Description**: Protected route; retrieves payments based on optional `from` and `to` query parameters.

3. **Get Payment by ID** - Fetch a specific payment by ID  
   **GET**: [`/api/payment/{id}`](https://paymentmanagement-j9mk.onrender.com/api/payment/{id})  
   **Description**: Protected route; retrieves a payment based on its unique ID.

## Project Structure

```
backend/
├── controllers/        # Controllers handle request/response logic
├── services/           # Services contain business logic, interact with models
├── middleware/         # Middleware for error handling, authentication
├── models/             # Mongoose models for MongoDB
├── routes/             # Route definitions, use dependency injection
└── config/             # Configuration files for database, environment variables
```

## Demo Steps

You can access the API documentation at [Swagger UI](https://paymentmanagement-j9mk.onrender.com/api-docs/).
### Demo Image
<img src="https://drive.google.com/uc?id=19tmPDuyKFS1BuSXXptQD3AQl09AA1w7t" alt="Demo Diagram" />
1. **Register a User**  
   Go to the Swagger UI, navigate to the `POST /api/register` endpoint, and enter the required user details.

2. **Log in**  
   Use the `POST /api/login` endpoint to get an access token.

3. **Get Current User Information**  
   Access the `GET /api/current` endpoint with the access token from cookies.

4. **Create a Payment**  
   Use the `POST /api/payment` endpoint to create a new payment.

5. **Get Payments**  
   Use the `GET /api/payment` endpoint with optional `from` and `to` query parameters to fetch payments in a specific range.

6. **Get Payment by ID**  
   Access a specific payment with the `GET /api/payment/{id}` endpoint.



