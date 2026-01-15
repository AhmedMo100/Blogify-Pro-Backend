🧠 Blogify Pro – Backend
Blogify Pro Backend is a professional, production-ready backend built with Node.js, Express.js, and MongoDB (MERN Stack). It provides all APIs, authentication, role-based access, dashboard stats, notifications, AI integrations, and blog management for the Blogify Pro platform.
📚 Table of Contents
Project Vision
Tech Stack
User Roles
API Overview
Authentication
User
Blogs
Notifications
AI
Dashboard
Utilities
Data Modeling
User Schema
Blog Schema
Notification Schema
AI Usage Schema
Backend Architecture
Folder Structure
Layer Responsibilities
Setup & Run
Postman Collection
Environment Variables
License
🚀 Project Vision
Blogify Pro Backend provides:
RESTful APIs for blogs, notifications, users, AI, and dashboards
Authentication & Authorization (JWT, role-based access)
Admin dashboard data for analytics and activity logs
Real-time notifications for users
AI-powered content generation & SEO optimization
It is built with scalability, clean architecture, and production-readiness in mind.
🛠️ Tech Stack
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT
AI Integration: OpenAI API
Testing & Dev Tools: Postman, Nodemon
Deployment: Docker, Render/Vercel
👥 User Roles
🔑 Admin
Full access to dashboard
Manage blogs (create, edit, delete, publish)
AI content generation
View stats and activity logs
Manage notifications
👤 User
Register & login
View published blogs
Receive notifications
Manage profile
🔌 API Overview
🔐 Authentication APIs
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login (Admin/User)
POST	/auth/logout	Logout user
GET	/auth/me	Get logged-in user profile
PATCH	/auth/change-password	Change password
👤 User APIs
Method	Endpoint	Description
GET	/users/profile	Get user profile
PATCH	/users/profile	Update user profile
DELETE	/users/profile	Delete user account
GET	/users/notifications	Get user notifications
PATCH	/users/notifications/:id/read	Mark notification as read
DELETE	/users/notifications/:id	Delete notification
📝 Blog APIs
Method	Endpoint	Description
POST	/blogs	Create blog (Admin)
GET	/blogs	Get all published blogs
GET	/blogs/:slug	Get blog by slug
PATCH	/blogs/:id	Update blog (Admin)
DELETE	/blogs/:id	Delete blog (Admin)
PATCH	/blogs/:id/publish	Publish blog (Admin)
PATCH	/blogs/:id/unpublish	Move blog to draft (Admin)
POST	/blogs/:id/save	Save blog (User)
DELETE	/blogs/:id/save	Unsave blog (User)
🔔 Notification APIs
Method	Endpoint	Description
POST	/notifications	Create notification (internal)
GET	/notifications	Get notifications for user
PATCH	/notifications/:id/read	Mark notification as read
DELETE	/notifications/:id	Delete notification
🤖 AI APIs
Method	Endpoint	Description
POST	/ai/generate-blog	Generate full blog content
POST	/ai/generate-outline	Generate blog outline
POST	/ai/rewrite	Rewrite content
POST	/ai/improve	Improve content tone
POST	/ai/seo	Generate SEO metadata
📊 Dashboard APIs
Method	Endpoint	Description
GET	/dashboard/stats	Platform statistics
GET	/dashboard/blogs	Admin blogs list
GET	/dashboard/activity	Recent activity logs
🧩 Utility APIs
Method	Endpoint	Description
POST	/upload/image	Upload images
DELETE	/upload/image/:id	Delete image
🗃️ Data Modeling (MongoDB)
👤 User Schema
{
  name: string,
  email: string,
  password: string,
  role: "admin" | "user",
  notificationsEnabled: boolean,
  createdAt: Date,
  updatedAt: Date
}
📝 Blog Schema
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
🔔 Notification Schema
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
🤖 AI Usage Schema
{
  admin: ObjectId(User),
  actionType: "generate" | "rewrite" | "seo",
  tokensUsed: number,
  createdAt: Date
}
🏗️ Backend Architecture
Folder Structure
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
Layer Responsibilities
Routes: define endpoints, attach middleware, no business logic
Controllers: handle requests/responses, call services, return standardized response
Services: business logic, DB operations, reusable logic, AI integration
Models: MongoDB schemas, data validation
⚡ Setup & Run
# Install dependencies
npm install

# Run server locally
npm run dev

# Build & run production
npm run build
npm start
📂 Postman Collection
Include all APIs, grouped by module:
Authentication
Users
Blogs
Notifications
AI
Dashboard
Utilities
Export Postman Collection as BlogifyProBackend.postman_collection.json
Export Environment as BlogifyProBackend.postman_environment.json (with BASE_URL, JWT token variables)
🔑 Environment Variables
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
📄 License
MIT License © 2026 Blogify Pro