# licenseapp
Overview
This is a License Application web project with user submission forms and an Admin Dashboard to review submissions, update statuses, and preview uploaded documents. The backend is built with Express and MongoDB, and the frontend with React + Material UI.


Tech Stack
Backend: Node.js, Express, MongoDB (Mongoose)
Frontend: React, Material UI
File Uploads: Multer (backend)
Authentication: Basic Auth for admin (for simplicity)
Email Service: Nodemailer (mock currently logs emails)
Environment: Uses .env for sensitive config (MongoDB URI, email credentials)


Assumptions
Uploaded files are saved on the backend server in /uploads folder and served statically.
Admin credentials are hardcoded for simplicity (Basic Auth).
Emails are logged to console in dev mode (replace with real SMTP in production).
Users must be 18+ years old to submit an application.
Submission status defaults to "Pending" on new submission.
Frontend and backend run separately (frontend React app, backend Express server).

Setup Instructions
BACKEND
Clone the repo and navigate to backend folder:
git clone <repo-url>
cd backend

Install dependencies:
npm install

Create a .env file with your environment variables:
MONGODB_URI=your_mongodb_connection_string
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password123

Run the backend server:npm run dev

FRONTEND
Navigate to the frontend folder:
cd frontend

Install dependencies:

npm install
React and Vite essentials:
react
react-dom
vite
@vitejs/plugin-react (to enable React support in Vite)

 Material UI:
@mui/material
@emotion/react
@emotion/styled

HTTP Client:
axios

npm install react react-dom axios @mui/material @emotion/react @emotion/styled
npm install -D vite @vitejs/plugin-react typescript


Start the React dev server:npm start
Access the app at http://localhost:3000

Admin Login Credentials (for testing)
Username	Password
admin	password123
Admin pages are protected with Basic Auth; provide these credentials when prompted or included in API requests.


Code Structure and Scalability Notes
Backend:
Organized in folders: controllers, models, routes, services
Separate controllers for submissions and admin logic
Multer handles file uploads with limits for file size
Email logic abstracted into a service for easy replacement
MongoDB schema designed for extensibility (documents grouped, status & notes included)

Frontend:
Uses React functional components + hooks
Material UI for styling & responsiveness
Admin dashboard supports viewing submission details & uploaded document previews in modals
Basic Auth implemented in API calls for admin routes
Separation of concerns for components encourages easier scaling & testing

How To Use
User fills out the license application form with personal details and uploads documents.
On submission, data is stored in MongoDB, and mock emails are sent to admin and user.
Admin logs in with provided credentials to view all submissions, update status, and preview documents.
Status changes trigger email notifications to the user.


