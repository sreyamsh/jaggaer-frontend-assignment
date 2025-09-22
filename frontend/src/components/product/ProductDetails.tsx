'use client';

import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Rating,
  Stack,
  Divider,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { NavigateNext, ShoppingBag } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/graphql';
import ProductImageGallery from './ProductImageGallery';
import AddToCartButton from './AddToCartButton';
import { ErrorFallback } from '@/components/ui/ErrorFallback';
import { ProductDetailsSkeleton } from '../ui/SkeletonLoader';

interface ProductDetailsProps {
  product?: Product;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  showBreadcrumbs?: boolean;
}

function ProductDetails({
  product,
  loading = false,
  error,
  onRetry,
  showBreadcrumbs = true,
}: ProductDetailsProps): React.ReactElement {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleBreadcrumbClick = (path: string): void => {
    router.push(path as any);
  };

  // Loading state - show loading if actively loading OR if no product data and no error yet
  if (loading || (!product && !error)) {
    return <ProductDetailsSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <ErrorFallback
        error={error}
        title="Failed to Load Product"
        message="We couldn't load the product details. Please try again."
        onRetry={onRetry}
      />
    );
  }

  // Product not found - only show this if we have completed loading and there's no product
  if (!product) {
    return (
      <ErrorFallback
        title="Product Not Found"
        message="The product you're looking for doesn't exist or may have been removed."
        showHomeButton={true}
      />
    );
  }

  // Product images array (for gallery)
  const productImages = Array(3).fill(product.imageUrl);

  return (
    <Stack spacing={4}>
      {/* Breadcrumbs */}
      {showBreadcrumbs && (
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            component="button"
            variant="body2"
            onClick={() => handleBreadcrumbClick('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <ShoppingBag sx={{ mr: 0.5, fontSize: 16 }} />
            Products
          </Link>
          <Typography variant="body2" color="text.primary">
            {product.name}
          </Typography>
        </Breadcrumbs>
      )}

      {/* Main Product Content */}
      <Grid container spacing={{ xs: 2, md: 6 }}>
        {/* Product Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ProductImageGallery
            images={productImages}
            alt={product.name}
            selectedIndex={selectedImageIndex}
            onImageSelect={setSelectedImageIndex}
          />
        </Grid>

        {/* Product Information */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={{ xs: 1, md: 3 }}>
            {/* Product Name */}
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 600, fontSize: { xs: '2rem', md: '3rem' } }}
            >
              {product.name}
            </Typography>

            {/* Rating */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body1" color="text.secondary">
                ({product.rating} out of 5)
              </Typography>
            </Stack>

            {/* Price */}
            <Typography
              variant="h4"
              color="primary.main"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1.5rem', md: '2.125rem' },
              }}
            >
              €{product.price.toFixed(2)}
            </Typography>

            {/* Short Description */}
            <Typography variant="body1" color="text.secondary">
              {product.shortDescription}
            </Typography>

            <Divider />

            {/* Add to Cart Section */}
            <AddToCartButton
              productId={product.id}
              productName={product.name}
              variant="contained"
              size="large"
              showQuantity={true}
              fullWidth={false}
            />

            <Divider />
          </Stack>
        </Grid>
      </Grid>

      {/* Product Description */}
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Product Description
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
          {product.longDescription}
        </Typography>
      </Stack>

      {/* Product Specifications */}
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Product Details
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Product ID
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {product.id}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Rating
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Rating
                  value={product.rating}
                  precision={0.5}
                  size="small"
                  readOnly
                />
                <Typography variant="body1" fontWeight={500}>
                  {product.rating}/5
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}

export default ProductDetails;
