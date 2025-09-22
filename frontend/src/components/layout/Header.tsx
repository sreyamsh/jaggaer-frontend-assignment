'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { HeaderCartIcon } from './CartIcon';
import { usePageTitle } from '@/hooks/usePageTitle';

interface HeaderProps {
  onMenuClick?: () => void;
}

function HideOnScroll({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export function Header({ onMenuClick }: HeaderProps): React.ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pageTitle = usePageTitle();

  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll shadow effect
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={isScrolled ? 4 : 0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        transition: theme.transitions.create(['box-shadow'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backdropFilter: 'blur(0.625rem)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side - Menu (mobile) + Logo */}
        <Stack direction="row" alignItems="center" spacing={1}>
          {isMobile && onMenuClick && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
            >
              <Menu />
            </IconButton>
          )}

          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={() => router.push('/')}
          >
            {pageTitle}
          </Typography>
        </Stack>

        {/* Right side - Actions */}
        <Stack direction="row" alignItems="center" spacing={1}>
          {/* Cart Icon with Drawer */}
          <HeaderCartIcon />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

// Scrollable Header with Hide on Scroll Effect (Optional)
export function ScrollableHeader(props: HeaderProps): React.ReactElement {
  return (
    <HideOnScroll>
      <Header {...props} />
    </HideOnScroll>
  );
}

export default Header;
