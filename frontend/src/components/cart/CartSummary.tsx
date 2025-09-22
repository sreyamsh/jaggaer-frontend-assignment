'use client';

import React, { useState } from 'react';
import { Typography, Button, Stack } from '@mui/material';
import { Cart } from '@/types/graphql';
import { PurchaseCompleteModal } from '@/components/ui/PurchaseCompleteModal';
import { useCart } from '@/hooks/useCart';

interface CartSummaryProps {
  cart: {
    items: any[];
    totalItems: number;
    totalAmount: number;
    isLoading: boolean;
    error: string | null;
  };
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
  const { clearCart } = useCart();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Format total in EUR style like the image shows
  const formattedTotal = cart.totalAmount.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  const handleCheckout = async (): Promise<void> => {
    setShowPurchaseModal(true);
  };

  const handleClosePurchaseModal = async (): Promise<void> => {
    try {
      setShowPurchaseModal(false);
      await clearCart();
    } catch (error) {
      console.error('Failed to complete purchase:', error);
    }
  };

  return (
    <Stack
      spacing={3}
      sx={{ mt: '2rem', textAlign: 'center', alignItems: 'center' }}
    >
      {/* Total */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        Total: {formattedTotal}
      </Typography>

      {/* Purchase Button */}
      <Button
        variant="contained"
        size="large"
        onClick={handleCheckout}
        disabled={cart.totalItems === 0 || cart.isLoading}
        sx={{
          py: '1rem',
          px: '2rem',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          width: '20rem',
        }}
      >
        Purchase
      </Button>

      {/* Purchase Complete Modal */}
      <PurchaseCompleteModal
        open={showPurchaseModal}
        onClose={handleClosePurchaseModal}
      />
    </Stack>
  );
};

export default CartSummary;
