GoTravels – Transport Management System

A web-based passenger bus booking platform built with React, TypeScript, Vite, and Tailwind CSS.
The system is designed to simplify bus searching, seat selection, passenger bookings, ticket viewing, and transport administration through a user-friendly interface for passengers and administrators.


Epics and User Stories

Epic 1: User Authentication
•	US-01: Passenger Registration — Allow new passengers to create an account.
•	US-02: Passenger Login — Allow registered passengers to log in and access booking features.
•	US-03: Admin Login — Provide administrators with access to the transport management dashboard.


Epic 2: Bus Search and Discovery
•	US-04: Search Buses — Search for buses based on the departure city, destination, and travel date.
•	US-05: View Bus Details — Display available bus services and relevant journey information.
•	US-06: View Seat Availability — Allow passengers to view available seats before booking.


Epic 3: Passenger Booking
•	US-07: Select Seats — Allow passengers to select their preferred seats.
•	US-08: Enter Passenger Details — Collect the passenger information required for a booking.
•	US-09: Confirm Booking — Allow passengers to review and confirm their booking details.
•	US-10: View Tickets and Bookings — Allow passengers to view their booking information and ticket details.


Epic 4: Transport Administration
•	US-11: Admin Dashboard — Provide administrators with an overview of transport and booking information.
•	US-12: Manage Buses and Routes — Allow administrators to manage bus and route information.
•	US-13: Manage Trips and Schedules — Allow administrators to maintain journey schedules, if implemented.


Epic 5: Booking Management
•	US-14: View Passenger Bookings — Allow administrators to review passenger booking details.
•	US-15: Manage Booking Records — Support the management of booking information and transport operations.


Note: These epics and user stories describe the intended project scope. Keep only the stories supported by the features in your current implementation.


Demo Test Accounts

The project may provide separate passenger and administrator login interfaces.

Role	Email	Password
Passenger	Configure according to your application	Configure according to your application
Administrator	Configure according to your application	Configure according to your application


Security note: Add demo credentials only after confirming that the accounts exist and work. Do not publish real passwords or sensitive account details.

How to Run the Project


1. Install the Prerequisites
Install the following software before running the project:
•	Node.js
•	npm
•	Git (optional, for cloning the repository)


2. Download the Project
Open a terminal and run:
git clone https://github.com/HARiii-HARAN/Transport-Management-System.git
cd Transport-Management-System


3. Install Dependencies
Run the following command from the project root directory:
npm install


4. Start the Development Server
Run:
npm run dev
Open the local URL displayed in the terminal. For a standard Vite setup, it is usually:
http://localhost:5173


5. Build the Project
To create a production build, run:
npm run build
The commands above assume that the root package.json defines the corresponding npm scripts.
Project Directory Structure
Transport-Management-System/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts


Technologies Used
•	Frontend: React and TypeScript
•	Development Server and Build Tool: Vite
•	Styling: Tailwind CSS
•	Package Management: npm
•	Version Control: Git and GitHub


Note: This technology list reflects the known project setup. Add other libraries, such as React Router or Lucide React, only if they are present in your project's dependencies.
Deployment

The frontend can be deployed to a static hosting platform that supports Vite applications.
Before deploying, build the application using:
npm run build

The generated production files are normally placed in the dist/ directory.

If the application uses browser-side routing, configure the hosting platform to redirect appropriate routes to index.html.

Important: If your current version uses local demo data or browser storage, describe it as a frontend demonstration rather than claiming that it has a production database or secure server-side authentication. A full deployment with persistent bookings and real authentication may require a backend and database.


Project Objective
The objective of GoTravels is to provide a convenient digital platform for passenger bus reservations. It aims to simplify bus searching, seat selection, booking confirmation, ticket viewing, and transport administration through a responsive and accessible web interface.

