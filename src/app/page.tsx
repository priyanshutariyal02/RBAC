import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-4xl font-bold text-[#1f1f1f]">
        Let&apos;s get started!
      </h1>
      <div className="flex gap-3 justify-center">
        <Link
          href="/register"
          className="border-2 w-20 text-center font-semibold border-[#1f1f1f] rounded-md p-2 text-[#1f1f1f] hover:text-neutral-700 hover:border-neutral-700 duration-200"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="rounded-md p-2 font-semibold w-20 text-center bg-[#1f1f1f] text-white duration-200 hover:bg-neutral-700"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Page;
