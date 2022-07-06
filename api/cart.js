import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";

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
