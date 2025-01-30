import React from "react";

interface ProductFilterSortProps {
  sortBy: "price" | "title"; // Tipando o valor para garantir que só pode ser "price" ou "title"
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMinPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductFilterSort: React.FC<ProductFilterSortProps> = ({
  sortBy,
  searchQuery,
  minPrice,
  maxPrice,
  onSortChange,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  return (
    <div className="space-x-4">
      <label htmlFor="sort">Ordenar por:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={onSortChange}
        className="p-2 border rounded"
        aria-label="Ordenar por"
      >
        <option value="price">Preço</option>
        <option value="title">Nome</option>
      </select>
      <input
        type="text"
        placeholder="Buscar por nome"
        value={searchQuery}
        onChange={onSearchChange}
        className="p-2 border rounded mr-2 w-80"
        aria-label="Buscar por nome"
      />
      <input
        type="number"
        placeholder="Preço Mínimo"
        value={minPrice}
        onChange={onMinPriceChange}
        className="p-2 border rounded mr-2 w-24"
        aria-label="Preço Mínimo"
      />
      <input
        type="number"
        placeholder="Preço Máximo"
        value={maxPrice}
        onChange={onMaxPriceChange}
        className="p-2 border rounded mr-2 w-24"
        aria-label="Preço Máximo"
      />
    </div>
  );
};

export default ProductFilterSort;
