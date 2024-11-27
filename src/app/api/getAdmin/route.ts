import Connection from "@/database/config";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "@/app/models/admin";
Connection();

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized access!" },
        { status: 401 }
      );
    }

    // verify jwt token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECERET_KEY as string
    ) as { id: string; email: string };

    // fetch user data form mongodb
    const user = await Admin.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    return NextResponse.json(
      { username: user.username, email: user.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
