# 🧠 Blogify Pro – Backend

**Blogify Pro Backend** is a professional, production-ready backend built with **Node.js, Express.js, and MongoDB (MERN Stack)**. It provides all APIs, authentication, role-based access, dashboard stats, notifications, AI integrations, and blog management for the Blogify Pro platform.

---

## 📚 Table of Contents

1. [Project Vision](#-project-vision)
2. [Tech Stack](#-tech-stack)
3. [User Roles](#-user-roles)
4. [API Overview](#-api-overview)

   1. [Authentication APIs](#-authentication-apis)
   2. [User APIs](#-user-apis)
   3. [Blog APIs](#-blog-apis)
   4. [Notification APIs](#-notification-apis)
   5. [AI APIs](#-ai-apis)
   6. [Dashboard APIs](#-dashboard-apis)
   7. [Utility APIs](#-utility-apis)
5. [Data Modeling (MongoDB)](#-data-modeling-mongodb)

   1. [User Schema](#-user-schema)
   2. [Blog Schema](#-blog-schema)
   3. [Notification Schema](#-notification-schema)
   4. [AI Usage Schema](#-ai-usage-schema)
6. [Backend Architecture](#-backend-architecture)

   1. [Folder Structure](#-folder-structure)
   2. [Layer Responsibilities](#-layer-responsibilities)
7. [Setup & Run](#-setup--run)
8. [Postman Collection](#-postman-collection)
9. [Environment Variables](#-environment-variables)
10. [License](#-license)

---

## 🚀 Project Vision

Blogify Pro Backend provides:

* **RESTful APIs** for blogs, notifications, users, AI, and dashboards.
* **Authentication & Authorization** (JWT, role-based access).
* **Admin dashboard data** for analytics and activity logs.
* **Real-time notifications** for users.
* **AI-powered content generation & SEO optimization**.

Designed for **scalability**, **clean architecture**, and **production-readiness**.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT
* **AI Integration:** OpenAI API
* **Testing & Dev Tools:** Postman, Nodemon
* **Deployment:** Docker, Render/Vercel

---

## 👥 User Roles

### 🔑 Admin

* Full access to dashboard
* Manage blogs (create, edit, delete, publish)
* AI content generation
* View stats and activity logs
* Manage notifications

### 👤 User

* Register & login
* View published blogs
* Receive notifications
* Manage profile

---

## 🔌 API Overview

### 🔐 Authentication APIs

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| POST   | `/auth/register`        | Register new user          |
| POST   | `/auth/login`           | Login (Admin/User)         |
| POST   | `/auth/logout`          | Logout user                |
| GET    | `/auth/me`              | Get logged-in user profile |
| PATCH  | `/auth/change-password` | Change password            |

---

### 👤 User APIs

| Method | Endpoint                        | Description               |
| ------ | ------------------------------- | ------------------------- |
| GET    | `/users/profile`                | Get user profile          |
| PATCH  | `/users/profile`                | Update user profile       |
| DELETE | `/users/profile`                | Delete user account       |
| GET    | `/users/notifications`          | Get user notifications    |
| PATCH  | `/users/notifications/:id/read` | Mark notification as read |
| DELETE | `/users/notifications/:id`      | Delete notification       |

---

### 📝 Blog APIs

| Method | Endpoint               | Description                |
| ------ | ---------------------- | -------------------------- |
| POST   | `/blogs`               | Create blog (Admin)        |
| GET    | `/blogs`               | Get all published blogs    |
| GET    | `/blogs/:slug`         | Get blog by slug           |
| PATCH  | `/blogs/:id`           | Update blog (Admin)        |
| DELETE | `/blogs/:id`           | Delete blog (Admin)        |
| PATCH  | `/blogs/:id/publish`   | Publish blog (Admin)       |
| PATCH  | `/blogs/:id/unpublish` | Move blog to draft (Admin) |
| POST   | `/blogs/:id/save`      | Save blog (User)           |
| DELETE | `/blogs/:id/save`      | Unsave blog (User)         |

---

### 🔔 Notification APIs

| Method | Endpoint                  | Description                    |
| ------ | ------------------------- | ------------------------------ |
| POST   | `/notifications`          | Create notification (internal) |
| GET    | `/notifications`          | Get notifications for user     |
| PATCH  | `/notifications/:id/read` | Mark notification as read      |
| DELETE | `/notifications/:id`      | Delete notification            |

---

### 🤖 AI APIs

| Method | Endpoint               | Description                |
| ------ | ---------------------- | -------------------------- |
| POST   | `/ai/generate-blog`    | Generate full blog content |
| POST   | `/ai/generate-outline` | Generate blog outline      |
| POST   | `/ai/rewrite`          | Rewrite content            |
| POST   | `/ai/improve`          | Improve content tone       |
| POST   | `/ai/seo`              | Generate SEO metadata      |

---

### 📊 Dashboard APIs

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/dashboard/stats`    | Platform statistics  |
| GET    | `/dashboard/blogs`    | Admin blogs list     |
| GET    | `/dashboard/activity` | Recent activity logs |

---

### 🧩 Utility APIs

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| POST   | `/upload/image`     | Upload images |
| DELETE | `/upload/image/:id` | Delete image  |

---

## 🗃️ Data Modeling (MongoDB)

### 👤 User Schema

```ts
{
  name: string,
  email: string,
  password: string,
  role: "admin" | "user",
  notificationsEnabled: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 📝 Blog Schema

```ts
{
  title: string,
  slug: string,
  content: string,
  excerpt?: string,
  author: ObjectId(User),
  status: "draft" | "published" | "scheduled" | "archived",
  likes: ObjectId[],
  comments: [{ user: ObjectId, text: string, createdAt: Date }],
  shares: [{ user?: ObjectId, platform: string, createdAt: Date }],
  seo: { metaTitle?: string, metaDescription?: string, keywords?: string[] },
  views: number,
  readingTime: number,
  publishedAt?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 🔔 Notification Schema

```ts
{
  user: ObjectId(User),
  blog?: ObjectId(Blog),
  title: string,
  message: string,
  type: "like" | "share" | "comment" | "register" | "new_blog",
  isRead: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 🤖 AI Usage Schema

```ts
{
  admin: ObjectId(User),
  actionType: "generate" | "rewrite" | "seo",
  tokensUsed: number,
  createdAt: Date
}
```

---

## 🏗️ Backend Architecture

### Folder Structure

```
backend/
│
├── src/
│   ├── config/
│   ├── modules/
│   ├── middlewares/
│   ├── utils/
│   ├── types/
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── .env
```

### Layer Responsibilities

* **Routes:** define endpoints, attach middleware, no business logic
* **Controllers:** handle requests/responses, call services, return standardized response
* **Services:** business logic, DB operations, reusable logic, AI integration
* **Models:** MongoDB schemas, data validation

---

## ⚡ Setup & Run

```bash
# Install dependencies
npm install

# Run server locally
npm run dev

# Build & run production
npm run build
npm start
```

---

## 📂 Postman Collection

* Export **Postman Collection**: `BlogifyProBackend.postman_collection.json`
* Export **Postman Environment**: `BlogifyProBackend.postman_environment.json`
* Include variables: `BASE_URL`, `JWT token`

---

## 🔑 Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 📄 License

MIT License © 2026 Blogify Pro
