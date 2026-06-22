# BlogAPI Viewer Frontend

## Overview

The Viewer Frontend is the primary entry point of the BlogAPI platform. It allows users to browse published blog posts, view author information, read individual articles, and interact with the platform as readers.

This application serves as the public-facing side of the project and provides navigation to the Author Frontend for users who wish to create and manage their own blog content.

## Project Architecture

The BlogAPI project consists of three separate repositories:

### 1. Viewer Frontend (Current Repository)

Responsible for:

* Landing page
* User registration
* User login
* Viewer dashboard
* Viewing published posts
* Viewing user profiles
* Reading individual blog posts
* Navigation to the Author Frontend

### 2. Author Frontend

Repository:

`https://github.com/Saron-A/blogAPI-Author_Frontend`

Responsible for:

* Author dashboard
* Creating posts
* Publishing posts
* Managing authored content

### 3. Backend API

Repository:

`https://github.com/Saron-A/blogAPI-backend`

Responsible for:

* Authentication
* Authorization
* Database communication
* User management
* Post management
* JWT token generation and verification

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Axios
* JWT Authentication
* REST API

---

## Features

### Authentication

* User Signup
* User Login
* JWT Token Storage
* Logout Functionality

### Viewer Dashboard

* View published posts
* View author information
* Navigate to full post pages
* View personal profile

### Navigation

* Access Author Frontend
* Access individual posts
* Access profile information

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Saron-A/blogAPI-Viewer_Frontend
```

Move into the project:

```bash
cd viewer-frontend
```

Open the project using Live Server or any static file server.

---

## Backend Requirement

This frontend requires the BlogAPI Backend server to be running.

Default API URL:

```txt
http://localhost:5000
```

---

## Folder Structure

```txt
viewer-frontend/
│
├── index.html
├── dashboard.html
├── profile.html
├── post.html
│
├── forms/
│   ├── login.html
│   └── signup.html
│
├── JS/
│   ├── dashboard.js
│   ├── profile.js
│   ├── login.js
│   ├── signup.js
│   └── post.js
│
└── css/
```

---

## Future Improvements

* Comments system
* Reactions and likes
* Author following system
* Search functionality
* Pagination
* Responsive UI improvements

---

## Author

Developed as part of a full-stack Blog API project to practice:

* Frontend Development
* Backend Development
* Authentication
* PostgreSQL
* REST APIs
* Software Architecture
