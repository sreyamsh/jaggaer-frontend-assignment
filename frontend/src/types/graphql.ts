// GraphQL Schema Types - Manual definitions
// Based on backend schema at /backend/src/schema.js

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  imageUrl?: string;
  rating: number;
}

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

// Query Types
export interface GetProductsQuery {
  products: Product[];
}

export interface GetProductQuery {
  product: Product | null;
}

export interface GetCartQuery {
  cart: Cart;
}

export interface GetCartCountQuery {
  cartCount: number;
}

// Mutation Types
export interface AddToCartMutation {
  addToCart: CartItem;
}

export interface RemoveFromCartMutation {
  removeFromCart: boolean;
}

export interface ClearCartMutation {
  clearCart: boolean;
}

// Mutation Variables
export interface AddToCartVariables {
  productId: string;
  quantity: number;
}

export interface RemoveFromCartVariables {
  itemId: string;
}

export interface GetProductVariables {
  id: string;
}

// Apollo Client Error Types
export interface GraphQLFormattedError {
  message: string;
  extensions?: {
    code?: string;
    [key: string]: any;
  };
}

export interface ApolloError {
  graphQLErrors: GraphQLFormattedError[];
  networkError?: Error | null;
  message: string;
}
