### Social Media Backend
This project is a backend application for a social media platform.
It provides functionalities for user authentication, blog management, and password reset functionality.
The backend is built using Node.js, Express, MongoDB, Docker and other supporting libraries.

### Features
- User Authentication (Sign Up, Login)
- Blog Management (Create, Update, Delete, View Blogs)
- Password Reset Functionality
- JWT Authentication for protected routes
- API Documentation using Swagger
- Email notifications for password reset using MailDev (for development)

### Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt.js (for password hashing)
- JWT (JSON Web Token) for authentication
- Nodemailer (for sending emails)
- MailDev (for email testing during development)
- Swagger (for API documentation)
- Docker (for containerization)

### Getting Started

### Prerequisites
  - Docker
  - Docker Compose

### Docker Setup
   1. Ensure you have Docker and Docker Compose installed on your machine.
   2. Create a .env file in the root of the project and add the following environment variables:

      `MONGO_DB_URL=mongodb://db:27017/social_media`
      `JWT_SECRET=your_jwt_secret`

   3. Build and start the containers using Docker Compose:

      `docker-compose up --build`

   The server will start on `http://localhost:8000`.

### API Documentation

The API is documented using Swagger. Once the server is running, you can access the API documentation at `http://localhost:8000/api-docs`.

### Usage

## User Authentication
-  Sign Up: `POST /api/user/signup`
-  Login:   `POST /api/user/login`

## Blog Management
Note: All blog management endpoints require JWT authentication. Include the token in the Authorization header as `Bearer <token>`.

- Create Blog: `POST /api/blog/create`
- Update Blog: `PUT /api/blog/update/{id}`
- Delete Blog: `DELETE /api/blog/delete/{id}`
- Get Blog by ID: `GET /api/blog/{id}`

## Password Reset

- Forgot Password: `POST /api/user/forgotpassword`
- Reset Password: `POST /api/user/reset-password`

## Contact

For any inquiries, please contact `aladarahman18@gmail.com`
