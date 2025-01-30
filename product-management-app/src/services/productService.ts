import { Product } from "@/types/productTypes";
import axios from "axios";

const API_URL = "https://my-json-server.typicode.com/erikamvn/fakeapi/products";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar os produtos");
  }
};

export const createProduct = async (newProduct: Product): Promise<Product> => {
  try {
    const response = await axios.post(API_URL, newProduct);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar o produto");
  }
};
