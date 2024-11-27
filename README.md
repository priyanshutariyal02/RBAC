# Role-Based Access Control (RBAC) UI

This project is a **Role-Based Access Control (RBAC) UI** created as part of VRV Security’s Backend Developer Intern Assignment. The application allows users to register, log in, and access their respective roles and functionalities based on their assigned role. It also includes a separate admin login and functionalities.

## Technologies Used
- **Next.js**: Framework for building the front-end and server-side logic.
- **TypeScript**: For type safety and better developer experience.
- **MongoDB**: Database to store user and admin details.
- **JWT (JSON Web Token)**: For user authentication.
- **bcryptjs**: For securely hashing passwords.
- **Middleware**: Used for handling login verification.

## Features

### 1. Splash Page
- The splash page displays options for `Register` and `Login`.

### 2. Register
- Collects the following details from the user:
  - **Username**
  - **Email**
  - **Password**
  - **Confirm Password**
  - **Role**: Users can select between `User` and `Moderator`.
- Password strength indicator:
  - **Weak**: Fails regex validation.
  - **Medium**: Matches `mediumRegex`:
    ```javascript
    /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[@$!%*?&]))[A-Za-z\d@$!%*?&]{6,}$/;
    ```
  - **Strong**: Matches `strongRegex`:
    ```javascript
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    ```
- Verifies if the password and confirm password fields match. If not, displays an error message.
- After successful registration, navigates the user to the login page.

### 3. Login
- Verifies user credentials using JWT and a middleware for login processing.
- After successful login, navigates to the **Home Page**, displaying:
  - **Username**
  - **Email**
  - **Role**
  - **Logout** button.

### 4. Admin Login
- Admin login is accessed by modifying the URL from `http://localhost:3000/` to `http://localhost:3000/adminLogin`.
- Admin details are stored in a separate MongoDB collection (`admin`).
- Admin Home Page displays:
  - **Admin Name**
  - **Email**
  - **Logout** button.

### 5. Database
- MongoDB is used to store the following data:
  - **User Data**:
    - Stored in the `auths` collection.
    - Passwords are securely hashed using `bcryptjs`.
  - **Admin Data**:
    - Stored in the `admin` collection.
    - Validates admin login based on stored credentials.

## How to Run the Project
1. Clone this repository:
   ```bash
   git clone [<repository-link>](https://github.com/priyanshutariyal02/RBAC.git)
  
2. Install dependencies:
   ```bash
   npm install

3. Configure MongoDB:
- Set up a MongoDB database.
- Add the connection string to the environment variables in a .env file:
  ```bash
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECERET_KEY=create_any_seceret_key // for create token

4. Run the development server:
   ```bash
   npm run dev

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


