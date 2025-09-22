'use client';

import React from 'react';
import { Box, Typography, Button, Alert, Stack } from '@mui/material';
import { ErrorOutline, Refresh, Home } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface ErrorFallbackProps {
  error?: Error | string;
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  onRetry?: () => void;
}

export function ErrorFallback({
  error,
  title = 'Something went wrong',
  message = 'We encountered an unexpected error. Please try again.',
  showHomeButton = true,
  onRetry,
}: ErrorFallbackProps): React.ReactElement {
  const router = useRouter();

  const handleGoHome = (): void => {
    router.push('/');
  };

  const handleRefresh = (): void => {
    window.location.reload();
  };

  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
      spacing={2}
      sx={{ p: 3, textAlign: 'center' }}
    >
      <ErrorOutline color="error" sx={{ fontSize: 48 }} />

      <Typography variant="h6">{title}</Typography>

      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
        {message}
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ maxWidth: 500 }}>
          <Typography variant="caption">{errorMessage}</Typography>
        </Alert>
      )}

      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        {onRetry && (
          <Button variant="contained" startIcon={<Refresh />} onClick={onRetry}>
            Try Again
          </Button>
        )}

        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={handleRefresh}
        >
          Reload Page
        </Button>

        {showHomeButton && (
          <Button variant="text" startIcon={<Home />} onClick={handleGoHome}>
            Go Home
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

// Specialized Error Components
export function NetworkErrorFallback({
  onRetry,
}: {
  onRetry?: () => void;
}): React.ReactElement {
  return (
    <ErrorFallback
      title="Network Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
      onRetry={onRetry}
    />
  );
}

export function NotFoundErrorFallback(): React.ReactElement {
  return (
    <ErrorFallback
      title="Page Not Found"
      message="The page you're looking for doesn't exist or may have been moved."
      showHomeButton={true}
    />
  );
}

export function GraphQLErrorFallback({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}): React.ReactElement {
  return (
    <ErrorFallback
      error={error}
      title="Data Loading Error"
      message="We couldn't load the requested data. Please try again."
      onRetry={onRetry}
    />
  );
}
