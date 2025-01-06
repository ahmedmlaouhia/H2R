# React + Vite + TypeScript Project

This project is built with [Vite](https://vitejs.dev/), using React, TypeScript, and several essential libraries like Tailwind CSS and Daisy UI. It includes a backend API and database setup using Docker.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Setup Instructions](#setup-instructions)
   - [Clone the Repository](#1-clone-the-repository)
   - [Install Node Version](#2-install-node-version)
   - [Install Dependencies](#3-install-dependencies)
   - [Environment Configuration](#4-environment-configuration)
   - [Start the Development Server](#5-start-the-development-server)
   - [Running with Docker](#6-running-with-docker)
4. [Key Libraries Used](#key-libraries-used)
5. [Additional Commands](#additional-commands)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)
8. [License](#license)

## Project Overview

H2R is a web application designed to manage timesheets, notifications, and user authentication efficiently.

## Requirements

- **Node.js v20.17.0** (installed using [nvm](https://github.com/nvm-sh/nvm))
- **npm** (comes with Node.js)
- **Vite** for fast bundling and development
- **Docker** and **Docker Compose** for containerization

## Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:ahmedmlaouhia/H2R.git
cd H2R
```

### 2. Install Node Version

Ensure you're using the correct version of Node.js (v20.17.0). Run the following commands to install and use this version via `nvm`:

```bash
nvm install 20.17.0
nvm use 20.17.0
```

### 3. Install Dependencies

Once you have the correct Node.js version, install the project dependencies:

```bash
npm install
```

### 4. Environment Configuration

Create a `.env` file in the root directory and set the following environment variable:

```
VITE_APP_API="http://localhost:3000"
```

### 5. Start the Development Server

To start the development server with Vite:

```bash
npm run dev
```

This will start the server, and you can visit the project at [http://localhost:5173](http://localhost:5173).

### 6. Running with Docker

To run the application using Docker, ensure Docker and Docker Compose are installed. Then, execute:

```bash
docker-compose up --build
```

This will start the application along with the backend API and database.

## Key Libraries Used

- **React Router DOM**: For managing navigation within the app.
  - [Documentation](https://reactrouter.com/en/main)
- **Tailwind CSS**: A utility-first CSS framework for styling.
  - [Documentation](https://tailwindcss.com/)
- **Daisy UI**: A Tailwind CSS component library for building UI.
  - [Documentation](https://daisyui.com/)
- **React Hot Toast**: For showing toast notifications.
  - [Documentation](https://react-hot-toast.com/)
- **Axios**: For making HTTP requests.
  - [Documentation](https://axios-http.com/)

## Additional Commands

- **Build for production**:

```bash
npm run build
```

- **Preview production build**:

```bash
npm run preview
```

## Deployment

The project includes a Jenkins pipeline for CI/CD, which handles the building, tagging, and pushing of Docker images to an Amazon ECR repository.

## Troubleshooting

- **Docker Issues**: If containers fail to start, check the logs using `docker logs <container_name>`.
- **Environment Variables**: Ensure all necessary environment variables are correctly set in the `.env` file.

## License

This project is licensed under the MIT License.

Happy contribution!
