export function PageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner animado */}
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 mx-auto mb-6"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
        </div>

        {/* Texto */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Carregando</h3>
        <p className="text-gray-600 animate-pulse">Buscando informações...</p>

        {/* Indicador de progresso */}
        <div className="mt-6 w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-500 to-gray-700 h-full rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}