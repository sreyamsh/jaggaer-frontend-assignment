'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface PurchaseCompleteModalProps {
  open: boolean;
  onClose: () => void;
}

export function PurchaseCompleteModal({
  open,
  onClose,
}: PurchaseCompleteModalProps): React.ReactElement {
  const router = useRouter();

  const handleGoHome = (): void => {
    onClose();
    router.push('/');
  };

  const handleClose = (): void => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="purchase-complete-title"
      aria-describedby="purchase-complete-description"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '1rem',
          p: '1rem',
        },
      }}
    >
      <DialogContent sx={{ textAlign: 'center', py: '2rem' }}>
        <Stack spacing={3} alignItems="center">
          {/* Success Icon */}
          <Box
            sx={{
              width: '4rem',
              height: '4rem',
              borderRadius: '50%',
              backgroundColor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: '1rem',
            }}
          >
            <CheckCircle
              sx={{
                fontSize: '2rem',
                color: 'success.main',
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            component="h2"
            id="purchase-complete-title"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: '1rem',
            }}
          >
            Purchase Complete
          </Typography>

          {/* Message */}
          <Typography
            variant="body1"
            id="purchase-complete-description"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.6,
              fontSize: '1rem',
              maxWidth: '90%',
            }}
          >
            Thank you for your purchase! Your order has been successfully
            placed. A confirmation email has been sent to your inbox with the
            details of your order. We hope to serve you again soon!
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: 'center',
          pb: '1rem',
        }}
      >
        <Button
          onClick={handleGoHome}
          variant="contained"
          size="large"
          sx={{
            py: '0.75rem',
            px: '2rem',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Go Back Home
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PurchaseCompleteModal;
