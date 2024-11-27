import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Connection from "@/database/config";
// import Admin from "@/app/models/admin";
import jwt from "jsonwebtoken";
import Admin from "@/app/models/admin";

Connection();

// admin login
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password is required!" },
        { status: 401 }
      );
    }

    const auth = await Admin.findOne({ email });

    if (!auth) {
      return NextResponse.json(
        { message: "Invalid email or password!" },
        { status: 400 }
      );
    }

    const validPass = await bcryptjs.compare(password, auth.password);
    if (!validPass) {
      return NextResponse.json(
        { message: "Invalid email or password!" },
        { status: 400 }
      );
    }

    //generate token using jwt
    const tokenData = {
      email: auth.email,
      id: auth._id,
    };

    // create token
    const token = jwt.sign(tokenData, process.env.JWT_SECERET_KEY as string, {
      expiresIn: "1d",
    });
    const res = NextResponse.json(
      { message: "login successfully!" },
      { status: 200 }
    );
    res.cookies.set("token", token, { httpOnly: true });
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};

// admin register only one time used

// export const POST = async (req: NextRequest) => {
//   try {
//     const body = await req.json(); // Parse the request body
//     const { username, email, password } = body;

//     // Validate required fields
//     if (!email || !password) {
//       return NextResponse.json(
//         { message: "Email and Password are required!" },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const auth = await Admin.findOne({ email });
//     if (auth) {
//       return NextResponse.json(
//         { message: "User already exists!" },
//         { status: 400 }
//       );
//     }

//     // Hash the password
//     const salt = await bcryptjs.genSalt(12);
//     const hashedPassword = await bcryptjs.hash(password, salt);

//     // Create a new user
//     const newUser = new Admin({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     // Save the user to the database
//     await newUser.save();

//     return NextResponse.json(
//       { message: "User saved successfully!" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error occurred while processing the request:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// };
