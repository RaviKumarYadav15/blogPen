# ✍️ BlogPen – AI Powered Blog Application

BlogPen is a modern **MERN stack** blogging platform with **AI-assisted content creation**.  
It provides a seamless writing experience, powerful admin tools, and an engaging reader interface.  

Built with **React, Vite, TailwindCSS, Node.js, Express, MongoDB, and GEMINI API**.  

---

## ✨ Features

## 👥 User Roles

### 🔑 Admin Users
Admins have full control over the platform:
- 📝 **Content Management** – Create, edit, and delete blogs  
- 💬 **Comment Moderation & Approval** – Review and approve user comments  
- 👥 **User Management** – Manage platform users  
- 📊 **Analytics Dashboard** – Access insights and statistics  

### 👤 Regular Users
Regular users can interact and contribute content:
- ✍️ **Create & Manage Own Blogs** – Draft and publish personal posts  
- 💬 **Comment on Posts** – Comments are subject to admin approval  
- 🔍 **Browse & Search Blogs** – Explore content by keywords, categories, or authors  
- ❤️ **React to Posts** – Like, upvote, or engage with content


### 🎯 Core Functionality
- 🔐 **Secure Authentication** – JWT-based user registration and login system  
- 🤖 **AI-Powered Content Generation** – Create blog posts with AI assistance  
- 💬 **Moderated Comment System** – Admin approval workflow for user comments  
- 🔍 **Advanced Search & Discovery** – Find content by keywords, categories, or authors  
- 📱 **Fully Responsive Design** – Optimized across all devices  
- 👥 **Role-Based Access Control** – Separate **admin** and **user** interfaces  

### 🎨 User Experience
- 🎨 **Modern UI/UX** – Built with TailwindCSS  
- 📊 **Intuitive Dashboard** – Easy content management for authors and admins  
- 🗂 **Category Filtering** – Browse blogs by *Technology, Startup, Lifestyle, Finance*  
- ❤️ **User Reactions** – Interactive engagement system for readers  

### ⚡ Technical Excellence
- ⚡ **Optimized Performance** – Fast builds & hot reload with Vite  
- 🔗 **RESTful API Architecture** – Clean, maintainable backend  
- 🛠 **Admin Dashboard** – Comprehensive content & comment management  

---

## 🛠 Tech Stack

**Frontend**  
- React  
- Vite  
- TailwindCSS  
- React Router  

**Backend**  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- JWT Authentication  

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

### ✅ Prerequisites
- Node.js (v16+)  
- MongoDB  
- OpenAI API account  

### 📥 Clone the Repository
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
Create .env in server/:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
CLIENT_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000

▶️ Running the Application
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm run dev
App available at:

🌐 Frontend → http://localhost:3000
⚙️ Backend API → http://localhost:5000
📊 Admin Dashboard → http://localhost:3000/admin


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
Maintainer: [Your Name]
📧 Email: your.email@blogpen.com
🐦 Twitter: @blogpen

✨ Happy Blogging with BlogPen! 🚀
