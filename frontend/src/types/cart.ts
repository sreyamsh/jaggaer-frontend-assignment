import { Product } from './product';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  count: number;
  total: number;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isLoading: boolean;
  error: string | null;
}
