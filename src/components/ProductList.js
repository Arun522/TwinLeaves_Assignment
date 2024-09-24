// import React, { useState, useEffect } from 'react';
// import { fetchProducts } from '../api/api';
// import { DataGrid } from '@mui/x-data-grid';
// import { Box, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import CategoryFilter from './CategoryFilter';
// import BrandFilter from './BrandFilter';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState(['Kitchen, Garden & Pets', 'HOUSE HOLD NEEDS', 'CLEANING & HOUSEHOLD', 'HOME NEEDS']); // Add your categories
//   const [brands, setBrands] = useState(['Freshco', 'bb Combo', 'Hoovu Fresh']); // Add your brands
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedBrand, setSelectedBrand] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts({ category: selectedCategory, brand: selectedBrand })
//       .then(data => {
//         setProducts(data.products); 
//         console.log("Fetched products:", data.products); // Log products data here
//       })
//       .catch(error => console.error('Error fetching products:', error));

//       console.log("Fetched1 products:", products);
//   }, [selectedCategory, selectedBrand]);

  
  

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleBrandChange = (event) => {
//     setSelectedBrand(event.target.value);
//   };

//   const columns = [
//     { field: 'name', headerName: 'Name', width: 150 },
//     { field: 'price', headerName: 'Price', width: 100 },
//     {
//       field: 'view',
//       headerName: 'View',
//       sortable: false,
//       renderCell: (params) => (
//         <Button onClick={() => navigate(`/product/${params.id}`)}>View</Button>
//       ),
//       width: 100,
//     },
//   ];

//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <CategoryFilter
//         categories={categories}
//         selectedCategory={selectedCategory}
//         handleCategoryChange={handleCategoryChange}
//       />
//       <BrandFilter
//         brands={brands}
//         selectedBrand={selectedBrand}
//         handleBrandChange={handleBrandChange}
//       />
//       <DataGrid rows={products} columns={columns} pageSize={5} getRowId={(row) => row.sku_code}/>
//     </Box>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Select, 
  MenuItem, 
  Button, 
  TextField,
  InputAdornment, 
  Card, 
  CardContent, 
  CardActions,
  Checkbox,
  FormControlLabel,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const categories = [
  { name: 'HOUSE HOLD NEEDS', count: 110 },
  { name: 'LEANING & HOUSEHOLD', count: 125 },
  { name: 'Cleaning & Household', count: 28 },
  { name: 'FHOME NEEDS', count: 165 },
  { name: 'Kitchen, Garden & Pets', count: 339 }
];

const brands = ['bb Combo', 'Fresho', 'Gopalan Organic', 'Hoovu Fresh', 'Organic', 'USA'];

function ProductList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [sortBy, setSortBy] = useState('popularity');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // for pagination
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);

  const fetchProducts = async (query = {}) => {
    try {
      const response = await axios.get('https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products', {
        params: { page, limit: pageSize, ...query }
      });
      if (response.data.products.length > 0) {
        setProducts(response.data.products);
        setRowCount(response.data.totalCount || response.data.products.length);
      } else {
        setProducts([]);
        setRowCount(0);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProducts({ category });
  };

  const handleSearch = () => {
    fetchProducts({ search: searchQuery, brands: selectedBrands });
  };

  const handleBrandChange = (brand, isChecked) => {
    const updatedBrands = isChecked 
      ? [...selectedBrands, brand]
      : selectedBrands.filter((b) => b !== brand);
    setSelectedBrands(updatedBrands);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: isMobile ? 'column' : 'row' }}>
      <Box 
        sx={{ 
          width: isMobile ? '100%' : 250, 
          p: 2, 
          borderRight: isMobile ? 0 : 1, 
          borderBottom: isMobile ? 1 : 0, 
          borderColor: 'divider' 
        }}
      >
        <Typography variant="h6" gutterBottom>
          Category
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          All Categories
        </Typography>
        {categories.map((category, index) => (
          <Typography 
            key={index} 
            variant="body2" 
            gutterBottom 
            onClick={() => handleCategoryClick(category.name)} 
            sx={{ cursor: 'pointer' }}
          >
            {category.name} ({category.count})
          </Typography>
        ))}
        
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Brand
        </Typography>
        <TextField
          fullWidth
          placeholder="Search by Brand"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {brands.map((brand, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox 
                onChange={(e) => handleBrandChange(brand, e.target.checked)} 
              />
            }
            label={brand}
          />
        ))}
        <Button onClick={handleSearch} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Search
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" fontSize={isMobile ? '1.25rem' : '1.5rem'}>
            All Categories ({rowCount})
          </Typography>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="small"
          >
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </Box>

        <Grid container spacing={2}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.sku_code}>
                <Card>
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <img 
                      src={product.image || 'default-image-url.jpg'} 
                      alt={product.name} 
                      style={{ width: 150, height: 150, objectFit: 'contain' }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {product.description}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      ₹ {product.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      MRP: ₹ {typeof product.mrp.mrp === 'object' ? product.mrp.mrp.value : product.mrp.mrp}
                    </Typography>
                    <Box display="flex" alignItems="center">
  <Typography variant="body2" color="textSecondary" sx={{ marginRight: 1 }}>
    Quantity:
  </Typography>
  <TextField
    type="number"
    defaultValue={1}
    InputProps={{ inputProps: { min: 1 } }}
    size="small"
    sx={{ width: 60 }}
  />
</Box>

                  </CardContent>
                  <CardActions>
                    
                    <Button variant="contained" color="primary" fullWidth>
                      ADD TO CART
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="textSecondary">
              No products found.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}


export default ProductList;


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Select,
//   MenuItem,
//   Button,
//   TextField,
//   InputAdornment,
//   Typography,
//   CircularProgress,
// } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import SearchIcon from '@mui/icons-material/Search';
// import axios from 'axios';

// const categories = [
//   { name: 'HOUSE HOLD NEEDS', count: 110 },
//   { name: 'LEANING & HOUSEHOLD', count: 125 },
//   { name: 'Cleaning & Household', count: 28 },
//   { name: 'FHOME NEEDS', count: 165 },
//   { name: 'Kitchen, Garden & Pets', count: 339 },
// ];

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [rowCount, setRowCount] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [sortBy, setSortBy] = useState({ field: 'price', direction: 'asc' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const columns = [
//   {
//     field: 'image',
//     headerName: 'Image',
//     width: 100,
//     renderCell: (params) => (
//       <img
//         src={params.row?.images?.front || 'default-image-url.jpg'} // Safely access image field
//         alt={params.row?.name || 'Product Image'}
//         style={{ width: 50, height: 50, objectFit: 'contain' }}
//       />
//     ),
//   },
//   { field: 'name', headerName: 'Product Name', width: 200 },
//   { field: 'price', headerName: 'Price', width: 100 },
//   {
//     field: 'mrp',
//     headerName: 'MRP',
//     width: 100,
//     valueGetter: (params) => {
//       // Safely access 'mrp' value or return 'N/A' if not present
//       return params.row?.mrp?.mrp ? params.row.mrp.mrp : 'N/A';
//     },
//   },
// ];

  

//   const fetchProducts = async (query = {}) => {
//     setLoading(true);
//     setError(false);
//     try {
//       const response = await axios.get('https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products', {
//         params: { page, limit: pageSize, ...query },
//       });
//       setProducts(response.data.products);
//       setRowCount(response.data.totalCount || response.data.products.length);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [page, pageSize]);

//   const handleSearch = () => {
//     fetchProducts({ search: searchQuery, category: selectedCategory });
//   };

//   const handleSort = (sortModel) => {
//     if (sortModel.length > 0) {
//       const sortField = sortModel[0].field;
//       const sortDirection = sortModel[0].sort;
//       setSortBy({ field: sortField, direction: sortDirection });
//       fetchProducts();
//     }
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//     fetchProducts({ category: event.target.value });
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
//         <Box>
//           <Typography variant="h5">Product List</Typography>
//         </Box>
//         <Box>
//           <TextField
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search product..."
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button onClick={handleSearch} variant="contained" sx={{ marginLeft: 2 }}>
//             Search
//           </Button>
//         </Box>
//       </Box>

//       <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
//         <Select
//           value={selectedCategory}
//           onChange={handleCategoryChange}
//           displayEmpty
//           sx={{ width: 200 }}
//         >
//           <MenuItem value="">All Categories</MenuItem>
//           {categories.map((category) => (
//             <MenuItem key={category.name} value={category.name}>
//               {category.name} ({category.count})
//             </MenuItem>
//           ))}
//         </Select>

//         <Select value={sortBy.field} onChange={(e) => setSortBy({ ...sortBy, field: e.target.value })}>
//           <MenuItem value="price">Sort by Price</MenuItem>
//           <MenuItem value="name">Sort by Name</MenuItem>
//         </Select>
//       </Box>

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Typography variant="h6" color="error">
//           Failed to load products.
//         </Typography>
//       ) : (
//         <DataGrid
//           rows={products}
//           columns={columns}
//           pageSize={pageSize}
//           rowsPerPageOptions={[5, 10, 20]}
//           rowCount={rowCount}
//           paginationMode="server"
//           onPageChange={(newPage) => setPage(newPage + 1)}
//           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//           sortingMode="server"
//           onSortModelChange={handleSort}
//           autoHeight
//           getRowId={(row) => row.sku_code}
//         />
//       )}
//     </Box>
//   );
// };

// export default ProductList;
