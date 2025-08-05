# 🌟 FullStack Store Rating Web App

A full-stack web application that allows users to rate stores with role-based access for **System Administrators**, **Normal Users**, and **Store Owners**.

Users can register, log in, rate stores from 1 to 5 ⭐, and manage dashboards based on their role.

---

## 🚀 Tech Stack

- 🖥️ **Frontend**: React.js (TailwindCSS, Axios, Context API)
- 🔧 **Backend**: Express.js / Loopback / NestJS (choose one)
- 🗃️ **Database**: PostgreSQL / MySQL
- 🔐 **Authentication**: Role-based login system
- 📊 **Dashboards**: Admin and Store Owner analytics

---

## 👥 User Roles & Functionalities

### 🔒 System Administrator
- ➕ Add new stores, normal users, and admin users.
- 📊 Admin Dashboard:
  - 👤 Total Users
  - 🏪 Total Stores
  - ⭐ Total Submitted Ratings
- 👁️ View and filter:
  - All users (Name, Email, Address, Role)
  - All stores (Name, Email, Address, Rating)
- 🔍 Filters on Name, Email, Address, Role.
- 🔐 Logout

---

### 🧑 Normal User
- 📝 Sign up & log in
- 🔍 View and search stores (Name, Address)
- ⭐ Submit and update ratings (1 to 5)
- 👁️ See own submitted ratings
- 🔑 Update password
- 🔐 Logout

---

### 🏪 Store Owner
- 🔐 Login
- 📊 Dashboard:
  - 👥 View users who submitted ratings
  - ⭐ Average rating of the store
- 🔑 Update password
- 🔐 Logout

---

## ✅ Form Validations

| Field     | Rules |
|-----------|-------|
| **Name**  | Min 20, Max 60 characters |
| **Email** | Valid email format |
| **Address** | Max 400 characters |
| **Password** | 8-16 chars, 1 uppercase, 1 special character |

---

## 📊 Dashboard Details

**Admin Dashboard**
- 👥 Total Users  
- 🏪 Total Stores  
- ⭐ Total Ratings  

**Store Owner Dashboard**
- 👤 List of raters  
- ⭐ Average Rating  

---

## 🔍 Table Functionalities

- Sortable columns: Name, Email, Role (ASC/DESC)
- Filter/search on Name, Email, Address, Role

---

## Backend Setup (Express.js + PostgreSQL/MySQL)

### ✅Prerequisites

- Node.js installed
- PostgreSQL or MySQL installed and running
- Create a database: `store_rating_app`

### 📦 Installation Steps

1. Open terminal and go to the backend folder:
    cd backend
2. Install dependencies:
    npm install
3. Create a .env file in the backend folder and add configuration
4. Start the backend server:
    npm run dev


## Frontend Setup (React.js + Tailwind CSS)
### ✅Prerequisites
 - Node.js installed
 - Backend should be running at http://localhost:5000

### 📦 Installation Steps

1. Open a new terminal and navigate to the frontend folder:
    cd frontend
2. Install dependencies:
   npm install
3. Start the frontend app:
   npm run dev

  

