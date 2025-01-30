import React, { useState } from "react";
import router from "next/router";
import { toast } from "react-toastify";

import { createProduct } from "@/services/productService";
import { useProductStore } from "@/store/productStore";
import InputField from "../shared/InputField";
import TextareaField from "../shared/TextField";

const ProductNew = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const addProduct = useProductStore((state) => state.addProduct);
  const setError = useProductStore((state) => state.setError);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProduct = {
      id: 0,
      name,
      category,
      price,
      description,
      imageUrl,
    };

    if (isNaN(price) || price <= 0) {
      toast.error("Preço inválido.");
      return;
    }

    try {
      const createdProduct = await createProduct(newProduct);

      addProduct(createdProduct);

      toast.success("Produto criado com sucesso!");
      handleGoBack();
    } catch (error) {
      toast.error("Erro ao criar o produto.");
      setError("Erro ao criar o produto. Tente novamente.");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const isFormValid = name && category && price && description && imageUrl;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Cadastrar Produto
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="nome"
          label="Nome do Produto"
          value={name}
          onChange={setName}
          type="text"
          required
        />
        <InputField
          id="categoria"
          label="Categoria"
          value={category}
          onChange={setCategory}
          type="text"
          required
        />
        <InputField
          id="preco"
          label="Preço"
          value={price.toString()}
          onChange={(value) => setPrice(parseFloat(value))}
          type="number"
          required
          min={0}
          step={0.01}
        />
        <TextareaField
          id="descricao"
          label="Descrição"
          value={description}
          onChange={setDescription}
          required
        />
        <InputField
          id="imagem"
          label="URL da Imagem"
          value={imageUrl}
          onChange={setImageUrl}
          type="text"
          required
        />
        <div className="flex justify-center gap-8">
          <button
            type="button"
            onClick={handleGoBack}
            className="w-24 bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            aria-label="Cancelar e voltar"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-24 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isFormValid ? "opacity-50" : ""
            }`}
            aria-label="Salvar o produto"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductNew;
