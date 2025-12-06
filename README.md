# React-X-Elysia Template

A high-performance full-stack template combining **React (via React Router v7)** and **ElysiaJS** running on **Bun**.

## 🚀 Overview

This template is designed to provide a robust starting point for modern web applications, leveraging the speed of Bun and the developer experience of React 19 and Elysia.

## 🏗 Architecture & Redundancy

A key design philosophy of this template is **decoupled hosting**:

- **Frontend**: Built with React Router v7, designed to be hosted independently on CDNs or Edge networks (e.g., Vercel, Cloudflare Pages, Netlify).
- **Backend**: An Elysia server running on Bun, designed to be hosted on a VPS, Railway, Fly.io, or any containerized environment.

**Why?** By hosting the frontend and backend separately, you achieve greater redundancy and scalability. If the backend service encounters issues, the frontend remains accessible to users (serving static content, cached data, or graceful error messages), significantly improving perceived reliability.

## 💎 Key Features

- **End-to-End Type Safety**: This template is pre-configured to support **Eden Elysia**. It allows for seamless type sharing between your backend and frontend, ensuring your client is always in sync with your API definition without manual type declaration.
- **Modern Stack**:
  - **Frontend**: React 19, React Router v7, Tailwind CSS v4.
  - **Backend**: ElysiaJS, Bun.
- **Monorepo Structure**: Efficient code sharing and dependency management using Bun workspaces.

## 📦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed.

### Installation

```bash
# Install dependencies for all workspaces
bun install
```

### Development

```bash
# Start the backend (default port 3000)
cd backend
bun dev

# Start the frontend (in a separate terminal)
cd frontend
bun dev
```

