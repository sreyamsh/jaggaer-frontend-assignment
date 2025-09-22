'use client';

import React from 'react';
import { Typography, Button, Alert, Stack } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    this.setState({ error, errorInfo });
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render(): React.ReactNode {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

// Default Error Fallback Component
function DefaultErrorFallback({
  error,
  resetError,
}: ErrorFallbackProps): React.ReactElement {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
      spacing={2}
      sx={{ p: 3, textAlign: 'center' }}
    >
      <ErrorOutline color="error" sx={{ fontSize: 48 }} />

      <Typography variant="h6">Something went wrong</Typography>

      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
        We encountered an unexpected error. Please try refreshing the page or
        contact support if the problem persists.
      </Typography>

      <Alert severity="error" sx={{ maxWidth: 500 }}>
        <Typography variant="caption">Error: {error.message}</Typography>
      </Alert>

      <Button variant="contained" startIcon={<Refresh />} onClick={resetError}>
        Try Again
      </Button>

      <Button
        variant="text"
        onClick={() => window.location.reload()}
        size="small"
      >
        Reload Page
      </Button>
    </Stack>
  );
}

export default ErrorBoundary;
export type { ErrorFallbackProps };
