'use client';

import React from 'react';
import { Box, Card, CardContent, Skeleton, Grid } from '@mui/material';

interface SkeletonLoaderProps {
  variant?: 'rectangular' | 'rounded' | 'circular' | 'text';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
}

export function SkeletonLoader({
  variant = 'rectangular',
  width = '100%',
  height = 40,
  animation = 'wave',
}: SkeletonLoaderProps): React.ReactElement {
  return (
    <Skeleton
      variant={variant}
      width={width}
      height={height}
      animation={animation}
    />
  );
}

// Product Card Skeleton
export function ProductCardSkeleton(): React.ReactElement {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" height={32} width="80%" />
        <Skeleton variant="text" height={20} width="60%" sx={{ mt: 1 }} />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Skeleton variant="text" height={24} width="40%" />
          <Skeleton variant="rectangular" height={36} width={100} />
        </Box>
      </CardContent>
    </Card>
  );
}

// Product Grid Skeleton
export function ProductGridSkeleton(): React.ReactElement {
  return (
    <Box className={'skeleton-grid'}>
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </Box>
  );
}

// Product Details Skeleton
export function ProductDetailsSkeleton(): React.ReactElement {
  return (
    <Box>
      <Grid container spacing={4}>
        {/* Image Skeleton */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>

        {/* Details Skeleton */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="text" height={48} width="80%" />
          <Skeleton variant="text" height={24} width="60%" sx={{ mt: 2 }} />
          <Skeleton variant="text" height={32} width="40%" sx={{ mt: 2 }} />

          <Box mt={3}>
            <Skeleton variant="text" height={20} width="100%" />
            <Skeleton variant="text" height={20} width="100%" />
            <Skeleton variant="text" height={20} width="80%" />
          </Box>

          <Box mt={4} display="flex" gap={2}>
            <Skeleton variant="rectangular" height={48} width={120} />
            <Skeleton variant="rectangular" height={48} width={150} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

// Cart Item Skeleton
export function CartItemSkeleton(): React.ReactElement {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Skeleton variant="rectangular" width={80} height={80} />
          <Box flex={1}>
            <Skeleton variant="text" height={24} width="60%" />
            <Skeleton variant="text" height={20} width="40%" sx={{ mt: 1 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Skeleton variant="rectangular" height={32} width={100} />
              <Skeleton variant="text" height={20} width="60px" />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// Cart Page Skeleton
export function CartPageSkeleton(): React.ReactElement {
  return (
    <Box>
      <Skeleton variant="text" height={48} width="200px" sx={{ mb: 3 }} />
      {Array.from({ length: 3 }).map((_, index) => (
        <CartItemSkeleton key={index} />
      ))}
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Skeleton variant="text" height={32} width="150px" />
        <Skeleton variant="rectangular" height={48} width={120} />
      </Box>
    </Box>
  );
}

// Header Skeleton
export function HeaderSkeleton(): React.ReactElement {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Skeleton variant="text" height={32} width={150} />
      <Box display="flex" gap={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    </Box>
  );
}
