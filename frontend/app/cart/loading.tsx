import React from 'react';
import { Container } from '@mui/material';
import { CartPageSkeleton } from '@/components/ui/SkeletonLoader';

export default function Loading(): React.ReactElement {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CartPageSkeleton />
    </Container>
  );
}
