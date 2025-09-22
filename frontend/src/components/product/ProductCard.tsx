'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/graphql';
import { useCartActions } from '@/hooks/useCartActions';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps): React.ReactElement {
  const router = useRouter();
  const { addToCart } = useCartActions();

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleShowDetails = (event: React.MouseEvent): void => {
    event.stopPropagation();

    router.push(`/product/${product.id}` as any);
  };

  const handleAddToCart = async (event: React.MouseEvent): Promise<void> => {
    event.stopPropagation();

    setIsAddingToCart(true);
    try {
      await addToCart(product.id, 1); // Add 1 quantity by default
      setShowSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to add item to cart';
      setErrorMessage(message);
      setShowError(true);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleCloseSnackbar = (): void => {
    setShowSuccess(false);
    setShowError(false);
    setErrorMessage('');
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          borderRadius: '0.5rem',
          boxShadow: 2,
          '&:hover': {
            boxShadow: 4,
          },
          transition: 'box-shadow 0.2s ease-in-out',
        }}
      >
        {/* Product Image */}
        <CardMedia
          component="div"
          sx={{
            height: '18rem',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: '#f8f9fa',
            backgroundImage: product.imageUrl
              ? `url(${product.imageUrl})`
              : 'linear-gradient(45deg, #f5f5f5 0%, #e0e0e0 100%)',
          }}
        />

        {/* Product Content */}
        <CardContent
          sx={{
            p: '1.5rem',
            gap: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            {/* Product Name */}
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.3,
              }}
            >
              {product.name}
            </Typography>

            {/* Price */}
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1.25rem',
              }}
            >
              €{product.price.toFixed(2)}
            </Typography>
          </Stack>

          {/* Description and Rating Row */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                flex: 1,
                lineHeight: 1.4,
                minHeight: '2.8125rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.shortDescription}
            </Typography>

            {/* Rating */}
            <Rating
              value={product.rating}
              precision={0.5}
              size="medium"
              readOnly
              sx={{ flexShrink: 0 }}
            />
          </Stack>

          {/* Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
            <Button
              variant="contained"
              onClick={handleShowDetails}
              sx={{
                flex: 1,
                py: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: '0.875rem',
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Show Details
            </Button>

            <Button
              variant="outlined"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              sx={{
                flex: 1,
                py: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: '0.875rem',
                borderColor: 'grey.400',
                color: 'grey.700',
                '&:hover': {
                  backgroundColor: 'grey.50',
                  borderColor: 'grey.600',
                },
              }}
            >
              {isAddingToCart ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircularProgress size={16} />
                  <span>Adding...</span>
                </Stack>
              ) : (
                'Add to Cart'
              )}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
        >
          {product.name} added to cart!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductCard;
