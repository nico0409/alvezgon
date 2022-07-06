import { createContext } from "react";

const CartContext = createContext({
  productsCart: 0,
  addProductCart: () => null,
  getProductsCart: () => null,
  deleteProductCart: () => null,
  removeAllProductsCart: () => null,
});

export default CartContext;
