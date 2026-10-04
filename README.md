# 🎉 EventBooking

A full-stack event services booking platform that allows users to browse, discover, and book event services (venues, catering, photography, etc.) while giving administrators full control over managing services, users, and bookings.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Data Models](#data-models)
- [Scripts](#scripts)

---

## Overview

EventBooking is a modern, full-stack web application built for discovering and booking event-related services. Users can search and filter services by category, location, and price, then book them for specific date ranges with real-time price calculation. Administrators have a dedicated dashboard to manage the entire platform.

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **NestJS** | ^12.0.1 | Node.js framework |
| **MongoDB** | via Mongoose ^9 | Database |
| **Mongoose** | ^9.10.3 | ODM |
| **Passport + JWT** | ^0.7.0 / ^4.0.1 | Authentication |
| **Cloudinary** | ^2.11.0 | Image hosting |
| **Multer** | ^2.4.0 | File uploads |
| **bcrypt** | ^6.0.0 | Password hashing |
| **Helmet** | ^8.3.0 | HTTP security headers |
| **class-validator** | ^0.15.1 | DTO validation |
| **Vitest** | ^4.1.2 | Testing |
| **TypeScript** | ^6.0.2 | Language |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | ^19.2.8 | UI framework |
| **Vite** | ^8.3.0 | Build tool |
| **TypeScript** | ~6.0.2 | Language |
| **React Router DOM** | ^7.18.4 | Client-side routing |
| **Redux Toolkit** | ^2.2.1 | State management |
| **Axios** | ^1.20.0 | HTTP client |
| **React Hook Form** | ^7.54.0 | Form management |
| **Zod** | ^3.23.8 | Schema validation |
| **TailwindCSS** | ^4.3.3 | Styling |
| **Lucide React** | ^0.473.0 | Icons |
| **Sonner** | ^1.7.0 | Toast notifications |
| **date-fns** | ^4.3.0 | Date utilities |

---

## ✨ Features

### User Features
- 🔐 **Authentication** — Secure registration, login, and JWT-based session management with refresh tokens
- 🔎 **Service Discovery** — Browse and search event services with filters for category, keyword, and price range
- 📅 **Smart Booking** — Select start/end dates from available slots with real-time price calculation
- 📋 **My Bookings** — View all personal bookings with their current status
- ❌ **Cancel Bookings** — Cancel a booking directly from the dashboard

### Admin Features
- 📊 **Admin Dashboard** — Overview of platform activity
- 🛠 **Service Management** — Create, edit, and delete services with image upload (via Cloudinary)
- 👥 **User Management** — View all users, update roles, or delete accounts
- 📁 **Booking Management** — View all bookings across the platform and update their status (e.g., confirm, reject)

### Platform Features
- 🔒 **Role-Based Access Control** — Separate routes and guards for `user` and `admin` roles
- 🖼 **Image Uploads** — Cloudinary integration for service banner images
- 🛡 **Security** — Helmet, CORS configuration, input validation via DTOs with `class-validator`
- 📖 **Swagger Docs** — Auto-generated API documentation (available at `/api/docs` when running)

---

## 📁 Project Structure

```
eventBooking/
├── Backend/
│   └── server/
│       ├── src/
│       │   ├── app.module.ts         # Root module
│       │   ├── main.ts               # Entry point (port 3000)
│       │   ├── auth/                 # JWT auth module
│       │   │   ├── controller/       # POST /api/auth/register|login|refresh
│       │   │   ├── dto/              # Login, Register, RefreshToken DTOs
│       │   │   ├── interfaces/
│       │   │   └── service/
│       │   ├── users/                # User management module
│       │   │   ├── controller/       # GET|PATCH|DELETE /api/users
│       │   │   ├── schemas/          # User Mongoose schema
│       │   │   ├── repositories/
│       │   │   └── service/
│       │   ├── services/             # Event services module
│       │   │   ├── controller/       # CRUD /api/services
│       │   │   ├── dto/              # Create, Update, Query DTOs
│       │   │   ├── schemas/          # Service Mongoose schema
│       │   │   ├── repositories/
│       │   │   └── service/
│       │   ├── bookings/             # Bookings module
│       │   │   ├── controller/       # CRUD /api/bookings
│       │   │   ├── dto/
│       │   │   ├── schemas/          # Booking Mongoose schema
│       │   │   ├── repositories/
│       │   │   └── service/
│       │   └── common/               # Shared utilities
│       │       ├── guards/           # JwtAuthGuard, AdminGuard
│       │       ├── types/            # BookingStatus enum, AuthRequest
│       │       ├── filters/
│       │       └── interceptors/
│       ├── test/
│       ├── .env
│       └── package.json
│
└── Frontend/
    ├── src/
    │   ├── App.tsx                   # Routes definition
    │   ├── main.tsx                  # React entry point
    │   ├── pages/
    │   │   ├── Auth/                 # Login, Register pages
    │   │   ├── Dashboard/            # User dashboard, My Bookings
    │   │   ├── Services/             # Services listing page
    │   │   └── Admin/                # Admin dashboard, services, users, bookings
    │   ├── components/
    │   │   ├── Auth/                 # LoginForm, RegisterForm, Route guards
    │   │   ├── Layout/               # UserLayout, AdminLayout
    │   │   ├── Services/             # ServiceDetailModal, CategoryIcon
    │   │   └── ui/                   # Reusable UI primitives (Button, Input)
    │   ├── service/                  # API call functions (Axios-based)
    │   │   ├── authService.ts
    │   │   ├── servicesService.ts
    │   │   ├── bookingService.ts
    │   │   └── userService.ts
    │   ├── store/                    # Redux Toolkit store
    │   │   ├── store.ts
    │   │   └── authSlice.ts
    │   ├── hooks/                    # Custom React hooks
    │   ├── types/                    # TypeScript interfaces
    │   ├── constants/                # API routes, front-end routes
    │   ├── axios/                    # Axios instance configuration
    │   └── config/
    ├── index.html
    ├── vite.config.ts
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** running locally (default: `mongodb://localhost:27017`) or a MongoDB Atlas URI
- **Cloudinary** account (for image uploads)

---

### Backend Setup

```bash
# Navigate to the backend server directory
cd Backend/server

# Install dependencies
npm install

# Create and configure your .env file (see Environment Variables section below)
cp .env.example .env  # or create manually

# Start in development mode (auto-rebuild on changes)
npm run start:dev
```

The API server will start at **http://localhost:3000**.  
Swagger documentation is available at **http://localhost:3000/api/docs**.

---

### Frontend Setup

```bash
# Navigate to the frontend directory
cd Frontend

# Install dependencies
npm install

# Create and configure your .env file
cp .env.example .env  # or create manually

# Start the Vite dev server
npm run dev
```

The frontend will be available at **http://localhost:5173**.

---

## 🔑 Environment Variables

### Backend (`Backend/server/.env`)

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/event-booking

# Server
PORT=3000

# JWT Secrets (use strong random strings in production!)
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key

# JWT Expiry
JWT_ACCESS_EXPIRES_IN=30m
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary (for service image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`Frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 📡 API Reference

All routes are prefixed with `/api`.

### Auth — `/api/auth`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | Public | Register a new user |
| `POST` | `/auth/login` | Public | Login and receive tokens |
| `POST` | `/auth/refresh` | Public | Refresh access token |

### Services — `/api/services`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/services` | Public | List/search services (keyword, category, price) |
| `POST` | `/services` | Admin | Create a new service (with optional image upload) |
| `PATCH` | `/services/:id` | Admin | Update a service |
| `DELETE` | `/services/:id` | Admin | Delete a service |

### Bookings — `/api/bookings`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/bookings` | User | Create a new booking |
| `GET` | `/bookings` | Admin | Get all bookings |
| `GET` | `/bookings/mybooking` | User | Get current user's bookings |
| `GET` | `/bookings/service/:serviceId` | Admin | Get bookings for a service |
| `PATCH` | `/bookings/:id` | Admin | Update booking status |
| `PATCH` | `/bookings/:id/cancel` | User | Cancel a booking |

### Users — `/api/users`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/users` | Admin | Get all users |
| `PATCH` | `/users/:id` | Admin | Update user role |
| `DELETE` | `/users/:id` | Admin | Delete a user |

---

## 🔒 Authentication

The application uses a **JWT-based dual-token strategy**:

- **Access Token** — Short-lived (`30m`), sent with each protected request via `Authorization: Bearer <token>` header.
- **Refresh Token** — Long-lived (`7d`), used to obtain a new access token via `POST /api/auth/refresh`.

**Guards:**
- `JwtAuthGuard` — Validates the access token; required for all protected routes.
- `AdminGuard` — Checks that `request.user.role === 'admin'`; applied on top of `JwtAuthGuard` for admin-only endpoints.

---

## 🗄 Data Models

### Service
```
{
  title:             string   (required)
  category:          enum     (ServiceCategory)
  pricePerDay:       number   (required, min: 0)
  description:       string   (required)
  location:          string   (required)
  imageUrl:          string?  (optional, Cloudinary URL)
  availabilityDates: Date[]   (required)
  contactDetails:    string   (required)
  createdAt:         Date     (auto)
  updatedAt:         Date     (auto)
}
```

### Booking
```
{
  userId:       ObjectId  → ref: User
  serviceId:    ObjectId  → ref: Service
  startDate:    Date      (required)
  endDate:      Date      (required)
  numberOfDays: number    (calculated)
  pricePerDay:  number    (snapshot at booking time)
  totalPrice:   number    (calculated)
  status:       enum      (pending | confirmed | cancelled | rejected)
  createdAt:    Date      (auto)
  updatedAt:    Date      (auto)
}
```

---

## 📜 Scripts

### Backend (`Backend/server/`)

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start in watch/dev mode |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Start compiled production build |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Run tests with coverage |
| `npm run lint` | Lint with oxlint |
| `npm run format` | Format with Prettier |

### Frontend (`Frontend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint with ESLint |

---

