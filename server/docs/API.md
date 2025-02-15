# E-Learning Platform API Documentation

## Base URL
```
https://api.elearning.com/api/v1
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in requests:
- Access token in cookie: `access_token`
- Refresh token in cookie: `refresh_token`

## User Management

### Register User
```http
POST /registration
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### Activate User Account
```http
POST /activate-user
Content-Type: application/json

{
  "activation_token": "string",
  "activation_code": "string"
}
```

### Login
```http
POST /login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### Social Auth
```http
POST /social-auth
Content-Type: application/json

{
  "email": "string",
  "name": "string",
  "avatar": "string"
}
```

### Get User Info
```http
GET /me
Authorization: Required
```

### Update User Info
```http
PUT /update-user-info
Authorization: Required
Content-Type: application/json

{
  "name": "string"
}
```

### Update Password
```http
PUT /update-user-password
Authorization: Required
Content-Type: application/json

{
  "oldPassword": "string",
  "newPassword": "string"
}
```

## Course Management

### Create Course
```http
POST /create-course
Authorization: Required (Admin)
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "price": "number",
  "estimatedPrice": "number",
  "tags": "string",
  "level": "string",
  "demoUrl": "string",
  "thumbnail": "string",
  "benefits": [{"title": "string"}],
  "prerequisites": [{"title": "string"}],
  "courseData": [{
    "title": "string",
    "description": "string",
    "videoUrl": "string",
    "videoSection": "string",
    "videoLength": "number",
    "links": [{"title": "string", "url": "string"}]
  }]
}
```

### Get Course Details
```http
GET /get-course/:id
```

### Get All Courses
```http
GET /get-courses
```

### Update Course
```http
PUT /edit-course/:id
Authorization: Required (Admin)
```

### Delete Course
```http
DELETE /delete-course/:id
Authorization: Required (Admin)
```

## Super Admin Operations

### Get All Admins
```http
GET /get-admins
Authorization: Required (Super Admin)
```

### Update Admin Role
```http
PUT /update-admin-role
Authorization: Required (Super Admin)
Content-Type: application/json

{
  "email": "string",
  "role": "string"
}
```

### Delete Admin
```http
DELETE /delete-admin/:id
Authorization: Required (Super Admin)
```

## Analytics

### User Analytics
```http
GET /get-users-analytics
Authorization: Required (Admin)
```

### Course Analytics
```http
GET /get-courses-analytics
Authorization: Required (Admin)
```

### Order Analytics
```http
GET /get-orders-analytics
Authorization: Required (Admin)
```

## Orders and Payments

### Create Order
```http
POST /create-order
Authorization: Required
Content-Type: application/json

{
  "courseId": "string",
  "payment_info": {}
}
```

### Get All Orders
```http
GET /get-orders
Authorization: Required (Admin)
```

### Get Stripe Key
```http
GET /payment/stripepublishablekey
```

### Process Payment
```http
POST /payment
Authorization: Required
Content-Type: application/json

{
  "amount": "number"
}
```

## Response Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

The API implements rate limiting of 100 requests per 15 minutes per IP address.

## Environment Variables Required

```env
PORT=8000
ORIGIN=["http://localhost:3000"]
NODE_ENV=development
DB_URL=mongodb://localhost:27017/lms
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key  
CLOUD_SECRET_KEY=your_cloudinary_secret
REDIS_URL=redis://localhost:6379
ACTIVATION_SECRET=your_activation_secret
ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret
ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN_EXPIRE=3
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465 
SMTP_SERVICE=gmail
SMTP_MAIL=your_smtp_email
SMTP_PASSWORD=your_smtp_password
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
