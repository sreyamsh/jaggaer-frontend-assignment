// Enhanced Featured products grid with search and filter
import {
  Button,
  Collapse,
  Chip,
  IconButton,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import ProductGrid, { ProductGridProps } from './ProductGrid';
import React, { useState, useMemo } from 'react';
import {
  Clear,
  ExpandLess,
  ExpandMore,
  FilterList,
  Search,
} from '@mui/icons-material';

interface FeaturedProductGridProps extends Omit<ProductGridProps, 'columns'> {
  title?: string;
  subtitle?: string;
  maxItems?: number;
  showSearch?: boolean;
  showFilters?: boolean;
  showResultCount?: boolean;
}
function FeaturedProductGrid({
  products,
  title = 'Featured Products',
  subtitle,
  maxItems = 8,
  showSearch = false,
  showFilters = false,
  showResultCount = false,
  ...gridProps
}: FeaturedProductGridProps): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('name');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Get min and max prices from products
  const priceExtents = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 2000 };
    const prices = products.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.shortDescription.toLowerCase().includes(term) ||
          product.longDescription.toLowerCase().includes(term)
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Rating filter
    filtered = filtered.filter((product) => product.rating >= minRating);

    // Sort
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    // Apply maxItems limit after filtering
    return filtered.slice(0, maxItems);
  }, [products, searchTerm, priceRange, minRating, sortBy, maxItems]);

  // Reset all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setPriceRange([priceExtents.min, priceExtents.max]);
    setMinRating(0);
    setSortBy('name');
  };

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm.trim()) count++;
    if (
      priceRange[0] !== priceExtents.min ||
      priceRange[1] !== priceExtents.max
    )
      count++;
    if (minRating > 0) count++;
    return count;
  }, [searchTerm, priceRange, minRating, priceExtents]);

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Stack spacing={1} sx={{ textAlign: 'center' }}>
        <Stack
          direction={showResultCount ? 'row' : 'column'}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Stack
            spacing={1}
            sx={{ textAlign: showResultCount ? 'left' : 'center' }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Stack>

          {showResultCount && (showSearch || showFilters) && (
            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} of {products.length} products
            </Typography>
          )}
        </Stack>
      </Stack>

      {/* Search and Filter Controls */}
      {(showSearch || showFilters) && (
        <Paper sx={{ p: 2, pb: showFilterPanel ? 4 : 2 }}>
          <Stack spacing={2}>
            {/* Search Bar */}
            {showSearch && (
              <TextField
                variant="outlined"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <Search sx={{ color: 'grey.400', mr: 1 }} />
                    ),
                    endAdornment: searchTerm && (
                      <IconButton
                        size="small"
                        onClick={() => setSearchTerm('')}
                      >
                        <Clear />
                      </IconButton>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '0.5rem',
                  },
                }}
              />
            )}

            {/* Filter Controls */}
            {showFilters && (
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    variant="text"
                    startIcon={<FilterList />}
                    endIcon={showFilterPanel ? <ExpandLess /> : <ExpandMore />}
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                    sx={{ textTransform: 'none' }}
                  >
                    Filters
                    {activeFiltersCount > 0 && (
                      <Chip
                        label={activeFiltersCount}
                        size="small"
                        color="primary"
                        sx={{ ml: 1, height: '1.25rem' }}
                      />
                    )}
                  </Button>

                  {activeFiltersCount > 0 && (
                    <Button
                      variant="text"
                      startIcon={<Clear />}
                      onClick={handleClearFilters}
                      sx={{ textTransform: 'none' }}
                    >
                      Clear All
                    </Button>
                  )}
                </Stack>

                <Collapse in={showFilterPanel}>
                  <Stack spacing={3} sx={{ pt: 2 }}>
                    {/* Sort */}
                    <FormControl sx={{ minWidth: '12rem' }}>
                      <InputLabel>Sort By</InputLabel>
                      <Select
                        value={sortBy}
                        label="Sort By"
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <MenuItem value="name">Name (A-Z)</MenuItem>
                        <MenuItem value="price-low">
                          Price (Low to High)
                        </MenuItem>
                        <MenuItem value="price-high">
                          Price (High to Low)
                        </MenuItem>
                        <MenuItem value="rating">Rating (High to Low)</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Price Range */}
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        Price Range: €{priceRange[0]} - €{priceRange[1]}
                      </Typography>
                      <Slider
                        value={priceRange}
                        onChange={(_, newValue) =>
                          setPriceRange(newValue as [number, number])
                        }
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `€${value}`}
                        min={priceExtents.min}
                        max={priceExtents.max}
                        step={10}
                        marks={[
                          {
                            value: priceExtents.min,
                            label: `€${priceExtents.min}`,
                          },
                          {
                            value: priceExtents.max,
                            label: `€${priceExtents.max}`,
                          },
                        ]}
                        sx={{
                          maxWidth: '50rem',
                          marginInline: 'auto !important',
                        }}
                      />
                    </Stack>

                    {/* Minimum Rating */}
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        Minimum Rating:{' '}
                        {minRating === 0 ? 'Any' : `${minRating}+ stars`}
                      </Typography>
                      <Slider
                        value={minRating}
                        onChange={(_, newValue) =>
                          setMinRating(newValue as number)
                        }
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) =>
                          value === 0 ? 'Any' : `${value}+ stars`
                        }
                        min={0}
                        max={5}
                        step={0.5}
                        marks={[
                          { value: 0, label: 'Any' },
                          { value: 1, label: '1+' },
                          { value: 2, label: '2+' },
                          { value: 3, label: '3+' },
                          { value: 4, label: '4+' },
                          { value: 5, label: '5' },
                        ]}
                        sx={{
                          maxWidth: '50rem',
                          marginInline: 'auto !important',
                        }}
                      />
                    </Stack>
                  </Stack>
                </Collapse>
              </Stack>
            )}
          </Stack>
        </Paper>
      )}

      {/* Grid */}
      <ProductGrid
        {...gridProps}
        products={filteredProducts}
        emptyStateTitle="No Products Match Your Search"
        emptyStateMessage={
          activeFiltersCount > 0
            ? 'Try adjusting your search term or filters to see more results.'
            : "We couldn't find any products to display."
        }
      />
    </Stack>
  );
}

export default FeaturedProductGrid;
