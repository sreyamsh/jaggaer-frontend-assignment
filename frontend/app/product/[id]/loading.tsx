import React from 'react';
import { Container, Stack } from '@mui/material';
import { ProductDetailsSkeleton } from '@/components/ui/SkeletonLoader';

export default function Loading(): React.ReactElement {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductDetailsSkeleton />
    </Container>
  );
}
