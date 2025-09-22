'use client';

import React from 'react';
import { Grid, Typography, Stack, Alert, Button } from '@mui/material';
import { Refresh, ShoppingBag } from '@mui/icons-material';
import { Product } from '@/types/graphql';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from '@/components/ui/SkeletonLoader';

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  spacing?: number;
  showEmptyState?: boolean;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
}

function ProductGrid({
  products,
  loading = false,
  error,
  onRetry,
  spacing = 3,
  showEmptyState = true,
  emptyStateTitle = 'No Products Found',
  emptyStateMessage = "We couldn't find any products to display.",
}: ProductGridProps): React.ReactElement {
  // Loading state
  if (loading) {
    return <ProductGridSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <Stack alignItems="center" spacing={3} sx={{ py: 6 }}>
        <Alert severity="error" sx={{ maxWidth: '31.25rem' }}>
          <Typography variant="h6" gutterBottom>
            Failed to Load Products
          </Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>

        {onRetry && (
          <Button variant="contained" startIcon={<Refresh />} onClick={onRetry}>
            Try Again
          </Button>
        )}
      </Stack>
    );
  }

  // Empty state
  if (products.length === 0 && showEmptyState) {
    return (
      <Stack
        alignItems="center"
        spacing={3}
        sx={{ py: 8, textAlign: 'center' }}
      >
        <ShoppingBag sx={{ fontSize: '4rem', color: 'grey.400' }} />

        <Stack spacing={1}>
          <Typography variant="h5" color="text.primary">
            {emptyStateTitle}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: '25rem' }}
          >
            {emptyStateMessage}
          </Typography>
        </Stack>

        {onRetry && (
          <Button variant="outlined" startIcon={<Refresh />} onClick={onRetry}>
            Refresh Products
          </Button>
        )}
      </Stack>
    );
  }

  // Products grid
  return (
    <Grid container spacing={spacing}>
      {products.map((product) => (
        <Grid
          key={product.id}
          size={{
            xs: 12, // 1 per row on mobile
            sm: 12, // 1 per row on small tablets
            md: 6, // 2 per row on desktop
            lg: 6, // 2 per row on large desktop
            xl: 6, // 2 per row on extra large desktop
          }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGrid;
