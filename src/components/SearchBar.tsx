import React from "react";
import type { PersonStatus, PersonSex } from "../types/person";

type SearchBarProps = {
  value: string;
  status: "" | PersonStatus;
  sex: PersonSex | "";
  onChangeValue: (v: string) => void;
  onChangeStatus: (s: "" | PersonStatus) => void;
  onChangeSex: (s: PersonSex | "") => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  status,
  sex,
  onChangeValue,
  onChangeStatus,
  onChangeSex,
}) => {
  const clearAllFilters = () => {
    onChangeValue("");
    onChangeStatus("");
    onChangeSex("");
  };

  const hasActiveFilters = value || status || sex;

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Campos de busca */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Campo de busca */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da pessoa
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite o nome para buscar..."
                  value={value}
                  onChange={(e) => onChangeValue(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-xl">👤</span>
                </div>
              </div>
            </div>

            {/* Filtro de status */}
            <div className="lg:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => onChangeStatus(e.target.value as "" | PersonStatus)}
                  className="w-full appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 cursor-pointer"
                >
                  <option value="">Todos os status</option>
                  <option value="DESAPARECIDO">Desaparecidas</option>
                  <option value="LOCALIZADO">Localizadas</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filtro de sexo */}
            <div className="lg:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sexo
              </label>
              <div className="relative">
                <select
                  value={sex}
                  onChange={(e) => onChangeSex(e.target.value as PersonSex | "")}
                  className="w-full appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 cursor-pointer"
                >
                  <option value="">Todos os sexos</option>
                  <option value="FEMININO">Feminino</option>
                  <option value="MASCULINO">Masculino</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Botão limpar filtros */}
            {hasActiveFilters && (
              <div className="lg:w-auto flex items-end">
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all duration-200 font-medium border border-gray-300 flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpar
                </button>
              </div>
            )}
          </div>

          {/* Indicadores ativos */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Filtros ativos:</span>
              {value && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Nome: "{value}"
                  <button
                    onClick={() => onChangeValue("")}
                    className="ml-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}
              {status && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Status: {status === "DESAPARECIDO" ? "Desaparecidas" : "Localizadas"}
                  <button
                    onClick={() => onChangeStatus("")}
                    className="ml-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}
              {sex && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Sexo: {sex === "FEMININO" ? "Feminino" : "Masculino"}
                  <button
                    onClick={() => onChangeSex("")}
                    className="ml-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};