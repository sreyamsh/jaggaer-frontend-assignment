'use client';

import { useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_CART } from '@/lib/graphql/queries/cart';
import { useCartActions } from '@/hooks/useCartActions';
import { CartItem, GetCartQuery } from '@/types/graphql';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isLoading: boolean;
  error: string | null;
}

interface UseCartReturn {
  // State
  cart: CartState;

  // Actions
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;

  // Utilities
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
  refreshCart: () => Promise<void>;
}

export const useCart = (): UseCartReturn => {
  // GraphQL query for cart data
  const {
    data: serverCart,
    loading: cartLoading,
    error: cartError,
    refetch: refetchCart,
  } = useQuery<GetCartQuery>(GET_CART, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  // Get cart actions from the dedicated hook
  const { addToCart, removeFromCart, clearCart } = useCartActions();

  // Calculate cart state from server data
  const cart: CartState = {
    items: serverCart?.cart?.items || [],
    totalItems:
      serverCart?.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ||
      0,
    totalAmount:
      serverCart?.cart?.items?.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ) || 0,
    isLoading: cartLoading,
    error: cartError?.message || null,
  };

  // Utility functions
  const isInCart = useCallback(
    (productId: string): boolean => {
      return cart.items.some((item) => item.product.id === productId);
    },
    [cart.items]
  );

  const getItemQuantity = useCallback(
    (productId: string): number => {
      const item = cart.items.find((item) => item.product.id === productId);
      return item?.quantity || 0;
    },
    [cart.items]
  );

  // Refresh cart from server
  const refreshCart = useCallback(async (): Promise<void> => {
    try {
      await refetchCart();
    } catch (error) {
      console.error('Failed to refresh cart:', error);
      throw error;
    }
  }, [refetchCart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    getItemQuantity,
    refreshCart,
  };
};

export default useCart;
