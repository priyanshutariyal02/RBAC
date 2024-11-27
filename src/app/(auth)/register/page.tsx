"use client";
import Link from "next/link";
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaUserGroup, FaUserLarge } from "react-icons/fa6";
const Page = () => {
  const inputClass =
    "outline-none border w-[20rem] border-gray-400/40 p-2 rounded-md";

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // check password strength
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);

    // check if password match
    if (password !== confirmPass && confirmPass.length > 0) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPass]);

  const checkPasswordStrength = (password: string) => {
    if (!password) return "";
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumRegex =
      /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[@$!%*?&]))[A-Za-z\d@$!%*?&]{6,}$/;

    if (strongRegex.test(password)) return "Strong";
    if (mediumRegex.test(password)) return "Medium";
    return "Weak";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordError) {
      try {
        const res = await axios.post("api/auth/register", {
          username,
          email,
          password,
          role,
        });
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPass("");
        setRole("");
        if (res.status == 200) {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRole = (roleVal: string) => {
    setRole(roleVal);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="font-bold text-2xl">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-5"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className={inputClass}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {password && (
            <p
              className={`text-sm font-semibold ${
                passwordStrength === "Strong"
                  ? "text-green-500"
                  : passwordStrength === "Medium"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              Password Strength: {passwordStrength}
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={inputClass}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-3 border rounded-md p-3">
          <h1 className="text-gray-500/70">Select your role</h1>
          <div className="flex gap-5 items-center justify-center">
            {/* User Role */}
            <div
              onClick={() => handleRole("User")}
              className={`w-[7rem] border px-6 py-4 flex items-center justify-center gap-3 flex-col rounded-md cursor-pointer group transition-all ${
                role === "User"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-gray-100"
              }`}
              aria-label="Select User Role"
            >
              <FaUserLarge
                size={30}
                className="text-gray-700 group-hover:text-blue-600"
              />
              <span className="text-lg font-semibold text-gray-800">User</span>
            </div>

            {/* Moderator Role */}
            <div
              onClick={() => handleRole("Moderator")}
              className={`w-[7rem] border px-6 py-4 flex items-center justify-center gap-3 flex-col rounded-md cursor-pointer group transition-all ${
                role === "Moderator"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-gray-100"
              }`}
              aria-label="Select Moderator Role"
            >
              <FaUserGroup
                size={30}
                className="text-gray-700 group-hover:text-blue-600"
              />
              <span className="text-lg font-semibold text-gray-800">
                Moderator
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          disabled={!!passwordError}
        >
          Submit
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 underline">
          Login
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

export default Page;
