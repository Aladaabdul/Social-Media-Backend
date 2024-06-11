### Social Media Backend
This project is a backend application for a social media platform.
It provides functionalities for user authentication, blog management, and password reset functionality.
The backend is built using Node.js, Express, MongoDB, and other supporting libraries.

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

### Getting Started

### Prerequisites
  - Node.js (v14 or later)
  - MongoDB
  - MailDev (for email testing)

### Installation
  1. Clone the repository:
     
     ```bash 
     git clone https://github.com/yourusername/social-media-backend.git
     ```
  2. Navigate to the project directory:

     ```bash
     cd social-media-backend
     ```
  3. Install dependencies:

     ```bash
     npm install
     ```
  4. Create a .env file in the root of the project and add the following environment variables:

     ```bash
     MONGO_DB_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
  5. Start MailDev:

     ```bash
     npx maildev
     ```
  6. Run the application:

     ```bash
     npm start
     ```
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
