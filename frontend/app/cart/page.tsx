'use client';

import React from 'react';
import {
  Container,
  Typography,
  Button,
  Stack,
  Box,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { NavigateNext, ShoppingBag } from '@mui/icons-material';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { useCart } from '@/hooks/useCart';
import { useSetPageTitle } from '@/hooks/usePageTitle';
import { useRouter } from 'next/navigation';

function CartPage(): React.ReactElement {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  // Set page title
  useSetPageTitle('Cart');

  const handleClearCart = async (): Promise<void> => {
    try {
      await clearCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  if (cart.isLoading && cart.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>Loading cart...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ pt: '2rem' }}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            component="button"
            variant="body2"
            onClick={() => router.push('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <ShoppingBag sx={{ mr: 0.5, fontSize: 16 }} />
            Products
          </Link>
          <Typography variant="body2" color="text.primary">
            Cart
          </Typography>
        </Breadcrumbs>
      </Container>
      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: '2rem' }}>
        {cart.totalItems === 0 ? (
          <Stack
            alignItems="center"
            spacing={3}
            sx={{ py: '4rem', textAlign: 'center' }}
          >
            <Typography variant="h5" color="text.secondary">
              Your cart is empty
            </Typography>
            <Typography color="text.secondary">
              Add some products to see them here
            </Typography>
            <Button variant="contained" onClick={() => router.push('/')}>
              Continue Shopping
            </Button>
          </Stack>
        ) : (
          <Stack spacing={0}>
            <Button
              variant="text"
              onClick={handleClearCart}
              sx={{
                ml: 'auto',
                mb: 2,
                fontSize: '1rem',
                textDecoration: 'underline',
              }}
            >
              Clear Cart
            </Button>

            {/* Cart Items */}
            {cart.items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onRemove={removeFromCart}
              />
            ))}

            {/* Cart Summary */}
            <CartSummary cart={cart} />
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default function CartPageWithErrorBoundary(): React.ReactElement {
  return (
    <ErrorBoundary>
      <CartPage />
    </ErrorBoundary>
  );
}
