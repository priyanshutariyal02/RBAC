"use client";
import axios from "axios";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const inputClass =
    "outline-none border w-[20rem] border-gray-400/40 p-2 rounded-md";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill the required field!");
      return;
    }
    try {
      const res = await axios.post("api/auth/login", { email, password });

      if (res.status == 200) {
        setEmail("");
        setPassword("");
        setAuthError("");
        router.push("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="font-bold text-2xl">Login</h1>
      {authError && (
        <p className="bg-red-100 text-red-600 py-2 px-4 rounded-md border border-red-500">
          {authError}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start gap-5"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded-md text-white"
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-600 underline">
          Register
        </Link>
      </p>
      {/* <span>OR</span>
      <Link
        href=""
        className="bg-gray-200 p-2 rounded-md flex items-center justify-center gap-2 duration-200 hover:bg-gray-300 font-semibold"
      >
        <FcGoogle size={30} />
        Continue with Google
      </Link> */}
    </div>
  );
};

export default Login;
