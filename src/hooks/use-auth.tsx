import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState, useContext, useMemo, useEffect, ReactNode } from "react";
import { auth, db } from "../lib/firebase";
import { AuthContext } from "../context/authContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged In..
          setUser(user);
          setLoading(false);
        } else {
          // Not Logged In..
          setUser(null);
          setLoading(true);
          router.push("/login");
        }
        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async (
    email: string,
    password: string,
    username: string,
    fullName: string
  ) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: username,
        });
        setUser(userCredential.user);
        await addDoc(collection(db, "users"), {
          userId: userCredential.user.uid,
          username: username.toLowerCase(),
          name: fullName,
          imageUrl: "/images/default.png",
          following: [],
          followers: [],
          lastSeen: serverTimestamp(),
          email: email.toLowerCase(),
          createdAt: Date.now(),
          isVerified: false,
        });
        router.replace("/");
        setLoading(false);
      })
      .catch((error) => setError(error.code))
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.replace("/");
        setLoading(false);
      })
      .catch((error) => setError(error.code))
      .finally(() => setLoading(false));
  };

  const logOut = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => setError(error.code))
      .finally(() => setLoading(false));
  };

  const memoryValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      loading,
      logOut,
      error,
      setError,
    }),
    [loading, user, error]
  );

  return (
    <AuthContext.Provider value={memoryValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export default useAuth;
