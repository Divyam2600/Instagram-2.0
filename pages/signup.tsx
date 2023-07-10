import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import useAuth from "../src/hooks/use-auth";
import { ErrorBy } from "../typings.d";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { doesUsernameExist } from "../src/services/firebase";
import Head from "next/head";

const signUp = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { signUp, error, setError } = useAuth();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState("");
  const [errorBy, setErrorBy] = useState<ErrorBy>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const fullNameFormat = /^[A-Za-z ]+$/;
  const userNameFormat = /^[A-Za-z0-9_.]+$/;
  const isInvalid =
    email === "" ||
    password === "" ||
    confirmPassword === "" ||
    username === "" ||
    fullName === "" ||
    password.length < 4 ||
    password.length > 60 ||
    !emailFormat.test(email) ||
    confirmPassword !== password ||
    !fullNameFormat.test(fullName) ||
    username.length > 10 ||
    !userNameFormat.test(username);
  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExist(username);
    if (isInvalid) {
      if (password.length < 4 || password.length > 60) {
        setErrors("Your password must contain between 4 and 60 characters.");
        setErrorBy(ErrorBy.PASSWORD);
        setPassword("");
        setConfirmPassword("");
      } else if (!emailFormat.test(email)) {
        setErrors("Please enter a valid email address.");
        setErrorBy(ErrorBy.EMAIL);
        setEmail("");
      } else if (confirmPassword !== password) {
        setErrors("Passwords Donot Match. Please Check.");
        setErrorBy(ErrorBy.PASSWORD);
        setPassword("");
        setConfirmPassword("");
      } else if (!fullNameFormat.test(fullName)) {
        setErrors("Invalid Name.");
        setFullName("");
        setErrorBy(ErrorBy.FULLNAME);
      } else if (username.length > 10) {
        setErrors("Username can be maximum of 10 characters.");
        setUsername("");
        setErrorBy(ErrorBy.USERNAME);
      } else if (!userNameFormat.test(username)) {
        setErrors(
          "Invalid Username. Only alphanumeric characters and '_' and '.' are allowed."
        );
        setUsername("");
        setErrorBy(ErrorBy.USERNAME);
      }
      setLoading(false);
    } else if (usernameExists.length) {
      setUsername("");
      setLoading(false);
      setErrorBy(ErrorBy.USERNAME);
      setErrors("Username already exists. Please choose another one");
    } else signUp(email, password, username, fullName);
  };
  const handleError = () => {
    if (
      error === "auth/email-already-exists" ||
      error === "auth/email-already-in-use"
    ) {
      setErrors("Email already exists.");
      setErrorBy(ErrorBy.EMAIL);
      setEmail("");
    } else if (error === "auth/invalid-email") {
      setError("Invalid Email. Please check.");
      setEmail("");
      setErrorBy(ErrorBy.EMAIL);
    } else if (error === "auth/invalid-password") {
      setErrors("Invalid Password. Please Try Again.");
      setErrorBy(ErrorBy.PASSWORD);
      setPassword("");
      setConfirmPassword("");
    } else if (error === "auth/weak-password") {
      setError("Choose a stronger password.");
      setErrorBy(ErrorBy.PASSWORD);
      setPassword("");
      setConfirmPassword("");
    } else if (error) {
      setErrors(error);
      setErrorBy(ErrorBy.FORM);
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");
    }
    setLoading(false);
  };
  useEffect(handleError, [error, errorBy]);
  return (
    <div className="form">
      <Head>
        <title>Sign Up - Instagram 2.0</title>
      </Head>
      <div className="top-section">
        <Image
          src={"/images/logo.png"}
          alt="Instagram Logo"
          width={192}
          height={54}
        />
        <h1 className="text-center text-[22px] font-semibold text-gray-400">
          Sign up to see the Posts from your friends.
        </h1>
        {errors && <p className="error-text">{errors}</p>}
        <form onSubmit={handleSignUp} method="POST" className="w-full">
          <div
            className={`input group ${
              (errorBy === ErrorBy.FULLNAME || errorBy === ErrorBy.FORM) &&
              "border-red-400"
            }`}
          >
            <input
              type="text"
              autoComplete="name"
              required
              placeholder=" "
              value={fullName}
              aria-label="Enter Your Full Name"
              className="peer"
              onChange={({ target }) => {
                setFullName(target.value),
                  setError(""),
                  setErrors(""),
                  setErrorBy(undefined);
              }}
            />
            <label className="floating-label">Full Name</label>
          </div>
          <div
            className={`input group ${
              (errorBy === ErrorBy.USERNAME || errorBy === ErrorBy.FORM) &&
              "border-red-400"
            }`}
          >
            <input
              type="text"
              autoComplete="off"
              required
              placeholder=" "
              value={username}
              aria-label="Enter Your Username"
              className="peer"
              onChange={({ target }) => {
                setUsername(target.value),
                  setError(""),
                  setErrors(""),
                  setErrorBy(undefined);
              }}
            />
            <label className="floating-label">Username</label>
          </div>
          <div
            className={`input group ${
              (errorBy === ErrorBy.EMAIL || errorBy === ErrorBy.FORM) &&
              "border-red-400"
            }`}
          >
            <input
              type="email"
              autoComplete="email"
              required
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
              autoComplete="new-password"
              required
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
          <div
            className={`input group ${
              (errorBy === ErrorBy.EMAIL || errorBy === ErrorBy.FORM) &&
              "border-red-400"
            }`}
          >
            <input
              type="text"
              autoComplete="new-password"
              required
              placeholder=" "
              value={confirmPassword}
              aria-label="Confirm Password"
              className="peer"
              onChange={({ target }) => {
                setConfirmPassword(target.value),
                  setError(""),
                  setErrors(""),
                  setErrorBy(undefined);
              }}
              onPaste={(e) => e.preventDefault()}
            />
            <label className="floating-label">Confirm Password</label>
          </div>
          <button
            className="submit"
            type="submit"
            onClick={() => setLoading(true)}
          >
            {loading ? "Creating Your Account" : "Sign Up"}
          </button>
        </form>
      </div>
      <div className="bottom-section">
        Already have An Account?
        <button
          className="font-bold text-blue-500"
          onClick={() => {
            router.push("/login"), setError("");
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default signUp;
