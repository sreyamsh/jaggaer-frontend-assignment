import { productService } from '../data/products';
import { cartService } from '../data/cart';

interface Context {
  req?: Request;
  res?: Response;
}

interface QueryArgs {
  id: string;
}

interface AddToCartArgs {
  productId: string;
  quantity: number;
}

interface RemoveFromCartArgs {
  itemId: string;
}

export const resolvers = {
  Query: {
    product: (_: unknown, { id }: QueryArgs, __: Context) =>
      productService.getProductById(id),
    products: (_: unknown, __: unknown, ___: Context) =>
      productService.getProducts(),
    cart: (_: unknown, __: unknown, ___: Context) => cartService.getCart(),
    cartCount: (_: unknown, __: unknown, ___: Context) =>
      cartService.getCartCount(),
  },

  Mutation: {
    addToCart: (
      _: unknown,
      { productId, quantity }: AddToCartArgs,
      __: Context
    ) => {
      return cartService.addToCart(productId, quantity);
    },

    removeFromCart: (
      _: unknown,
      { itemId }: RemoveFromCartArgs,
      __: Context
    ) => {
      return cartService.removeFromCart(itemId);
    },

    clearCart: (_: unknown, __: unknown, ___: Context) => {
      return cartService.clearCart();
    },
  },

  CartItem: {
    product: (cartItem: { productId: string }) =>
      productService.getProductById(cartItem.productId),
  },
};
