import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/api';
import { Box, Typography } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProductById(id).then(response => setProduct(response.data));
  }, [id]);

  return (
    <Box>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="h6">Price: {product.price}</Typography>
    </Box>
  );
};

export default ProductDetail;
