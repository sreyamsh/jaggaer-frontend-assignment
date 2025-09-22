'use client';

import React from 'react';
import { Container } from '@mui/material';
import { ErrorFallback } from '@/components/ui/ErrorFallback';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps): React.ReactElement {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ErrorFallback
        error={error}
        title="Cart Error"
        message="Something went wrong with your cart. Please try again."
        onRetry={reset}
        showHomeButton={true}
      />
    </Container>
  );
}
