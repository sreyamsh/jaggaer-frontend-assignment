'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { CartItem as CartItemType } from '@/types/graphql';

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: string) => Promise<void>;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const handleRemove = async (): Promise<void> => {
    try {
      await onRemove(item.id);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  return (
    <Card
      sx={{
        mb: '1rem',
        border: 1,
        borderColor: 'divider',
        boxShadow: 1,
      }}
    >
      <CardContent sx={{ p: '1.5rem' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          {/* Product Details */}
          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              {item.product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {item.product.shortDescription}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Quantity: {item.quantity}
            </Typography>
          </Stack>

          {/* Delete Button */}
          <IconButton
            onClick={handleRemove}
            color="error"
            size="small"
            sx={{
              flexShrink: 0,
              '&:hover': {
                backgroundColor: 'error.light',
                color: 'error.contrastText',
              },
            }}
          >
            <Delete />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CartItem;
