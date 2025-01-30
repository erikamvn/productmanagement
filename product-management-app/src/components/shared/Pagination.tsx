import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="mt-4 flex justify-center items-center space-x-4">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`bg-gray-300 px-4 py-2 rounded disabled:opacity-50 ${
          currentPage === 1 ? "cursor-not-allowed" : ""
        }`}
        aria-label="Página anterior"
      >
        Anterior
      </button>
      <span>{`Página ${currentPage} de ${totalPages}`}</span>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`bg-gray-300 px-4 py-2 rounded disabled:opacity-50 ${
          currentPage === totalPages ? "cursor-not-allowed" : ""
        }`}
        aria-label="Próxima página"
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
