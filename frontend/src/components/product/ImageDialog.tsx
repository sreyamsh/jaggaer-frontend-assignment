import { Dialog, DialogContent, IconButton } from '@mui/material';
import { Close, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useState } from 'react';
import Image from 'next/image';
import { Box, Typography, Stack } from '@mui/material';

// Shared styles
const navButtonStyles = {
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  zIndex: 1,
};

const counterStyles = {
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  px: 2,
  py: 1,
  borderRadius: 1,
};

// Image Dialog for full-screen viewing
interface ImageDialogProps {
  images: string[];
  alt: string;
  open: boolean;
  onClose: () => void;
  selectedIndex?: number;
}

function ImageDialog({
  images,
  alt,
  open,
  onClose,
  selectedIndex = 0,
}: ImageDialogProps): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const handlePrevious = (): void => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (): void => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
        },
      }}
    >
      <DialogContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          p: 0,
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            zIndex: 1,
          }}
        >
          <Close />
        </IconButton>

        {/* Navigation Controls */}
        {images.length > 1 && (
          <>
            {/* Desktop - Side Navigation */}
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: 'absolute',
                left: '1rem',
                ...navButtonStyles,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <NavigateBefore />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: '1rem',
                ...navButtonStyles,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <NavigateNext />
            </IconButton>

            {/* Desktop - Center Counter */}
            <Typography
              variant="body1"
              sx={{
                position: 'absolute',
                bottom: '1rem',
                ...counterStyles,
                display: { xs: 'none', md: 'block' },
              }}
            >
              {currentIndex + 1} of {images.length}
            </Typography>

            {/* Mobile - Bottom Controls */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <IconButton onClick={handlePrevious} sx={navButtonStyles}>
                <NavigateBefore />
              </IconButton>

              <Typography
                variant="body1"
                sx={{
                  ...counterStyles,
                  whiteSpace: 'nowrap',
                }}
              >
                {currentIndex + 1} of {images.length}
              </Typography>

              <IconButton onClick={handleNext} sx={navButtonStyles}>
                <NavigateNext />
              </IconButton>
            </Stack>
          </>
        )}

        {/* Main Image */}
        <Box
          sx={{
            maxWidth: '90%',
            maxHeight: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {images[currentIndex] && (
            <Image
              src={images[currentIndex]}
              alt={`${alt} - Image ${currentIndex + 1}`}
              width={1200}
              height={800}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ImageDialog;
