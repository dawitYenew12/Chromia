# TaskFlow Blockchain To-Do App

## Authors

- **Name**: Dawit Yenew
- **Email**: dawityenew.12@gmail.com
- **Phone**: +251948028857
- **WhatsApp**: +251948028857

---

## Overview

**TaskFlow** is a decentralized task management platform built using **Chromia**, **Rell**, and the **FT4 library**. This dApp provides a secure and transparent environment for users to manage their tasks on the blockchain. With seamless integration of **MetaMask** and **EVM wallets**, TaskFlow ensures that all user actions are recorded on-chain, offering a tamper-proof and trustworthy experience.

### Core Features

- **Task Management**: Add, edit, mark as complete, delete, filter, and sort tasks effortlessly.
- **Interactive Dashboard**: View summarized statistics, trends, and task statuses for better insights.
- **Secure Login**: Authenticate using **MetaMask** or other EVM wallets for a secure and decentralized experience.
- **Responsive Design**: Fully optimized for both mobile and desktop devices.
- **Dark/Light Theme**: Switch between dark and light modes for optimal viewing comfort.

---

## How TaskFlow Works

### User Account Management

- **Account Setup**: Users link their **EVM wallet** (e.g., MetaMask) to create an account on TaskFlow.
- **Blockchain Integration**: All user actions and task changes are linked to the authenticated wallet, ensuring data integrity and transparency.

### Task Management Features

- **Task Operations**: Users can add, edit, complete, and delete tasks as needed.
- **Task Filtering**: Sort tasks by completion status (Pending, Completed).
- **Due Date Sorting**: View tasks sorted by their due dates for better planning and prioritization.

### Dashboard Analytics

- **Statistics**: Displays total tasks, pending/completed tasks, and trends over time.
- **Visual Insights**: The dashboard provides insights such as task completion rates and upcoming deadlines.

---

## Setup Guide

### Prerequisites

1. **PostgreSQL Database**: Ensure you have a running PostgreSQL instance.
2. **Chromia CLI**: Install the **Chromia CLI** by following the official guide:  
   [Chromia Setup Guide](https://learn.chromia.com/courses/marketplace-course/setup)

---

## Running Locally

### Step-by-Step Instructions

1. **Clone the Repository**:

   ```bash
   git clone git@gitlab.com:chromia1/chromway-task-management.git

   ```

2. **Navigate to the Project Directory**:

```bash
cd chromway-task-management
```

3. **Start the Backend**:
   \*\*\*Navigate to the backend folder and run the Chromia node:

```bash
cd chromia-task-management-backend && chr install && chr node start

```

4. **Start the Frontend**:
   **_Open a new terminal, navigate to the frontend folder, and install dependencies_**:

   \*\* Add environment variables with the file .env on the root of the chromia-task-management-frontend folder with the bellow valiriables

   ```bash
   // environment variables for front end

   PUBLIC_CHROMIA_NODE_URL="add your rell backend server base url (e.g: http://localhost:7740)"
   PUBLIC_BLOCKCHAIN_IID="add blockchain_IID for local host it is 0"
   ```

```bash
cd chromia-task-management-frontend
```

**_User either yarn or npm_**:

```bash
npm install
```

5. **Run the Frontend**:

```bash
yarn dev
```

**_ Or, if using npm_**:

```bash
npm run dev
```

6. **Access the Application**:
   **_Open your browser and navigate to_**:

   ## [http://localhost:3000](http://localhost:3000)

## Some screenshots for the application

<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738609178/Screenshot_2025-02-03_182445_lt45fs.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738609171/Screenshot_2025-02-03_182527_zpnekf.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738609173/Screenshot_2025-02-03_182546_aqlq4g.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738609171/Screenshot_2025-02-03_182608_oob16r.png" alt="connect wallet" style="width: 100%;"/>

<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738609173/Screenshot_2025-02-03_182653_a1efas.png" alt="dashboard if not connected" style="width: 100%;"/>
<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738609173/Screenshot_2025-02-03_182736_ogxbkh.png" alt="screenshoot for demo purpose" style="width: 100%;"/>

<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738610374/Screenshot_2025-02-03_182608_ambkeh.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
<img src="https://res.cloudinary.com/dd07jzmaa/image/upload/v1738610374/Screenshot_2025-02-03_182633_jun0i3.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775193/d8_dh5zwb.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775194/d88_fux5uk.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775193/d9_tgmuo4.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775192/d10_b7l71w.png" alt="screenshoot for demo purpose" style="width: 100%;"/>
