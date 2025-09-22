'use client';

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS } from '@/lib/graphql/queries/products';
import { GetProductsQuery } from '@/types/graphql';
import FeaturedProductGrid from '@/components/product/FeaturedProductGrid';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { useSetPageTitle } from '@/hooks/usePageTitle';

function HomePage(): React.ReactElement {
  useSetPageTitle('Products');

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useQuery<GetProductsQuery>(GET_PRODUCTS);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 0, md: 4 } }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
          }}
        >
          Welcome to Jaggaer Store
        </Typography>
      </Box>

      {/* Featured Products Section */}
      <FeaturedProductGrid
        products={productsData?.products || []}
        loading={productsLoading}
        error={productsError?.message}
        title="Featured Products"
        subtitle="Discover our handpicked selection of amazing products"
        maxItems={8}
        showSearch={true}
        showFilters={true}
        showResultCount={true}
        onRetry={() => window.location.reload()}
      />
    </Container>
  );
}

export default function Home(): React.ReactElement {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}
