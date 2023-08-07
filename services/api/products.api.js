import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get(
    "https://dummyjson.com/products/category/mens-shirts?limit=20&select=title,price,images"
  );

  return { ...response.data, products: response.data?.products?.reverse() };
};
