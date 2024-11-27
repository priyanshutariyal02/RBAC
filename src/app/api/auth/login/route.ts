import Auth from "@/app/models/auth";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Connection from "@/database/config";

Connection();

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

    const auth = await Auth.findOne({ email });

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
