# 🔐 Node.js Auth System with Admin Panel & Image Upload

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue)

## 📌 Features
- **User Roles**: Admin & User
- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based middleware
- **Image Handling**: Upload/Delete (Admin-only)
- **Security**: Bcrypt, rate limiting, helmet

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/abhishek-mourya-github/node-auth-admin-upload.git
cd node-auth-admin-upload
npm install

2. Configure Environment
Create .env file:
env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
PORT=3000

# For image uploads (optional):

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

3. Run Server
npm start  # Production
npm run dev  # Development (with nodemon)


📂 Project Structure
├── config/
│   ├── db.js          # Database connection
│   └── cloudinary.js  # Image storage config
├── controllers/
│   ├── auth.js        # Login/register logic
│   └── upload.js      # Image handling
├── middleware/
│   ├── auth.js        # JWT verification
│   └── roles.js       # Admin/user check
├── models/
│   ├── User.js        # User schema
│   └── Image.js       # Image schema
├── routes/
│   ├── auth.routes.js 
│   └── upload.routes.js
├── uploads/           # Local image storage
└── server.js          # Main entry point

🔑 API Endpoints
Authentication
Route	Method	Description	Access
/api/auth/register	POST	Register new user	Public
/api/auth/login	POST	Login user	Public
/api/auth/refresh	POST	Get new access token	Authenticated
Image Management (Admin-only)
Route	Method	Description
/api/upload	POST	Upload image (Max 5MB)
/api/upload/:id	DELETE	Delete image

🛡️ Security
Passwords hashed with bcrypt

Rate limiting (100 requests/15min)

JWT expiration (15min access, 7d refresh)

Admin routes protected by middleware

🌐 Deployment
Render
Create new Render app

Set config vars (same as .env)

Push to Heroku:

bash
Copy
git push heroku main

🤝 How to Contribute
Fork the repository

Create new branch (git checkout -b feature/your-feature)

Commit changes (git commit -m 'Add feature')

Push to branch (git push origin feature/your-feature)

Open Pull Request

📄 License
MIT [Abhishek Mourya](https://github.com/abhishek-mourya-github)

### Key Improvements:
1. **Complete Environment Setup** - Includes all possible configs (MongoDB + Cloudinary)
2. **Deployment Ready** - Heroku instructions included
3. **Visual Hierarchy** - Clear section separation with emojis
4. **Production-Grade** - Security and structure best practices