import React from 'react';
import { Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const BrandFilter = ({ brands, selectedBrand, handleBrandChange }) => {
  return (
    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Brand</InputLabel>
        <Select
          value={selectedBrand}
          onChange={handleBrandChange}
          label="Brand"
        >
          <MenuItem value="">
            <em>All Brands</em>
          </MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BrandFilter;
