import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const getProductsCart = () => {
  const cart = localStorage.getItem(CART);

  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
};

export const addProductCart = (idProduct) => {
  const products = getProductsCart();
  if (!products) {
    localStorage.setItem(CART, idProduct);
    toast.success("Producto agregado al carrito");
  } else {
    const productFound = includes(products, idProduct);
    if (productFound) {
      toast.warning("El producto ya esta en el carrito");
    } else {
      products.push(idProduct);
      localStorage.setItem(CART, products);
      toast.success("Producto agregado al carrito");
    }
  }
};

export const countProductsCart = () => {
  const cart = getProductsCart();

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
};

export const removeProductCart = (idProduct) => {
  const products = getProductsCart();
  if (!products) {
    toast.error("No hay productos en el carrito");
  } else {
    const productFound = includes(products, idProduct);
    if (productFound) {
      remove(products, (product) => product === idProduct);
      localStorage.setItem(CART, products);
      toast.success("Producto eliminado del carrito");
    } else {
      toast.error("El producto no esta en el carrito");
    }
  }
};

export async function paymentCartApi(token, products, idUser, address, logout) {
  try {
    const addressShiping = address;
    delete addressShiping.users_permissions_user;
    delete addressShiping.createdAt;

    const url = `${BASE_PATH}/oreders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        addressShiping,
      }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function removeAllProductsCart() {
  localStorage.removeItem(CART);
}
