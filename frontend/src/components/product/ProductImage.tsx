'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Skeleton, IconButton, Stack } from '@mui/material';
import { ZoomIn, BrokenImage } from '@mui/icons-material';

interface ProductImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  showZoom?: boolean;
  fallback?: React.ReactNode;
}

function ProductImage({
  src,
  alt,
  width = 400,
  height = 400,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  showZoom = false,
  fallback,
}: ProductImageProps): React.ReactElement {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = (): void => {
    setImageLoading(false);
  };

  const handleImageError = (): void => {
    setImageLoading(false);
    setImageError(true);
  };

  // Default fallback component
  const defaultFallback = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'grey.100',
        color: 'grey.500',
        minHeight: height,
      }}
      spacing={1}
    >
      <BrokenImage sx={{ fontSize: '3rem' }} />
    </Stack>
  );

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 'auto', md: height },
        backgroundColor: 'grey.50',
        borderRadius: 1,
        overflow: 'hidden',
        '&:hover .zoom-button': {
          opacity: 1,
        },
      }}
    >
      {/* Loading Skeleton */}
      {imageLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}

      {/* Error Fallback */}
      {imageError && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
          }}
        >
          {fallback || defaultFallback}
        </Box>
      )}

      {/* Product Image */}
      {src && !imageError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      {/* Zoom Button */}
      {!imageError && showZoom && (
        <IconButton
          className="zoom-button"
          sx={{
            position: 'absolute',
            top: '0.5rem', // 8px in rem
            right: '0.5rem', // 8px in rem
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          <ZoomIn />
        </IconButton>
      )}
    </Box>
  );
}

export default ProductImage;
