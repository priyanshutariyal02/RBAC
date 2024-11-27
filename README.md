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
![Screenshot 2024-11-27 200107](https://github.com/user-attachments/assets/40feb15c-f23c-4ef2-b1a5-44b91404284a)
- The splash page displays options for `Register` and `Login`.

### 2. Register
![Screenshot 2024-11-27 200131](https://github.com/user-attachments/assets/65243180-887a-4bde-a02d-8729954b25a8)
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
![Screenshot 2024-11-27 162617](https://github.com/user-attachments/assets/c7ed661f-c282-42ec-ae52-243adf268749)
- Verifies user credentials using JWT and a middleware for login processing.
- After successful login, navigates to the **Home Page**, displaying:
  - **Username**
  - **Email**
  - **Role**
  - **Logout** button.

### 4. Admin Login
![Screenshot 2024-11-27 202518](https://github.com/user-attachments/assets/1a8a9728-3e3a-4e79-b7d2-0532e662e53c)
- Admin login is accessed by modifying the URL from `http://localhost:3000/` to `http://localhost:3000/adminLogin`.
- Admin details are stored in a separate MongoDB collection (`admin`).
- Admin Home Page displays:
  - **Admin Name**
  - **Email**
  - **Logout** button.

### 5. Database
- MongoDB is used to store the following data:
  - **User Data**:
    ![Screenshot 2024-11-27 202624](https://github.com/user-attachments/assets/1b68644c-25b8-4034-8633-bf851b8c265e)
    - Stored in the `auths` collection.
    - Passwords are securely hashed using `bcryptjs`.
  - **Admin Data**:
    ![Screenshot 2024-11-27 202611](https://github.com/user-attachments/assets/17527d02-b93d-4dd2-8668-7dca7b56ab58)
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


