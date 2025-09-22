'use client';

import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { GET_CART, GET_CART_COUNT } from '@/lib/graphql/queries/cart';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from '@/lib/graphql/mutations/cart';
import {
  AddToCartMutation,
  AddToCartVariables,
  RemoveFromCartMutation,
  RemoveFromCartVariables,
  ClearCartMutation,
} from '@/types/graphql';

interface UseCartActionsReturn {
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartActions = (): UseCartActionsReturn => {
  const [addToCartMutation] = useMutation<
    AddToCartMutation,
    AddToCartVariables
  >(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART }],
    awaitRefetchQueries: true,
  });

  const [removeFromCartMutation] = useMutation<
    RemoveFromCartMutation,
    RemoveFromCartVariables
  >(REMOVE_FROM_CART, {
    refetchQueries: [{ query: GET_CART }],
    awaitRefetchQueries: true,
  });

  const [clearCartMutation] = useMutation<ClearCartMutation>(CLEAR_CART, {
    refetchQueries: [{ query: GET_CART }],
    awaitRefetchQueries: true,
  });

  const addToCart = useCallback(
    async (productId: string, quantity = 1): Promise<void> => {
      try {
        await addToCartMutation({
          variables: { productId, quantity },
        });
      } catch (error) {
        console.error('Failed to add item to cart:', error);
        throw error;
      }
    },
    [addToCartMutation]
  );

  const removeFromCart = useCallback(
    async (productId: string): Promise<void> => {
      try {
        await removeFromCartMutation({
          variables: { itemId: productId },
        });
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
        throw error;
      }
    },
    [removeFromCartMutation]
  );

  const clearCart = useCallback(async (): Promise<void> => {
    try {
      await clearCartMutation();
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  }, [clearCartMutation]);

  return {
    addToCart,
    removeFromCart,
    clearCart,
  };
};

export default useCartActions;
