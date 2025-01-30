import { Product } from "@/types/productTypes";

/** Função para filtrar os produtos com base na busca e no intervalo de preço */
export const filterProducts = (
  allProducts: Product[],
  searchQuery: string,
  minPrice: number,
  maxPrice: number
): Product[] => {
  return allProducts.filter((product) => {
    const queryResult = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const priceResult =
      product.price >= (minPrice || 0) &&
      product.price <= (maxPrice || Infinity);
    return queryResult && priceResult;
  });
};

/** Função para ordenar os produtos de acordo com a opção */
export const sortProducts = (
  products: Product[],
  sortBy: "price" | "title"
): Product[] => {
  return products.slice().sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price;
    }
    return a.name.localeCompare(b.name);
  });
};
