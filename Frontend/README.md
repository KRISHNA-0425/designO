# 🎨 DesignO // Frontend System Board
> **A Stark Neo-Brutalist Architecture Blueprint Sandbox & Diagram Canvas**

<div align="left">
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/XYFlow-v12-FF007F?style=for-the-badge&logo=reactflow&logoColor=white" alt="XYFlow React" />
</div>

Welcome to **DesignO** (v1.0), an enterprise-grade canvas blueprint editor built with high-contrast, sharp Neo-Brutalist aesthetics. Engineered specifically to support massive system topologies, DesignO allows users to map out microservice diagrams, database relationships, and network flows without performance degradation or visual clutter.

---

## ⚡ Key Architectural Factors & Features

1. **Auto-Rearrange Engine**: A custom mathematical Sugiyama-style layered layout processor that untangles messy nodes, arranging parent-child dependencies left-to-right, centering straight lines, and stacking multi-child fans.
2. **Interactive Stark Canvas**: A fluid workspace built on React Flow, featuring multiple customizable source/target anchor handles, drag-and-drop mechanics, pane controls, grid overlays, and real-time bounding resizers.
3. **Deep Technical Documentation**: Each node holds custom metadata including labels, logs, settings, and configuration details. Real-time updates sync fields straight into the active diagram model.
4. **Instant Viewport Export**: Calculates bounding boxes on demand to scale and center diagrams dynamically, compile the layout components, and export them as clean `1024x768` PNG image files.
5. **Secure Google Identity Auth**: Integrated authentication via Firebase Google Identity Providers, backed by strict domain restriction check procedures and pop-up failure protections.
6. **Unified Persistent Stores**: State management via Zustand, persisting the authentication configuration in `localStorage` under the custom `desiging` storage tag namespace.

---

## 🛠️ Technology Stack Cards

Here is the key technology stack implemented across the DesignO client dashboard:

| ⚛️ React 19 & Vite 8 | 🎨 Tailwind CSS v4 |
| :--- | :--- |
| **Category**: Core Framework / Tooling <br>**Library**: `react` / `vite` <br>**Badges**:<br> <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /> <br> <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /> <br><br> Lightning-fast dev experience, HMR compilation, modular ES imports, and React 19 concurrent render features. | **Category**: Styling Engine <br>**Library**: `tailwindcss` / `@tailwindcss/vite` <br>**Badges**:<br> <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" /> <br><br> Custom styling utility framework implementing dark-framed borders, stark borders, high-contrast hover patterns, and responsive layouts. |

| 🗺️ XYFlow React (React Flow 12) | 📦 Zustand State Store |
| :--- | :--- |
| **Category**: Node Map Canvas <br>**Library**: `@xyflow/react` <br>**Badges**:<br> <img src="https://img.shields.io/badge/XYFlow-v12-FF007F?style=for-the-badge&logo=reactflow&logoColor=white" alt="XYFlow" /> <br><br> Interactive graphical editor handling custom nodes, custom connections, snap handles, bounds checking, and canvas control buttons. | **Category**: State Management <br>**Library**: `zustand` <br>**Badges**:<br> <img src="https://img.shields.io/badge/Zustand-v5-4338CA?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" /> <br><br> Minimal state container supporting data binding, async actions, and custom localStorage persistence with the namespace `'desiging'`. |

| 🔥 Firebase Authentication | 🧬 ElkJS Layout Engine |
| :--- | :--- |
| **Category**: Identity Management <br>**Library**: `firebase` <br>**Badges**:<br> <img src="https://img.shields.io/badge/Firebase-v12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" /> <br><br> Handles client-side identity authentication popups, Google OAuth, and secure profile credentials token bindings. | **Category**: Graph Mathematics <br>**Library**: `elkjs` <br>**Badges**:<br> <img src="https://img.shields.io/badge/ElkJS-Layout-E0F2FE?style=for-the-badge&logo=javascript&logoColor=black" alt="ElkJS" /> <br><br> Backs the auto-rearrange math equations, computing tree layers and coordinates for massive network topologies. |

| 📸 HTML-to-Image Export | ⚡ Axios Interceptors |
| :--- | :--- |
| **Category**: Export Compiler <br>**Library**: `html-to-image` <br>**Badges**:<br> <img src="https://img.shields.io/badge/HTML--to--Image-Export-10B981?style=for-the-badge&logo=image&logoColor=white" alt="html-to-image" /> <br><br> DOM node parser compiling the active React Flow canvas elements into a downloadable base64 PNG data structure. | **Category**: HTTP Client Middleware <br>**Library**: `axios` <br>**Badges**:<br> <img src="https://img.shields.io/badge/Axios-v1.18-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" /> <br><br> Central client instance incorporating a request interceptor to dynamically inject local auth bearer tokens into outgoing requests. |


