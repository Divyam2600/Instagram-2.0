import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doesUsernameExist } from '../services/firebase';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { firebaseApp } from '../lib/firebase';
import * as ROUTES from '../constants/routes';

const db = getFirestore(firebaseApp);
function SignUp() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const isInvalid =
    password === '' ||
    emailAddress === '' ||
    fullName === '' ||
    username === '' ||
    confirmPassword === '';

  const handleSignUp = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExist(username);
    if (error != '') setLoading(false);
    if (password !== confirmPassword) {
      setError('Passwords Donot Match.');
      setPassword('');
      setConfirmPassword('');
    } else if (!/^[A-Za-z ]+$/.test(fullName)) {
      setError('Invalid Name.');
      setFullName('');
    } else if (!usernameExists.length) {
      try {
        const createdUserResult = await createUserWithEmailAndPassword(
          auth,
          emailAddress,
          password
        );
        await updateProfile(createdUserResult.user, {
          displayName: username
        });
        await addDoc(collection(db, 'users'), {
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
          image: '/images/default.png',
          bio: '',
          lastSeen: serverTimestamp()
        });
        navigate(ROUTES.LOGIN);
      } catch (error) {
        if (error.code === 'auth/email-already-exists') {
          setError('Email already exists.');
          setEmailAddress('');
          setPassword('');
          setConfirmPassword('');
        } else if (error.code === 'auth/invalid-email') {
          setError('Invalid Email. Please check.');
          setEmailAddress('');
          setPassword('');
          setConfirmPassword('');
        } else if (error.code === 'auth/invalid-display-name') {
          setError("Invalid Username. Only alphanumeric characters and '_' and '.' are allowed.");
          setUsername('');
        } else if (error.code === 'auth/invalid-password') {
          setError('Invalid Password. Must be atleast 6 characters.');
          setPassword('');
          setConfirmPassword('');
        } else if (error.code === 'auth/weak-password') {
          setError('Choose a stronger password.');
          setPassword('');
          setConfirmPassword('');
        } else {
          setError(error.code);
          setFullName('');
          setEmailAddress('');
          setPassword('');
          setConfirmPassword('');
          setUsername('');
        }
      }
    } else {
      setUsername('');
      setError('Username already exists. Please choose another one');
    }
  };
  useEffect(() => {
    document.title = 'Sign Up - Instagram 2.0';
  }, []);

  return (
    <div className="grid">
      <div>
        <div className="top-grid my-3 p-[24px]">
          <h1 className="-mx-16 flex w-full justify-center ">
            <img src="/images/logo.png" alt="Instagram Logo" className="mt-4 mb-4 w-48 " />
          </h1>
          <h1 className="flex justify-center text-center ">
            <p className="mb-8 text-[22px] font-semibold text-gray-400 ">
              Sign up to see photos and videos from your friends.
            </p>
          </h1>
          {error && <p className="error-text">{error}</p>}
          <form method="POST" onSubmit={handleSignUp}>
            <input
              type="text"
              autoComplete="name"
              required
              aria-label="Enter Your Full Name"
              placeholder="Full Name"
              className="input"
              onChange={({ target }) => {
                setFullName(target.value), setError();
              }}
              value={fullName}
            />
            <input
              type="text"
              autoComplete="username"
              required
              aria-label="Enter Your Username"
              placeholder="Username"
              className="input "
              onChange={({ target }) => {
                setUsername(target.value), setError();
              }}
              value={username}
            />
            <input
              type="email"
              autoComplete="email"
              required
              aria-label="Enter Your Email Address"
              placeholder="Email Address"
              className="input "
              onChange={({ target }) => {
                setEmailAddress(target.value), setError();
              }}
              value={emailAddress}
            />
            <input
              type="password"
              autoComplete="new-password"
              required
              aria-label="Enter Your Password"
              placeholder="Password"
              className="input"
              onChange={({ target }) => {
                setPassword(target.value), setError();
              }}
              value={password}
            />
            <input
              type="password"
              autoComplete="new-password"
              required
              aria-label="Confirm Your Password"
              placeholder="Confirm Password"
              className="input"
              onChange={({ target }) => {
                setConfirmPassword(target.value), setError();
              }}
              value={confirmPassword}
            />
            <button
              className={`submit ${isInvalid && ' bg-opacity-40'}`}
              disabled={isInvalid === true}
              type="submit"
              onClick={() => setLoading(true)}
            >
              {loading ? 'Creating Your Account' : 'Sign Up'}
            </button>
          </form>
        </div>
        <div className=" bottom-grid">
          <p className="mr-2 font-semibold">Already have An Account?</p>
          <Link to={ROUTES.LOGIN} className="font-bold text-blue-500">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
