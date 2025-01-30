import React from "react";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  image,
}) => {
  return (
    <div
      className="flex flex-col p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out h-[370px]"
      role="article" // Para indicar que o card é um item de uma lista
      aria-labelledby={`product-${name}`} // Associando o título ao card
    >
      <img
        src={image}
        alt={`Imagem do produto: ${name}`} // Tornando a imagem mais descritiva
        className="w-full h-48 object-cover rounded-lg mb-4"
        loading="lazy"
      />
      <h3
        id={`product-${name}`}
        className="text-xl font-semibold text-gray-800 truncate"
      >
        {name}
      </h3>
      <p
        className="text-gray-600 text-sm mb-4 flex-1 overflow-hidden"
        aria-describedby={`product-description-${name}`} // Relacionando descrição ao produto
      >
        {description}
      </p>
      <div className="text-gray-800 font-semibold mt-auto">
        R$ {price.toFixed(2)}
      </div>
    </div>
  );
};

export default ProductCard;
