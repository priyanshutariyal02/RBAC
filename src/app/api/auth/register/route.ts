import Auth from "@/app/models/auth";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Connection from "@/database/config";

Connection();

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Parse the request body
    const { username, email, password, role } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and Password are required!" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const auth = await Auth.findOne({ email });
    if (auth) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new Auth({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    return NextResponse.json(
      { message: "User saved successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred while processing the request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
