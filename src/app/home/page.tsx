"use client";

import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  username: string;
  email: string;
  role: string;
}

const page = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState("");

  const router = useRouter();

  // get user data
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/getUser", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const message = await res.json();
        setError(message);
        return;
      }
      const data = await res.json();
      console.log(data);
      setUser(data);
    };
    fetchUser();
  }, []);

  // logout
  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();
    //Api call
    const res = await axios.get("api/auth/logout");
    if (res.status == 200) {
      router.push("/");
    }
  };
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-3">
      <h1 className="text-5xl font-bold">
        Welcome, <span className="text-blue-600">{user.username}</span>!
      </h1>
      <p className="font-semibold text-xl">Email: {user.email}</p>
      <p className="font-semibold text-xl">Role: {user.role}</p>
      <button
        type="button"
        onClick={handleLogout}
        className="bg-red-500 py-2 px-4 rounded-md text-white font-semibold hover:bg-red-800 duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default page;
