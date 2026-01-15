# Blogify Backend

Backend for Blogify project with REST APIs for **Blogs**, **Auth**, **Dashboard**, **Notifications**.

## Table of Contents
- [Requirements](#requirements)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Run Server](#run-server)
- [API Endpoints](#api-endpoints)
- [Postman Collection](#postman-collection)

---

## Requirements

- Node.js v18+
- MongoDB
- Cloudinary account (for image uploads)
- OpenRouter API key (if using GPT-OSS)

---

## Setup

1. Clone the repository:
```bash
git clone https://github.com/username/blogify-backend.git
cd blogify-backend


## Install dependencies:
npm install

## Copy .env.example to .env and fill in your credentials:
cp .env.example .env

Make sure MongoDB is running locally or use a cloud MongoDB URI.


## Your .env file should include:
PORT=5000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OPENROUTER_API_KEY_GPTOSS=your_openrouter_key


## Run Server
Development mode (with auto-reload using ts-node-dev):
npm run dev

Production mode:
npm run build
npm start

Server will run at http://localhost:5000 (or your configured PORT).


## API Endpoints
Auth
POST /api/auth/register - Register new user
POST /api/auth/login - Login and get JWT token

Blogs
GET /api/blogs/ - Get all blogs
GET /api/blogs/:slug - Get blog by slug
POST /api/blogs/ - Create new blog (admin)
PATCH /api/blogs/:id - Update blog (admin)
DELETE /api/blogs/:id - Delete blog (admin)

Dashboard (Admin)
GET /api/dashboard/stats - Get platform statistics
GET /api/dashboard/activity - Get recent activity logs
GET /api/dashboard/blogs - Get all blogs for admin

Notifications
GET /api/notifications - Get all notifications for logged-in user
PATCH /api/notifications/:id/read - Mark notification as read/unread
DELETE /api/notifications/:id - Delete a notification


Postman Collection
Import the provided Blogify.postman_collection.json file in Postman.
Import the provided Blogify.postman_environment.json file for environment variables.
Set the TOKEN variable after login to authorize requests.

---



## **2️⃣ Postman Environment JSON**

```json
{
  "id": "blogify-env",
  "name": "Blogify Environment",
  "values": [
    {
      "key": "BASE_URL",
      "value": "http://localhost:5000/api",
      "enabled": true
    },
    {
      "key": "TOKEN",
      "value": "",
      "enabled": true
    },
    {
      "key": "ADMIN_EMAIL",
      "value": "admin@example.com",
      "enabled": true
    },
    {
      "key": "ADMIN_PASSWORD",
      "value": "admin123",
      "enabled": true
    },
    {
      "key": "USER_EMAIL",
      "value": "user@example.com",
      "enabled": true
    },
    {
      "key": "USER_PASSWORD",
      "value": "user123",
      "enabled": true
    }
  ],
  "_postman_variable_scope": "environment",
  "_postman_exported_at": "2026-01-15T14:00:00.000Z",
  "_postman_exported_using": "Postman/10.15.0"
}
✅