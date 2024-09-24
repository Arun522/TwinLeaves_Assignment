import axios from 'axios';

const BASE_URL = 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms';


export const fetchProducts = async (queryParams = {}) => {
  try {
    //console.log("queryParams", queryParams)
    const response = await axios.get(`${BASE_URL}/products`, {
      params: queryParams,
    });
    console.log("response", response)
    return response.data; // Return the products data.
  } catch (error) {
    handleAxiosError(error);
  }
};


export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data; // Return the product data.
  } catch (error) {
    handleAxiosError(error);
  }
};


const handleAxiosError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code outside the range of 2xx.
    console.error('Error response from server:', error.response.data);
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received.
    console.error('No response received:', error.request);
  } else {
    // Something happened in setting up the request that triggered an error.
    console.error('Error in setting up the request:', error.message);
  }
};
