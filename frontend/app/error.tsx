'use client';

import React from 'react';
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
    <ErrorFallback
      error={error}
      title="Application Error"
      message="An unexpected error occurred. Please try refreshing the page."
      onRetry={reset}
    />
  );
}
