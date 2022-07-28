import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (error != '') setLoading(false);
    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError("User doesn't exist. Please Sign Up.");
        setEmailAddress('');
        setPassword('');
      } else if (error.code === 'auth/wrong-password') {
        setError('Invalid Password. Please Try Again.');
        setPassword('');
      } else if (error.code === 'auth/too-many-requests') {
        setError(
          'Access to this account has been temporarily disabled due to many failed login attempts. Please Reset your password or Try Again later.'
        );
        setEmailAddress('');
        setPassword('');
      } else {
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    }
  };
  // const handleResetPassword = async (event) => {
  //   event.preventDefault();
  //   if (emailAddress === "") {
  //     setError("Enter your Email Address first");
  //   } else {
  //     try {
  //       await sendPasswordResetEmail(auth, emailAddress);
  //       setError(
  //         "Password Reset Link sent successfully. Please check your email. If not found in Inbox, check your Spam folder"
  //       );
  //     } catch (error) {
  //       if(error.code === "auth/invalid-email"){
  //         setError("Enter a valid Email Address.")
  //       }else if(error.code === "auth/user-not-found"){
  //         setError("User Not Found. Please Sign Up.")
  //       }
  //        else{
  //         setError(error.message);
  //       }
  //     }
  //   }
  //};
  useEffect(() => {
    document.title = 'Login - Instagram 2.0';
  }, []);
  return (
    <div className="grid">
      <div>
        <div className="top-grid -mb-36 p-5 ">
          <h1 className="-mx-16 flex w-full justify-center">
            <img src="/images/logo.png" alt="Instagram Logo" className="mt-4 mb-6 w-48 " />
          </h1>
          <h1 className="flex justify-center text-center ">
            <p className="mb-8 text-[22px] font-semibold text-gray-400 ">Login To Your Account.</p>
          </h1>
          {error && <p className="error-text">{error}</p>}
          <form method="POST" onSubmit={handleLogin}>
            <input
              type="email"
              required
              value={emailAddress}
              aria-label="Enter Your Email Address"
              placeholder="Email Address"
              className="input"
              onChange={({ target }) => {
                setEmailAddress(target.value), setError('');
              }}
            />
            <input
              type="password"
              required
              aria-label="Enter Your Password"
              placeholder="Password"
              value={password}
              className="input"
              onChange={({ target }) => {
                setPassword(target.value), setError('');
              }}
            />
            <button
              className={`submit ${isInvalid && ' bg-opacity-40'}`}
              disabled={isInvalid}
              type="submit"
              onClick={() => setLoading(true)}
            >
              {loading ? 'Logging In' : 'Log In'}
            </button>
            <h1 className="flex justify-center text-center ">
              <button
                // onClick={handleResetPassword}
                className="my-3 font-semibold text-blue-900 decoration-inherit"
              >
                Forgot Password?
              </button>
            </h1>
          </form>
        </div>
        <div className=" bottom-grid mt-40">
          <p className="mr-2 font-semibold">Don't Have An Account?</p>
          <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
