# ChromWay To-do dApp

## Authors

- **Name**: Belayneh Getachew
- **Email**: belaynehgetachew21@gmail.com
- **Phone**: +251915861487
- **WhatsApp**: +251915861487

---

## Project Description

ChromWay To-do dApp is a multi-user to-do list application built with **Chromia**, **Rell**, and the **FT4 library**. It provides a secure platform for managing tasks, ensuring authentication and data integrity through blockchain.

### Key Features:

- **To-do dApp**: Add, update, complete, delete, sort, and filter tasks.
- **Dashboard**: View summaries, including task trends and status.
- **Authentication**: Secure user login via **MetaMask wallet**.
- **Light/Dark Mode**: Toggle between themes.
- **Mobile Responsive**: Optimized for cross-platform use.

---

## How It Works

### User Management

- **Account Creation**: Connect an **EVM wallet** (e.g., MetaMask) for secure user accounts.
- **Authentication**: User actions are linked to the authenticated account.

### To-do dApp

- Add, update, complete, and delete tasks.
- Filter tasks by status (completed/pending).
- Sort tasks by due date.

### Dashboard

- Task summaries, including:
  - Total tasks.
  - Pending and completed tasks.
  - Due date trends.

---

## Setup Instructions and Installation

### Prerequisites

1. Set up a PostgreSQL database.
2. Install the **Chromia CLI** by following this guide:  
   [Chromia Setup Guide](https://learn.chromia.com/courses/marketplace-course/setup)

---

## Running the Project Locally

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

   NEXT_PUBLIC_CHROMIA_NODE_URL="add your rell backend server base url (e.g: http://localhost:7740)"
   NEXT_PUBLIC_BLOCKCHAIN_IID="add blockchain_IID for local host it is 0"
   ```

```bash
cd chromia-task-management-frontend
```

**_User either yarn or npm_**:

```bash
npm install
```

```bash
yarn
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

<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775196/d111_t7yzpq.png" alt="Demo Screenshot" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775195/d11_bml422.png" alt="Demo Screenshot" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775190/d4_qo9mp2.png" alt="Demo Screenshot" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775191/d5_gth0ds.png" alt="Demo Screenshot" style="width: 100%;"/>

<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775192/d2_wltldz.png" alt="Demo Screenshot" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775192/d3_rtwydt.png" alt="Demo Screenshot" style="width: 100%;"/>

<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775191/d6_hdeam6.png" alt="Demo Screenshot" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775192/d7_hvfr56.png" alt="Demo Screenshot" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775193/d8_dh5zwb.png" alt="Demo Screenshot" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775194/d88_fux5uk.png" alt="Demo Screenshot" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775193/d9_tgmuo4.png" alt="Demo Screenshot" style="width: 100%;"/>
<img src="https://res.cloudinary.com/defapkeo8/image/upload/v1737775192/d10_b7l71w.png" alt="Demo Screenshot" style="width: 100%;"/>
