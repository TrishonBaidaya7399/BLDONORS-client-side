# BLDONORS- Blood donation MERN web app
## Live link: https://bldonors.web.app

<a href="https://bldonors.web.app/">
  <img src="https://github.com/TrishonBaidaya7399/TrishonBaidaya7399/blob/main/bldonors%20banner.jpg?raw=true" />
</a>

## Technology Used: 
- React, Node, Express, JWT, HTML, CSS, JS
- MongoDB, Firebase
- Tailwind CSS, DaisyUI, MaterialUI, Tanstack


## Key Features: 
### Introduction
- Purpose: Create a user-friendly platform for blood donation activities.
- Scope: Features include user registration, blood donation requests, donor management, content management, and role-based access control. Built using MERN stack.

### User Roles and Permissions
- Admin 🌐: Access to all features.
- Donor🩸: Register, view/respond to donation requests, and maintain a profile.
- Volunteer 🤝: Create/manage donation requests.

### User Authentication (public)
- Registration:
- Input fields: email, name, avatar, blood group, district, upazila, password, confirm_password.
- Default status: "active," admin can block users.
- Login: Email and password.
### Dashboard (private🔒)
- All layouts with a sidebar, fully responsive.
- Profile Page (/dashboard/profile): Display user info, and update profile (email not editable).
- Donor Dashboard Home Page (/dashboard): Display welcome message. Show 3 recent donation requests. "View My All Requests" button redirects to the My Donation Requests Page.
- My Donation Requests Page (/dashboard/my-donation-requests): Display the user's donation requests in a table with pagination and filtering.
- Create Donation Request Page (/dashboard/create-donation-request): Form with various input fields to create a donation request.
#### Admin Dashboard: 
Same layout as the Donor Dashboard. Display statistics (total users, funding, blood donation requests). Manage users, donation requests, and content.
#### Volunteer Dashboard: 
Same layout as the Admin Dashboard. Limited privileges compared to admin.

### Home Page (public): 
- Navbar with links for donation requests, blog, login, registration, dashboard, and funding.
- Banner with "Join as a donor" and "Search Donors" buttons.
- Featured section (customizable).
- Contact Us section with a form and contact number.
- Footer with relevant links.
- Search Page (public): Form with input fields for blood group, district, upazila, email, and search button. Display donor list based on search criteria.

### Blood Donation Requests (public):
- Display all pending donation requests with details.
- Each request shows the requester's name, location, date, time, and view button.

### Blood Donation Details Page (private🔒)
- Display all information from the creation of a donation request.
- Donate button opens a modal with a form and confirm button.

### Blog Page (public)
- Display all published blogs.
- Implement search functionality.

### Funding Page (private🔒)
- Users can give funding through Stripe payment.
- Display funding history in a tabular format.

### Responsive
- Make the entire website and dashboard responsive.

### JWT
- Implement JWT on login and secure private APIs with JWT.


