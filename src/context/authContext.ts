import { createContext } from "react";
import { Auth } from "../../typings.d";

export const AuthContext = createContext<Auth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: "",
  setError: () => {},
  loading: false,
});
