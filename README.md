# ✨ BlogPen - AI-Powered Blog App

BlogPen is a modern **MERN stack blog application** that leverages AI (via Gemini API) for content generation. It features user authentication, a moderated comment system, advanced search, and a responsive design. Upcoming: subscription-based features.

---

## 🎯 Features

### Core Functionality
- 🔐 **Secure Authentication** – JWT-based user registration and login.
- 🤖 **AI-Powered Content Generation** – Create blog posts with AI assistance (Gemini API).
- 💬 **Moderated Comment System** – Admin approval workflow for user comments.
- 🔍 **Advanced Search & Discovery** – Find content by keywords, categories, or authors.
- 📱 **Fully Responsive Design** – Optimized for all devices.
- 👥 **Role-Based Access Control** – Separate admin and user interfaces.

### User Experience
- 🎨 **Modern UI/UX** – Built with **TailwindCSS**.
- 🖥 **Intuitive Dashboard** – Easy content management for authors and admins.
- 📂 **Category Filtering** – Browse by Technology, Startup, Lifestyle, Finance.
- 👍 **User Reactions** – Interactive engagement system for readers.

### Technical Excellence
- ⚡ **Optimized Performance** – Fast loading with **Vite**.
- 🛠 **RESTful API Architecture** – Clean, maintainable backend structure.
- 📊 **Admin Dashboard** – Comprehensive content management interface.

---

## 👥 User Roles

### 🔑 Admin Users
- Full content management
- Comment moderation & approval
- User management
- Analytics dashboard

### 👤 Regular Users
- Create & manage own blogs
- Comment on posts (subject to approval)
- Browse & search blogs
- React to posts

---

## 🛠 Tech Stack

**Frontend:**
- React
- Vite
- TailwindCSS
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

**AI Integration:**
- Gemini API

---

## 🌐 API Endpoints

**Base URL:**  
http://localhost:5000/api/v1

### 🔐 Admin Routes (`/api/v1/admin`)
| Method | Endpoint     | Description                | Auth |
|--------|-------------|----------------------------|------|
| POST   | `/login`    | Admin login                | Public |
| GET    | `/verify`   | Verify admin token         | Required |
| GET    | `/dashboard`| Get admin dashboard data   | Required |

### 📝 Blog Routes (`/api/v1/blog`)
| Method | Endpoint       | Description                  | Auth      | Params |
|--------|---------------|------------------------------|-----------|--------|
| GET    | `/`           | Get all blogs (public)       | Public    | - |
| GET    | `/admin`      | Get all blogs (admin view)   | Required  | - |
| POST   | `/`           | Create new blog              | Required  | `file` (optional image) |
| GET    | `/:id`        | Get blog by ID               | Public    | `id` |
| DELETE | `/:id`        | Delete blog                  | Required  | `id` |
| POST   | `/toggle`     | Toggle publish status        | Required  | `blogId` |
| POST   | `/generate`   | Generate AI content          | Required  | Content params |

### 💬 Comment Routes (`/api/v1/comment`)
| Method | Endpoint               | Description                  | Auth      | Params |
|--------|-----------------------|------------------------------|-----------|--------|
| POST   | `/`                   | Add new comment              | Public    | Comment data |
| GET    | `/all`                | Get all comments (admin)     | Required  | - |
| GET    | `/blog/:blogId`       | Get comments for blog        | Public    | `blogId` |
| POST   | `/:commentId/toggle`  | Toggle comment approval      | Required  | `commentId` |
| DELETE | `/:commentId`         | Delete comment               | Required  | `commentId` |
| POST   | `/approve`            | Approve comment by ID        | Required  | `commentId` |

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Gemini API account

### Clone the Repository
```bash
git clone https://github.com/your-username/blogpen.git
cd blogpen

🔧 Backend Setup
cd server
npm install

# Create environment file
cp .env.example .env
# Edit .env with your values

🎨 Frontend Setup
cd ../client
npm install

⚙️ Environment Variables
# Server
PORT=8080
NODE_ENV=development
CLIENT_URL="http://localhost:5173"
CORS_ORIGIN="http://localhost:5174"

# Database
MONGODB_URI=mong

# JWT
JWT_TOKEN_SECRET=ravikumaryadav
JWT_TOKEN_EXPIRY=1m

# Cloudinary
CLOUDINARY_CLOUD_NAME=dcf6upw3r
CLOUDINARY_API_KEY=1415718
CLOUDINARY_API_SECRET=ctjljZUdiptv8

# AI / External APIs
GEMINI_API_KEY="AIzaSyDJ3I5__E804-c"

# Admin Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="abcde"

▶️ Running the Application
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm run dev
App available at:

🌐 Frontend → http://localhost:3000
⚙️ Backend API → http://localhost:5000
📊 Admin Dashboard → http://localhost:3000/admin

🔮 Coming Soon

Subscription Features: Paid memberships, premium content access, and enhanced user analytics.

Advanced AI Enhancements: Personalized blog suggestions based on user preferences.


🤝 Contributing
We welcome contributions!

Fork the project

Create a feature branch:
git checkout -b feature/amazing-feature
Commit changes:
git commit -m 'Add amazing feature'
Push branch:
git push origin feature/amazing-feature
Open a Pull Request

🌟 Support
If you find BlogPen useful, please ⭐ the repo on GitHub!

📞 Contact
Maintainer: Ravi Kumar Yadav

✨ Happy Blogging with BlogPen! 🚀
