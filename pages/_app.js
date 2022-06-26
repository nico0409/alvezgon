import React, { useMemo, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import AuthContext from "../context/AuthContext";
import { setToken, getToken, removeToken } from "../api/token";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        setAuth(null);
        toast.error("tu session ha expirado");
        removeToken();
      } else {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      }
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      iduser: jwtDecode(token).id,
    });
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => {},
      setReloadUser: () => {},
    }),
    [auth]
  );

  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer>
        position="top-right" autoClose={5000}
        hideProgressBar={true}
        newestOnTop closeOnClick rtl={false}
        pauseOnFocusLoss={false}
        draggable pauseOnHover
      </ToastContainer>
    </AuthContext.Provider>
  );
}
