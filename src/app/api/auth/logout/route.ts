import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = NextResponse.json(
      { message: "logout successfully!" },
      { status: 200 }
    );
    res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) }); // cookie expire in Date(0) [current date]
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
