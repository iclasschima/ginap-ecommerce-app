import axios from "axios";

export const login = async (data) => {
  const response = await axios.post("https://dummyjson.com/auth/login", data);
  return response.data;
};

export const register = async (data) => {
  const response = await axios.post("https://dummyjson.com/users/add", data);
  return response.data;
};
