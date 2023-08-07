import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products.api";

export const useGetProducts = (options = {}) => {
  const { isLoading, data } = useQuery({
    queryKey: ["GET_PRODUCTS"],
    queryFn: getProducts,
    ...options,
  });

  return { isLoading, data };
};
