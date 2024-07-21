# Blood Bank Management System

A comprehensive Blood Bank Management System built using the MERN (MongoDB, Express, React, Node.js) stack and MVN (Model-View-Node) architecture. This application allows users to manage blood donations, track donors, and maintain blood inventory efficiently.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup](#setup)
- [Usage](#usage)

## Introduction

The Blood Bank Management System is designed to streamline the process of managing blood donations and inventory. It provides a user-friendly interface for donors, recipients, and administrators to interact with the system effectively.

## Features

- User authentication and authorization
- Donor registration and management
- Blood donation tracking
- Blood inventory management
- Search and filter functionality
- Responsive design for mobile and desktop
- RESTful API for seamless integration

## Tech Stack

- **Frontend:**

  - React
  - Redux
  - Axios
  - Bootstrap

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Architecture

The application follows the MVN (Model-View-Node) architecture pattern:

- **Model:** Defines the data structure and database schema using Mongoose.
- **View:** Represents the frontend built with React to create a dynamic user interface.
- **Node:** Acts as the controller, handling client requests and interacting with the database.

## Setup

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/blood-bank-management-system.git
   \`\`\`

2. Navigate to the project directory:
   \`\`\`bash
   cd blood-bank-management-system
   \`\`\`

3. Install frontend dependencies:
   \`\`\`bash
   cd client
   npm install
   \`\`\`

4. Install backend dependencies:
   \`\`\`bash
   cd ../server
   npm install
   \`\`\`

5. Create a \`.env\` file in the \`server\` directory and add the following:
   \`\`\`env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   \`\`\`

6. Start the development server:
   \`\`\`bash

   # In the client directory

   npm start

   # In the server directory

   npm run dev
   \`\`\`

## Usage

- Register as a donor and log in to your account.
- Administrators can manage blood donations and inventory.
- Search for blood types and donor information.
