import { createContext } from "react";

const AuthContext = createContext({
  auth: undefined,
  login: () => {},
  logout: () => {},
  setReloadUser: () => {},
});

export default AuthContext;
