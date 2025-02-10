# Fetch Frontend Take-Home Exercise

## Overview

Welcome to the **Fetch Frontend Take-Home Exercise**! This project is a web application that allows users to search for shelter dogs, filter them by breed and location, mark favorites, and find a match for adoption.

## Features

- **User Authentication**: Login with name and email.
- **Dog Search**: Browse available dogs with filtering and sorting.
- **Pagination**: Results are paginated for better browsing.
- **Favorite Dogs**: Users can favorite multiple dogs.
- **Match Feature**: Generates a match from the user's favorite dogs.
- **Location Search**: Users can filter dogs by location.

---

## Live Demo

🚀 **[Deployed App URL](#)** (Replace with the actual link to the hosted site)

## Repository

📂 **[GitHub Repository](#)** (Replace with your actual GitHub repo link)

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 14.x recommended)
- **npm** or **yarn**
- **Git**

### Clone the Repository

```sh
 git clone https://github.com/your-username/fetch-frontend-exercise.git
 cd fetch-frontend-exercise
```

### Install Dependencies

Using npm:

```sh
npm install
```

Using yarn:

```sh
yarn install
```

### Environment Setup

Create a `.env` file in the root directory and add the following environment variables:

```
REACT_APP_API_BASE_URL=https://frontend-take-home-service.fetch.com
```

---

## Running the Application

### Start the Development Server

```sh
npm start
```

or

```sh
yarn start
```

The application should now be accessible at **[http://localhost:3000](http://localhost:3000)**

---

## API Endpoints Used

### **Authentication**

- `POST /auth/login` - Authenticate user.
- `POST /auth/logout` - Logout user.

### **Dog Search & Matching**

- `GET /dogs/breeds` - Retrieve all dog breeds.
- `GET /dogs/search` - Search for dogs (filter by breed, zip code, age, etc.).
- `POST /dogs` - Fetch full details of selected dogs.
- `POST /dogs/match` - Generate a match from favorited dogs.

### **Location Services**

- `POST /locations/search` - Search locations by city, state, or zip code.
- `POST /locations` - Retrieve location details by zip code.

---

## Usage Instructions

### **1. Login Page**

- Enter your name and email.
- Click **Login** to authenticate.

### **2. Search for Dogs**

- Use the breed filter to refine results.
- Sort results alphabetically (asc/desc).
- Use pagination to navigate through the listings.

### **3. Favorite Dogs**

- Click the **Favorite** button on any dog card.
- View your selected dogs in the favorites list.

### **4. Generate a Match**

- Click **Find My Match** to submit favorited dogs.
- The system selects one matched dog and displays its details.

### **5. Filter by Location**

- Enter a city or zip code to search for nearby dogs.

---

## Deployment

To deploy the app on **Vercel** or **Netlify**:

```sh
npm run build
```

Deploy the `build/` directory to your preferred hosting provider.

---

## Technologies Used

- **React.js** - Frontend framework
- **React Router** - Navigation
- **Axios** - API requests
- **Tailwind CSS** - Styling
- **React Context API** - State management

---

## Contribution

Contributions are welcome! Fork the repo and submit a pull request.

---

## License

MIT License. See `LICENSE` for details.

---

🚀 **Happy Coding!**




