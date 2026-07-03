# 🎨 Designing.io - Neo-Brutalist Architecture Sandbox

<p align="center">
  <img src="https://img.shields.io/badge/MERN%20Stack-Ready-blue?style=for-the-badge&logo=react" alt="MERN Stack" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Flow-Interactive-FF007F?style=for-the-badge" alt="React Flow" />
  <img src="https://img.shields.io/badge/ELK.js-Auto_Layout-green?style=for-the-badge" alt="ELK.js" />
  <img src="https://img.shields.io/badge/Zustand-State_Management-orange?style=for-the-badge" alt="Zustand" />
</p>

A high-performance full-stack web application designed as a fully functional, highly optimized Eraser.io clone. Built around a striking Neo-Brutalist design philosophy, this platform bridges the gap between technical system layouts and document tracking. It strips away smooth corporate curves, soft blurs, and gradients in favor of structural layouts, raw boundaries, and zero-blur drop shadows.

## ✨ Features

### 🏗️ System Redesign (Asynchronous Auto-Layout)
Features a high-performance hierarchical grid alignment engine powered by [elkjs](https://github.com/kieler/elkjs) (Eclipse Layout Kernel). With a single click of the "Auto Arrange ✨" control button, messy or scattered architectural blocks instantly compute and snap into optimized layouts.

### 📝 Note Per Block (Contextual Markdown)
Users can attach deep architectural notes and explicit configurations directly inside any individual component card. Click on a block to reveal a slide-out sidebar editor that saves technical choices (e.g., specific algorithms or database choices) in real time.

### 🛠️ Custom Omnidirectional Nodes (`brutalNode`)
Implements custom canvas nodes using `@xyflow/react` that support target and source connection ports sitting on all four sides of the card. Each card also features integrated, isolated Hitbox actions like a localized block deletion toggle.

### 🛡️ Persistent Global Authentication
Centralized session state powered by a custom Zustand store wrapped in the `persist` middleware layer. Sessions automatically survive canvas updates and hard page reloads through local disk caching configurations.

### 🍞 Centralized Neo-Brutalist Toasts
Styled notifications matching the stark identity tokens, driven library-free or customizable via `react-hot-toast` to handle asynchronous canvas operations and user login feedback cleanly.

### 🗄️ High-Frequency NoSQL Canvas Storage
Backed by a flat document hierarchy database in MongoDB that maps the full interactive whiteboard elements 1:1, bypassing the need for complex, heavy multitable relational joins.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Canvas Engine:** React Flow (`@xyflow/react`)
- **Layout Math Engine:** elkjs (Eclipse Layout Kernel)
- **State Management:** Zustand (with Persist Middleware)
- **Styling:** TailwindCSS (Arbitrary tokens for hard-edged styling blocks)
- **Routing:** React Router DOM
- **Other Utilities:** `react-icons`, Axios Client Instance

### Backend
- **Runtime Environment:** Node.js & Express.js
- **Database Layer:** MongoDB via Mongoose
- **Authentication:** Firebase Admin SDK & secure server payload parsers
- **Security & Infrastructure:** Native CORS handlers, cookie-parsers, and asynchronous route validation

## 📁 Project Structure

```plaintext
designing.io/
│
├── Backend/                    # Express Server & REST Core Pipelines
│   ├── src/
│   │   ├── controllers/        # Business logic controllers (auth, node saves)
│   │   ├── models/             # Mongoose schemas (Board and Node definitions)
│   │   ├── routes/             # Express route registers (auth, node parameters)
│   │   └── server.js           # Entry point for the server engine
│   └── package.json
│
├── Frontend/                   # Vite + React Client
│   ├── src/
│   │   ├── components/         # Atomic UI items (Addnode, AuthPortal, CustomBrutalistNode)
│   │   ├── pages/              # View wrappers (Homepage Landing, Infinite Playground)
│   │   ├── store/              # Global Zustand state sheets (useAuthStore, useDiagramStore)
│   │   ├── utils/              # Third-party script wrappers (Firebase, Axios instances)
│   │   ├── App.jsx             # Main application router mount frame
│   │   └── main.jsx            # Document root mount pipeline
│   └── package.json
│
└── README.md                   # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v24.x recommended)
- MongoDB Atlas account (Free M0 cluster tier)
- Firebase account for authentication configuration

### 1. Clone the Repository
```bash
git clone https://github.com/KRISHNA-0425/designing.io.git
cd designing.io
```

### 2. Backend Setup
Move into the backend architecture directory:
```bash
cd Backend
```

Install the necessary runtime packages:
```bash
npm install
```

Establish local network configurations by generating a `.env` file inside the `Backend/` folder:
```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_srv_connection_string
FRONTEND_URL=http://localhost:5173
# Include your Firebase environment keys here
```

Fire up the development environment server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a separate terminal frame and jump inside the frontend subfolder:
```bash
cd Frontend
```

Install all frontend assets and framework packages:
```bash
npm install
```

Establish a `.env.production` or `.env` configuration file inside the `Frontend/` root tree path:
```env
VITE_BACKEND_URL=http://localhost:3000
# Add your Firebase Web configuration SDK mappings here
```

Spin up the client sandbox environment locally:
```bash
npm run dev
```

Your infinite workspace blueprint landing grid will go live instantly on http://localhost:5173.

## 🚀 Cloud Production Deployment

### Backend Service (Hosted on Render)
1. Go to your Render Dashboard and create a new Web Service linked to your Git repository.
2. Define your subfolder requirements accurately inside the dashboard settings:
   - **Root Directory:** `Backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/server.js`
3. Go to the Environment console tab, and add your cloud parameters (`MONGODB_URI` and `PORT = 10000`). Render allocates port 10000 automatically to process traffic securely.

### Frontend Deployment (Hosted on Vercel)
1. Add a project profile mapping on your Vercel Dashboard.
2. Open your project settings configuration, edit the **Root Directory** option, and select the `Frontend` subfolder.
3. Add your environment variables under the configuration dropdown, injecting your live backend Render link under the `VITE_BACKEND_URL` key.
4. To ensure multi-page client-side paths work correctly upon reload without dropping `PAGE_NOT_FOUND` errors, add a `vercel.json` file at the root of your `Frontend/` folder:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

## 🤝 Contributing
Contributions and structural suggestions are always welcome. Feel free to report issues, suggest custom node types, or submit pull requests to make this canvas architecture layout builder even more bulletproof!

## 📝 License
This project is licensed under the ISC License.
