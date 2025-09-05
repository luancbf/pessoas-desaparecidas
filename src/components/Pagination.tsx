import React from "react";

type PaginationProps = {
  page: number;
  total: number;
  onChange: (page: number) => void;
  pageSize?: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  onChange,
  pageSize = 10,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) rangeWithDots.push(1, "...");
    else rangeWithDots.push(1);

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1)
      rangeWithDots.push("...", totalPages);
    else if (totalPages > 1) rangeWithDots.push(totalPages);

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Info de resultados */}
      <div className="text-sm text-gray-600">
        <span className="font-medium">{(page - 1) * pageSize + 1}</span>
        {" - "}
        <span className="font-medium">{Math.min(page * pageSize, total)}</span>
        {" de "}
        <span className="font-medium">{total}</span>
        {" resultados"}
      </div>

      {/* Navegação */}
      <div className="flex items-center space-x-1">
        {/* Botão Anterior */}
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-all duration-200 cursor-pointer"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Anterior
        </button>

        {/* Números das páginas */}
        <div className="hidden sm:flex items-center space-x-1">
          {getVisiblePages().map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === "..." ? (
                <span className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => onChange(pageNum as number)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 ${
                    page === pageNum
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {pageNum}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Info móvel */}
        <div className="sm:hidden px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg">
          {page} / {totalPages}
        </div>

        {/* Botão Próximo */}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-all duration-200 cursor-pointer"
        >
          Próxima
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};