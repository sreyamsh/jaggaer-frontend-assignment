'use client';

import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Tooltip } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { CartDrawer } from '@/components/cart/CartDrawer';

interface CartIconProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'default' | 'primary' | 'secondary';
  onClick?: () => void;
  useDrawer?: boolean;
}

export function CartIcon({
  size = 'medium',
  color = 'inherit',
  onClick,
  useDrawer = true,
}: CartIconProps): React.ReactElement {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const { cart, removeFromCart, clearCart } = useCart();

  const itemCount = cart.totalItems;

  // Animate when cart count changes
  useEffect(() => {
    if (itemCount > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  const handleClick = (): void => {
    if (onClick) {
      onClick();
    } else if (useDrawer && itemCount > 0) {
      setDrawerOpen(true);
    } else {
      router.push('/cart' as any);
    }
  };

  const handleCloseDrawer = (): void => {
    setDrawerOpen(false);
  };

  const tooltipTitle = (() => {
    if (cart.isLoading) return 'Loading cart...';
    if (cart.error) return 'Cart error - click to retry';
    if (itemCount === 0) return 'Cart is empty';
    return `${itemCount} item${itemCount !== 1 ? 's' : ''} in cart`;
  })();

  const cartButton = (
    <IconButton
      color={color}
      aria-label={`shopping cart with ${itemCount} items`}
      onClick={handleClick}
      size={size}
      sx={{
        '&:hover': {
          bgcolor: 'action.hover',
        },
        transition: 'all 0.2s ease-in-out',
        transform: animate ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      <Badge
        badgeContent={cart.isLoading ? '...' : itemCount}
        color={cart.error ? 'warning' : 'error'}
        max={99}
        invisible={itemCount === 0 && !cart.isLoading}
        sx={{
          '& .MuiBadge-badge': {
            animation: animate ? 'cartPulse 0.6s ease-in-out' : 'none',
            fontSize: '0.75rem',
            minWidth: '1.125rem',
            height: '1.125rem',
            '@keyframes cartPulse': {
              '0%': {
                transform: 'scale(1)',
                opacity: 1,
              },
              '50%': {
                transform: 'scale(1.3)',
                opacity: 0.8,
              },
              '100%': {
                transform: 'scale(1)',
                opacity: 1,
              },
            },
          },
        }}
      >
        <ShoppingCart />
      </Badge>
    </IconButton>
  );

  return (
    <>
      <Tooltip title={tooltipTitle} arrow>
        {cartButton}
      </Tooltip>

      {/* Cart Drawer */}
      {useDrawer && drawerOpen && (
        <CartDrawer
          open={drawerOpen}
          onClose={handleCloseDrawer}
          cart={cart}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          maxItems={5}
        />
      )}
    </>
  );
}

export function HeaderCartIcon(): React.ReactElement {
  return <CartIcon size="medium" color="inherit" useDrawer={true} />;
}

export default CartIcon;
