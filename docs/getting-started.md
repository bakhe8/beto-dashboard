[Docs Index](./index.md) | [Project README](../README.md)

# Getting Started

Welcome to the BetoDashboard framework! This guide will walk you through setting up your local development environment.

## Prerequisites

Ensure you have the following installed on your system:

-   **Node.js**: Version 20.x or higher.
-   **npm**: Version 10.x or higher.

## 1. Clone the Repository

First, clone the project from GitHub to your local machine.

```bash
git clone https://github.com/bakhe8/beto-dashboard.git
cd beto-dashboard
```

## 2. Install Dependencies

Next, install the required npm packages. We use `npm ci` to ensure a clean, reproducible installation based on the `package-lock.json` file.

```bash
npm ci
```

## 3. Run the Development Server

Finally, start the Vite development server. This will launch the application with hot module replacement (HMR) enabled.

```bash
npm run dev
```

The application will now be running at `http://localhost:5173`.
