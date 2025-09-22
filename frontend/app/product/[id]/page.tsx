'use client';

import React from 'react';
import { Container } from '@mui/material';
import { useQuery } from '@apollo/client/react';
import { GET_PRODUCT } from '@/lib/graphql/queries/products';
import { GetProductQuery, GetProductVariables } from '@/types/graphql';
import ProductDetails from '@/components/product/ProductDetails';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { useParams } from 'next/navigation';
import { useSetPageTitle } from '@/hooks/usePageTitle';

function ProductPage(): React.ReactElement {
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery<
    GetProductQuery,
    GetProductVariables
  >(GET_PRODUCT, {
    variables: { id: id as string },
    errorPolicy: 'all',
  });

  const productName = data?.product?.name;
  useSetPageTitle(productName || 'Product');

  const handleRetry = (): void => {
    refetch();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductDetails
        product={data?.product || undefined}
        loading={loading}
        error={error?.message}
        onRetry={handleRetry}
        showBreadcrumbs={true}
      />
    </Container>
  );
}

export default function ProductPageWithErrorBoundary(): React.ReactElement {
  return (
    <ErrorBoundary>
      <ProductPage />
    </ErrorBoundary>
  );
}
