import { Box, Stack } from '@mui/material';
import ImageDialog from './ImageDialog';
import { useState } from 'react';
import ProductImage from './ProductImage';

// Gallery version with multiple images
interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  selectedIndex?: number;
  onImageSelect?: (index: number) => void;
}

function ProductImageGallery({
  images,
  alt,
  selectedIndex = 0,
  onImageSelect,
}: ProductImageGalleryProps): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageSelect = (index: number): void => {
    setCurrentIndex(index);
    if (onImageSelect) {
      onImageSelect(index);
    }
  };

  const handleImageZoom = (): void => {
    setDialogOpen(true);
  };

  const handleCloseDialog = (): void => {
    setDialogOpen(false);
  };

  if (images.length === 0) {
    return <ProductImage alt={alt} width={500} height={500} />;
  }

  return (
    <>
      <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={2}>
        {/* Thumbnail Images - Left side */}
        {images.length > 1 && (
          <Stack
            direction={{ xs: 'row', md: 'column' }}
            spacing={1}
            sx={{ flexShrink: 0 }}
          >
            {images.map((image, index) => (
              <Box
                key={index}
                onClick={() => handleImageSelect(index)}
                sx={{
                  width: '5rem', // 80px in rem
                  height: '5rem', // 80px in rem
                  cursor: 'pointer',
                  border: 2,
                  borderColor:
                    index === currentIndex ? 'primary.main' : 'grey.300',
                  borderRadius: 1,
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <ProductImage
                  src={image}
                  alt={`${alt} - Thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                />
              </Box>
            ))}
          </Stack>
        )}

        {/* Main Image - Right side */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            cursor: 'pointer',
          }}
          onClick={handleImageZoom}
        >
          <ProductImage
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            width={500}
            height={500}
            priority={currentIndex === 0}
            showZoom={true}
          />
        </Box>
      </Stack>

      {/* Full-screen Image Dialog */}
      <ImageDialog
        images={images}
        alt={alt}
        open={dialogOpen}
        onClose={handleCloseDialog}
        selectedIndex={currentIndex}
      />
    </>
  );
}

export default ProductImageGallery;
