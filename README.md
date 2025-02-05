# TaskFlow Blockchain To-Do App ✨

## Authors
- **Name:** Dawit Yenew  
- **Email:** dawityenew.12@gmail.com  
- **Phone:** +251948028857

---

## Overview 🌟
TaskFlow is a cutting-edge decentralized task management platform built using **Chromia**, **Rell**, and the **FT4 library**. This dApp offers a secure and transparent environment for users to manage their tasks on the blockchain. With seamless integration of MetaMask and EVM wallets, TaskFlow ensures that all user actions are recorded on-chain, providing a tamper-proof and trustworthy experience.

---

## Core Features ✨
- **Task Management:** Add, edit, mark as complete, delete, filter, and sort tasks effortlessly.
- **Interactive Dashboard:** View summarized statistics, trends, and task statuses for better insights.
- **Secure Login:** Authenticate using MetaMask or other EVM wallets for a secure and decentralized experience.
- **Responsive Design:** Fully optimized for both mobile and desktop devices.
- **Dark/Light Theme:** Switch between dark and light modes for optimal viewing comfort.

---

## How TaskFlow Works 🔧

### User Account Management
- **Account Setup:** Users link their EVM wallet (e.g., MetaMask) to create an account on TaskFlow.
- **Blockchain Integration:** All user actions and task changes are linked to the authenticated wallet, ensuring data integrity and transparency.

### Task Management Features
- **Task Operations:** Users can add, edit, complete, and delete tasks as needed.
- **Task Filtering:** Sort tasks by completion status (Pending, Completed).
- **Due Date Sorting:** View tasks sorted by their due dates for better planning and prioritization.

### Dashboard Analytics
- **Statistics:** Displays total tasks, pending/completed tasks, and trends over time.
- **Visual Insights:** Provides insights such as task completion rates and upcoming deadlines.

---

## Setup Guide 🔧

### Prerequisites
- **PostgreSQL Database:** Ensure you have a running PostgreSQL instance.
- **Chromia CLI:** Install the Chromia CLI by following the [official Chromia guide](https://chromia.com).

---

## Running Locally 🏃‍♂️

### Step-by-Step Instructions
#### Clone the Repository:
```bash
git clone https://github.com/dawitYenew12/Chromia.git
```

#### Navigate to the Project Directory:
```bash
cd Chromia
```

#### Start the Backend:
Navigate to the backend folder and run the Chromia node:
```bash
cd chromia-task-management-backend && chr install && chr node start
```

#### Start the Frontend:
Open a new terminal, navigate to the frontend folder, and install dependencies:

Add environment variables with the file `.env` on the root of the `chromia-task-management-frontend` folder with the following variables:
```bash
# Environment variables for the front end
PUBLIC_CHROMIA_NODE_URL="add your rell backend server base url (e.g: http://localhost:7740)"
PUBLIC_BLOCKCHAIN_IID="add blockchain_IID for localhost it is 0"
```

Navigate to the frontend directory:
```bash
cd chromia-task-management-frontend
```

Install dependencies using either **yarn** or **npm**:
```bash
npm install
```

#### Run the Frontend:
```bash
yarn dev
```
Or, if using npm:
```bash
npm run dev
```

#### Access the Application:
Open your browser and navigate to:
```
http://localhost:3000
```

---

## Badges 🛡️
- ![GitHub](https://img.shields.io/badge/Version-1.0.0-blue)
- ![Blockchain](https://img.shields.io/badge/Blockchain-Chromia-green)
- ![React](https://img.shields.io/badge/Frontend-React-blueviolet)
- ![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-orange)

---


## Visual result of the project

<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738609178/Screenshot_2025-02-03_182445_lt45fs.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738609171/Screenshot_2025-02-03_182527_zpnekf.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738609173/Screenshot_2025-02-03_182546_aqlq4g.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738610374/Screenshot_2025-02-03_182608_ambkeh.png" alt="connect wallet" style="width: 100%;"/>

<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738609173/Screenshot_2025-02-03_182653_a1efas.png" alt="dashboard if not connected" style="width: 100%;"/>
<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738609173/Screenshot_2025-02-03_182736_ogxbkh.png" alt="screenshoot for demo purpose" style="width: 100%;"/>

<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738610374/Screenshot_2025-02-03_182633_jun0i3.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
