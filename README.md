# 📦 React-X-Elysia

[![Stack](https://img.shields.io/badge/React-19-black?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Stack](https://img.shields.io/badge/Elysia-1.4-black?style=flat-square&logo=bun&logoColor=white)](https://elysiajs.com/)
[![Stack](https://img.shields.io/badge/Bun-Latest-black?style=flat-square&logo=bun&logoColor=white)](https://bun.sh/)

[![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)](LICENSE)

![Status](https://img.shields.io/badge/Status-Active-green?style=flat-square)

> A high-performance full-stack template combining React Router v7 and ElysiaJS with end-to-end type safety.

## 🚀 About

This template is designed to help you kickstart a **React + Elysia** project quickly. It comes pre-configured with:

* **End-to-End Type Safety** - Pre-configured Eden Elysia client for seamless type sharing between backend and frontend
* **Decoupled Hosting Architecture** - Frontend and backend can be hosted separately for better redundancy and scalability
* **Modern Stack** - React 19, React Router v7, ElysiaJS, Bun, and Tailwind CSS v4

## 🏗 Architecture & Redundancy

A key design philosophy of this template is **decoupled hosting**:

- **Frontend**: Built with React Router v7, designed to be hosted independently on CDNs or Edge networks (e.g., Vercel, Cloudflare Pages, Netlify).
- **Backend**: An Elysia server running on Bun, designed to be hosted on a VPS, Railway, Fly.io, or any containerized environment.

**Why?** By hosting the frontend and backend separately, you achieve greater redundancy and scalability. If the backend service encounters issues, the frontend remains accessible to users (serving static content, cached data, or graceful error messages), significantly improving perceived reliability.

## 🛠️ Prerequisites

Before starting, ensure you have the following installed:

* [**Bun**](https://bun.sh/) (v1.0 or higher)

## 📥 Getting Started

### 1. Use this template

Click the **[Use this template](https://github.com/your-username/react-x-elysia/generate)** button at the top of the repository to create a new repository with this starter code.

### 2. Clone & Install

```bash
# Clone your new repository
git clone https://github.com/your-username/your-new-project.git

# Enter the directory
cd your-new-project

# Install dependencies for all workspaces
bun install
```

### 3. Configuration

The template is ready to use out of the box. If you need to configure environment variables, create a `.env` file in the backend directory:

```bash
cd backend
# Create .env file with your configuration
```

### 4. Run Development Server

```bash
# Start the backend (default port 3000)
cd backend
bun dev

# Start the frontend (in a separate terminal)
cd frontend
bun dev
```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:3000`.

## 📂 Project Structure

```
react-x-elysia/
├── 📁 backend/              # Elysia backend
│   ├── 📁 src/
│   │   ├── 📁 modules/      # Feature modules
│   │   └── index.ts         # Main entry point
│   ├── package.json
│   └── tsconfig.json
├── 📁 frontend/             # React Router frontend
│   ├── 📁 app/
│   │   ├── 📁 components/  # React components
│   │   ├── 📁 libs/         # Utilities (Eden client)
│   │   ├── 📁 routes/       # Route pages
│   │   └── root.tsx         # Root layout
│   ├── package.json
│   └── vite.config.ts
├── 📄 package.json         # Workspace root
└── 📄 README.md            # This file
```

## 💎 Key Features

- **End-to-End Type Safety**: Pre-configured Eden Elysia client ensures your frontend types are always in sync with your backend API
- **Monorepo Structure**: Efficient code sharing using Bun workspaces
- **TypeScript**: Full TypeScript support across the entire stack

## 📜 License

Distributed under the MIT License. See LICENSE for more information.

<p align="center"> Made with ❤️ by <a href="https://github.com/cleboost">Cleboost</a> </p>
