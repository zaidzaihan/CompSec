# 🏢 Visitor Management System (VMS)

A comprehensive visitor management system built with Node.js and MongoDB for managing visitors, staff, and security personnel in organizational premises.

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Azure](https://img.shields.io/badge/Microsoft_Azure-0089D0?style=for-the-badge&logo=microsoft-azure&logoColor=white)

## 📋 Features

### 👤 User Management
- **Admin Registration & Login** - Full system access and user role management
- **Staff Registration & Login** - Visitor registration and management capabilities  
- **Security Personnel Registration & Login** - Staff registration and visitor monitoring
- **Role-based Access Control** - Different permissions for Admin, Staff, and Security roles

### 👥 Visitor Management
- **Visitor Registration** - Complete visitor information including health status
- **Visitor Pass Retrieval** - Digital pass system for registered visitors
- **Visitor Information Updates** - Modify visitor details as needed
- **Visitor Deletion** - Remove visitor records from system

### 🔐 Security Features
- **JWT Authentication** - Secure token-based authentication
- **Password Encryption** - Bcrypt hashing for secure password storage
- **Rate Limiting** - Login attempt restrictions (5 attempts per 15 minutes)
- **Password Policy Enforcement** - Minimum 8 characters with uppercase, numbers, and special characters
- **Token Blacklisting** - Secure logout implementation

### 📊 Monitoring & Logging
- **Entry/Exit Tracking** - Automatic logging of user access times
- **Health Status Monitoring** - COVID-19 health screening integration
- **Activity Logs** - Comprehensive system activity tracking
- **Host Contact Integration** - Visitor-host communication system

### 📚 API Documentation
- **Swagger Integration** - Interactive API documentation at `/api-docs`
- **Comprehensive Endpoints** - RESTful API design with proper HTTP methods
- **Request/Response Examples** - Clear API usage documentation

## 🗄️ Database Collections

- **UserInfo** - Staff, Admin, and Security personnel data
- **Visitors** - Visitor registration and information
- **Health Status** - COVID-19 health screening records
- **Logs** - System access and activity tracking

## 🚀 Deployment

Currently deployed on Azure Web Services at: `zaidzaihan.azurewebsites.net`

## 📱 API Endpoints

### Authentication
- `POST /user/login` - User authentication
- `POST /user/logout` - User logout
- `POST /visitor/retrievePass` - Visitor pass retrieval
- `POST /visitor/returnPass` - Visitor exit tracking

### User Management
- `POST /user/register` - Staff registration (Security role required)
- `POST /security/register` - Security personnel registration
- `POST /Admin/register` - Admin registration
- `PUT /Admin/manage-roles/:userId` - User role management

### Visitor Operations
- `POST /user/registerVisitor` - Visitor registration
- `POST /user/view/visitor` - View registered visitors
- `POST /user/updateVisitor` - Update visitor information
- `DELETE /deleteVisitors/:id` - Remove visitor records

### System Monitoring
- `POST /user/view/Logs` - View system access logs
- `GET /security/visitor-pass/:id/host-contact` - Retrieve host contact information

---

*This project was developed as part of an academic assignment to demonstrate full-stack development skills with Node.js, Express, MongoDB, and JWT authentication.*
