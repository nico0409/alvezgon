import React, { useMemo, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import AuthContext from "../context/AuthContext";
import { setToken, getToken, removeToken } from "../api/token";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContext from "../context/CartContext";
import {
  getProductsCart,
  addProductCart,
  countProductsCart,
  removeProductCart,
  removeAllProductsCart,
} from "../api/cart";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, seTreloadCart] = useState(false);

  const router = useRouter();

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

  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    seTreloadCart(false);
  }, [reloadCart, auth]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductCart(product);
      seTreloadCart(true);
    } else {
      toast.error("Debes iniciar sesion para agregar un producto");
    }
  };
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );
  const removeProduct = (product) => {
    removeProductCart(product);
    seTreloadCart(true);
  };

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: removeAllProductsCart,
    }),
    [totalProductsCart]
  );

  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer>
          position="top-right" autoClose={5000}
          hideProgressBar={true}
          newestOnTop closeOnClick rtl={false}
          pauseOnFocusLoss={false}
          draggable pauseOnHover
        </ToastContainer>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
