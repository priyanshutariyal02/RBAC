"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

interface AdminData {
  username: string;
  email: string;
}

const Page = () => {
  const router = useRouter();
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAdmin = async () => {
      const res = await fetch("api/getAdmin", {
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
      setAdminData(data);
    };
    fetchAdmin();
  }, []);

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

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-3">
      <h1 className="text-5xl font-bold">
        Welcome, <span className="text-blue-600">{adminData.username}</span>!
      </h1>
      <p className="font-semibold text-xl">Email: {adminData.email}</p>
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

export default Page;
