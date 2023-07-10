import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import useAuth from "../src/hooks/use-auth";
import { ErrorBy } from "../typings.d";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Head from "next/head";

const login = () => {
  const router = useRouter();
  const { signIn, error, setError } = useAuth();
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [errorBy, setErrorBy] = useState<ErrorBy>();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isInvalid =
    email === "" ||
    password === "" ||
    password.length < 4 ||
    password.length > 60 ||
    !emailFormat.test(email);
  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (isInvalid) {
      if (password.length < 4 || password.length > 60) {
        setErrors("Your password must contain between 4 and 60 characters.");
        setErrorBy(ErrorBy.PASSWORD);
        setPassword("");
      } else if (!emailFormat.test(email)) {
        setErrors("Please enter a valid email address.");
        setErrorBy(ErrorBy.EMAIL);
        setEmail("");
      }
      setLoading(false);
    } else signIn(email, password);
  };
  const handleError = () => {
    if (error === "auth/user-not-found") {
      setErrors("User doesn't exist. Please Sign Up.");
      setErrorBy(ErrorBy.FORM);
      setEmail("");
      setPassword("");
    } else if (error === "auth/wrong-password") {
      setErrors("Invalid Password. Please Try Again.");
      setErrorBy(ErrorBy.PASSWORD);
      setPassword("");
    } else if (error === "auth/too-many-requests") {
      setErrors(
        "Access to this account has been temporarily disabled due to many failed login attempts. Please Reset your password or Try Again later."
      );
      setErrorBy(ErrorBy.FORM);
      setEmail("");
      setPassword("");
    } else if (error) {
      setErrors(error);
      setErrorBy(ErrorBy.FORM);
      setEmail("");
      setPassword("");
    }
    setLoading(false);
  };
  useEffect(handleError, [error, errorBy]);
  return (
    <div className="form">
      <Head>
        <title>Login - Instagram 2.0</title>
      </Head>
      <div className="top-section">
        <Image
          src={"/images/logo.png"}
          alt="Instagram Logo"
          width={192}
          height={54}
        />
        <h1 className="text-[22px] font-semibold text-gray-400">
          Login To Your Account
        </h1>
        {errors && <p className="error-text">{errors}</p>}
        <form onSubmit={handleLogin} method="POST" className="w-full">
          <div
            className={`input group ${
              (errorBy === ErrorBy.EMAIL || errorBy === ErrorBy.FORM) &&
              "border-red-400"
            }`}
          >
            <input
              type="email"
              required
              autoComplete="email"
              placeholder=" "
              value={email}
              aria-label="Enter Your Email Address"
              className="peer"
              onChange={({ target }) => {
                setEmail(target.value),
                  setError(""),
                  setErrors(""),
                  setErrorBy(undefined);
              }}
            />
            <label className="floating-label">Email Address</label>
          </div>
          <div
            className={`input group ${
              (errorBy === ErrorBy.PASSWORD || errorBy === ErrorBy.FORM) &&
              "border-red-400"
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              aria-label="Enter Your Password"
              placeholder=" "
              value={password}
              className="peer"
              onChange={({ target }) => {
                setPassword(target.value),
                  setError(""),
                  setErrors(""),
                  setErrorBy(undefined);
              }}
              onPaste={(e) => e.preventDefault()}
            />
            <label className="floating-label">Password</label>
            <span
              className="animate-small absolute right-3 bottom-2.5 cursor-pointer text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-6 w-6" />
              ) : (
                <EyeIcon className="h-6 w-6" />
              )}
            </span>
          </div>
          <button
            className={`submit ${isInvalid && " bg-opacity-40"}`}
            disabled={isInvalid}
            type="submit"
            onClick={() => setLoading(true)}
          >
            {loading ? "Logging In" : "Log In"}
          </button>
        </form>
        <button className="font-semibold text-blue-900 decoration-inherit">
          Forgot Password?
        </button>
      </div>
      <div className="bottom-section">
        Don't Have An Account?
        <button
          className="font-bold text-blue-500"
          onClick={() => {
            router.push("/signup"), setError("");
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default login;
