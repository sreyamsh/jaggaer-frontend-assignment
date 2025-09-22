'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  IconButton,
  Badge,
  Stack,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Fade,
} from '@mui/material';
import { ShoppingCart, Add, Remove, Check } from '@mui/icons-material';
import { useCart } from '@/hooks/useCart';

interface AddToCartButtonProps {
  productId: string;
  productName?: string;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  showQuantity?: boolean;
  disabled?: boolean;
  onSuccess?: (item: any) => void;
  onError?: (error: string) => void;
}

export function AddToCartButton({
  productId,
  productName = 'Product',
  disabled = false,
  onSuccess,
  onError,
}: AddToCartButtonProps): React.ReactElement {
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { cart, addToCart, isInCart, getItemQuantity } = useCart();

  // Check if product is already in cart
  const currentItemQuantity = getItemQuantity(productId);
  const isProductInCart = isInCart(productId);

  const handleAddToCart = async (): Promise<void> => {
    try {
      await addToCart(productId, quantity);
      setShowSuccess(true);
      if (onSuccess) {
        onSuccess({ productId, quantity });
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to add item to cart';
      setErrorMessage(message);
      setShowError(true);
      if (onError) {
        onError(message);
      }
    }
  };

  const handleQuantityIncrease = (): void => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityDecrease = (): void => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleCloseSnackbar = (): void => {
    setShowSuccess(false);
    setShowError(false);
    setErrorMessage('');
  };

  // Reset success state after delay
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setQuantity(1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const isLoading = cart.isLoading;
  const isDisabled = disabled || isLoading;

  return (
    <Stack
      direction={'row'}
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      {/* Quantity Controls */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          p: 0.5,
        }}
      >
        <IconButton
          size="small"
          onClick={handleQuantityDecrease}
          disabled={isDisabled || quantity <= 1}
          color="primary"
        >
          <Remove fontSize="small" />
        </IconButton>

        <Typography
          variant="body2"
          sx={{
            minWidth: '1.5rem',
            textAlign: 'center',
            fontWeight: 600,
            px: 1,
          }}
        >
          {quantity}
        </Typography>

        <IconButton
          size="small"
          onClick={handleQuantityIncrease}
          disabled={isDisabled}
          color="primary"
        >
          <Add fontSize="small" />
        </IconButton>
      </Stack>

      {/* Add to Cart Button */}
      <Button
        variant={'contained'}
        size={'large'}
        onClick={handleAddToCart}
        disabled={isDisabled || quantity <= 0}
        sx={{ minWidth: '8rem' }}
      >
        {isLoading ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <CircularProgress size="1rem" color="inherit" />
            <span>Adding...</span>
          </Stack>
        ) : showSuccess ? (
          <Fade in timeout={200}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Check fontSize="small" />
              <span>Added!</span>
            </Stack>
          </Fade>
        ) : isProductInCart ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Badge
              badgeContent={currentItemQuantity}
              color="secondary"
              sx={{ mr: 1 }}
            >
              <ShoppingCart fontSize="small" />
            </Badge>
            <span>Add More</span>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={1}>
            <ShoppingCart fontSize="small" />
            <span>Add to Cart</span>
          </Stack>
        )}
      </Button>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
        >
          {productName} added to cart!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default AddToCartButton;