---

## 🗂️ Project Directory Structure

```
Frontend/
├── public/                 # Static branding assets
├── src/
│   ├── api/
│   │   └── axios.js        # API Client with Bearer Token Storage Interceptor
│   ├── assets/             # Global graphics and styling elements
│   ├── components/
│   │   ├── Addnode.jsx     # XYFlow Graph Canvas rendering and node setups
│   │   ├── BrutalistToast.jsx # High-contrast Custom Toast Notifications
│   │   ├── DownloadButton.jsx # Canvas PNG export utility compiler
│   │   ├── Navbar.jsx      # Stark branding bar and user indicators
│   │   └── Footer.jsx      # Dark bottom utility footer with system state
│   ├── pages/
│   │   ├── Homepage.jsx    # Hero entry hub with feature specifications
│   │   ├── Playground.jsx  # Interactive layout builder workspace
│   │   └── AuthPortal.jsx  # Sign In / Sign Up portal with Google OAuth
│   ├── store/
│   │   ├── useAuthStore.js # Zustand user state store and authentication handlers
│   │   └── useDiagramStore.js # Zustand canvas nodes, edges, and autoLayout algorithms
│   ├── utils/
│   │   └── firebase.js     # Firebase config keys & OAuth providers setup
│   ├── App.jsx             # React Router routing layout configurations
│   ├── index.css           # Styling initialization core
│   └── main.jsx            # DOM Mounting point
├── package.json            # Dependencies and development scripts
├── vite.config.js          # Vite config with React and Tailwind v4 plugins
└── vercel.json             # Vercel deployment redirect configuration
```

---

## ⚙️ Core Technical Implementation Details

### 🧬 Custom Sugiyama Auto-Layout Algorithm
The arrangement engine logic in [useDiagramStore.js](file:///c:/Users/263237/Desktop/MERN/Desiging.io-final/Frontend/src/store/useDiagramStore.js) uses a layered Sugiyama approach:
- **Root Layering**: Nodes are assigned horizontal layers (X-axis) using paths from roots, guarding against cyclic relationships.
- **Barycenter Ordering**: Minimizes crossing edges by sorting nodes in each layer based on the average index of their parent nodes.
- **Straight-Line Chain Alignment**: Identifies simple $1 \rightarrow 1$ node paths to align them horizontally, and stacks multi-child pipelines cleanly using vertical offsets.
- **Nudge Coordinates**: Resolves vertical node overlaps dynamically before rendering smooth transition paths on the viewport.

### ⚡ Bearer Auth Token Interceptor
The application employs a custom client interceptor in [axios.js](file:///c:/Users/263237/Desktop/MERN/Desiging.io-final/Frontend/src/api/axios.js) to automate security handling:
- Reads the persisted client state dynamically from local storage under the key `desiging`.
- Parses the JSON schema, extracts the active session token, and automatically injects it as an `Authorization: Bearer <token>` header on all outgoing backend API requests.

### 🎨 Neo-Brutalist Visual Design System
To make the design look premium, DesignO implements custom design variables using **Tailwind CSS v4** styling:
- **Borders**: Stark, solid $4\text{px}$ black borders (`border-4 border-black`) applied to all buttons, input fields, cards, and nav lines.
- **Shadows**: Custom offset blocks (`shadow-[4px_4px_0px_0px_#000000]`) that shift on hover to create interactive micro-animations.
- **Color Contrast**: Stark high-contrast backgrounds (neon Yellow `#FEFCE8`, Sky Blue `#38bdf8`, Emerald Green `#6ee7b7`) that give the canvas a striking, state-of-the-art layout.
- **Custom Feedback**: A custom notification script [BrutalistToast.jsx](file:///c:/Users/263237/Desktop/MERN/Desiging.io-final/Frontend/src/components/BrutalistToast.jsx) that matches the layout with solid outlines and retro-gaming aesthetics.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed on your development machine.

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install the package dependencies listed in [package.json](file:///c:/Users/263237/Desktop/MERN/Desiging.io-final/Frontend/package.json):
   ```bash
   npm install
   ```

### Setup Local Environment
Create a `.env` file in this directory and populate the required API configurations for Firebase and the backend server URL.

### Dev Scripts
Execute the scripts using `npm`:
- Run local development server:
  ```bash
  npm run dev
  ```
- Build production assets:
  ```bash
  npm run build
  ```
- Run ESLint validation check:
  ```bash
  npm run lint
  ```
- Preview the build locally:
  ```bash
  npm run preview
  ```

---
> [!TIP]
> **Pro-Tip**: In the Diagram Canvas, click any node to enter edit mode, where you can modify its title and description in real-time. Connect handles by dragging wires between the neon ports, or hit **Auto Arrange** to let the layout engine clean up your structure instantly.
