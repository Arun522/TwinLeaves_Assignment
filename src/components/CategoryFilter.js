import React from 'react';
import { Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const CategoryFilter = ({ categories, selectedCategory, handleCategoryChange }) => {
  return (
    <Box sx={{ minWidth: 120, marginBottom: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategoryFilter;
