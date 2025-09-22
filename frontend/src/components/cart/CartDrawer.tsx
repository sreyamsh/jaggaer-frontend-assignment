'use client';

import React from 'react';
import {
  Drawer,
  Typography,
  Button,
  Stack,
  Divider,
  IconButton,
  Alert,
  Fade,
  Slide,
  Box,
  Badge,
} from '@mui/material';
import {
  Close,
  ShoppingCart,
  ShoppingBag,
  ArrowForward,
  Payment,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { CartItem } from './CartItem';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: {
    items: any[];
    totalItems: number;
    totalAmount: number;
    isLoading: boolean;
    error: string | null;
  };
  onRemoveItem: (productId: string) => Promise<void>;
  onClearCart: () => Promise<void>;
  maxItems?: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
  maxItems = 5,
}) => {
  const router = useRouter();

  const formattedTotal = cart.totalAmount.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  // Handle navigation to cart page
  const handleGoToCart = (): void => {
    onClose();
    router.push('/cart' as any);
  };

  // Handle checkout
  const handleCheckout = (): void => {
    onClose();
    // In a real app, this would navigate to checkout
    alert('Checkout functionality would be implemented here!');
  };

  // Calculate if there are more items than displayed
  const displayedItems = cart.items.slice(0, maxItems);
  const remainingItems = cart.totalItems - displayedItems.length;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100vw', sm: '26rem' },
          maxWidth: '100vw',
        },
      }}
      transitionDuration={300}
      SlideProps={{
        direction: 'left',
      }}
    >
      <Stack sx={{ height: '100vh' }}>
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Badge badgeContent={cart.totalItems} color="primary">
              <ShoppingCart color="primary" />
            </Badge>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Shopping Cart
            </Typography>
          </Stack>

          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          {cart.isLoading ? (
            // Loading State
            <Stack spacing={2} sx={{ p: 2 }}>
              {Array.from({ length: 3 }).map((_, index) => (
                <CartItem
                  key={`loading-${index}`}
                  item={{} as any}
                  onRemove={() => Promise.resolve()}
                />
              ))}
            </Stack>
          ) : cart.error ? (
            // Error State
            <Stack sx={{ p: 2 }}>
              <Alert severity="error" variant="outlined">
                <Typography variant="body2">{cart.error}</Typography>
              </Alert>
            </Stack>
          ) : cart.totalItems === 0 ? (
            // Empty State
            <Fade in timeout={300}>
              <Stack
                alignItems="center"
                spacing={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBag sx={{ fontSize: '4rem', color: 'grey.400' }} />
                <Stack spacing={1}>
                  <Typography variant="h6" color="text.primary">
                    Your cart is empty
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add some amazing products to get started!
                  </Typography>
                </Stack>
                <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
                  Continue Shopping
                </Button>
              </Stack>
            </Fade>
          ) : (
            // Cart Items
            <Stack sx={{ height: '100%' }}>
              {/* Items List */}
              <Stack
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 2,
                  pb: 1,
                }}
                spacing={1}
              >
                {displayedItems.map((item, index) => (
                  <Slide
                    key={item.product.id}
                    direction="left"
                    in={open}
                    timeout={300 + index * 100}
                  >
                    <div>
                      <CartItem item={item} onRemove={onRemoveItem} />
                    </div>
                  </Slide>
                ))}

                {/* Show More Items Indicator */}
                {remainingItems > 0 && (
                  <Alert
                    severity="info"
                    variant="outlined"
                    sx={{
                      mt: 1,
                      alignItems: 'center',
                      '& .MuiAlert-icon': { height: 'fit-content' },
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="body2">
                        +{remainingItems} more item
                        {remainingItems !== 1 ? 's' : ''} in cart
                      </Typography>
                      <Button size="small" onClick={handleGoToCart}>
                        View All
                      </Button>
                    </Stack>
                  </Alert>
                )}
              </Stack>

              <Divider />

              {/* Quick Summary */}
              <Stack sx={{ p: 2, backgroundColor: 'grey.50' }} spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Total ({cart.totalItems} items)
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600 }}
                    color="primary.main"
                  >
                    {formattedTotal}
                  </Typography>
                </Stack>

                {/* Action Buttons */}
                <Stack spacing={1}>
                  <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    endIcon={<ArrowForward />}
                    onClick={handleGoToCart}
                    sx={{ py: 1 }}
                  >
                    View Full Cart
                  </Button>
                </Stack>

                {/* Security Notice */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign="center"
                  sx={{ mt: 1 }}
                >
                  🔒 Secure checkout with SSL encryption
                </Typography>
              </Stack>
            </Stack>
          )}
        </Box>
      </Stack>
    </Drawer>
  );
};

export default CartDrawer;
