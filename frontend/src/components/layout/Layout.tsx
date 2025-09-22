'use client';

import React, { useState } from 'react';
import { Box, Toolbar, Stack } from '@mui/material';
import { Header } from './Header';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export function Layout({
  children,
  showNavigation = true,
}: LayoutProps): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuClose = (): void => {
    setMobileMenuOpen(false);
  };

  return (
    <Stack sx={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header onMenuClick={showNavigation ? handleMenuToggle : undefined} />

      {/* Navigation Drawer (Mobile) */}
      {showNavigation && (
        <Navigation open={mobileMenuOpen} onClose={handleMenuClose} />
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
        }}
      >
        {/* Spacer for fixed header */}
        <Toolbar />

        {/* Page Content */}
        <Box
          sx={{
            p: 2,
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </Box>
      </Box>
    </Stack>
  );
}

// Page Layout with Container
export function PageLayout({
  children,
  maxWidth = 'lg',
  disablePadding = false,
  showNavigation = true,
}: LayoutProps & {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disablePadding?: boolean;
}): React.ReactElement {
  return (
    <Layout showNavigation={showNavigation}>
      <Box
        sx={{
          maxWidth: maxWidth ? `${maxWidth}.breakpoint` : '100%',
          mx: 'auto',
          px: disablePadding ? 0 : { xs: 2, sm: 3 },
          py: disablePadding ? 0 : 2,
        }}
      >
        {children}
      </Box>
    </Layout>
  );
}

export default Layout;
