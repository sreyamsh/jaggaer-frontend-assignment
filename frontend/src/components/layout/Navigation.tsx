'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import { Home, ShoppingBag, ShoppingCart, Close } from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface NavigationProps {
  open?: boolean;
  onClose?: () => void;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    path: '/',
    icon: <Home />,
  },
  {
    label: 'Cart',
    path: '/cart',
    icon: <ShoppingCart />,
  },
];

export function Navigation({
  open = false,
  onClose,
}: NavigationProps): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (path: string): void => {
    router.push(path as any);
    if (onClose) {
      onClose();
    }
  };

  const drawerContent = (
    <Stack sx={{ width: '17.5rem' }} role="presentation">
      {/* Header */}
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: 'primary.main' }}
        >
          Jaggaer Store
        </Typography>
        {onClose && (
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        )}
      </Stack>

      {/* Navigation Items */}
      <List>
        {navigationItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                selected={isActive}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.50',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.100',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: '2.5rem' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: isActive ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Footer */}
      <Stack sx={{ p: 2, color: 'text.secondary' }}>
        <Typography variant="caption">© 2025 Jaggaer Store</Typography>
      </Stack>
    </Stack>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better performance on mobile
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default Navigation;
