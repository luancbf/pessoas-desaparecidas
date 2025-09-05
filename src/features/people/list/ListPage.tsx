import React from "react";
import { usePeople } from "../../../hooks/usePeople";
import { usePeopleStatistics } from "../../../hooks/usePeopleStatistics";
import { PersonCard } from "../../../components/PersonCard";
import { Pagination } from "../../../components/Pagination";
import { SearchBar } from "../../../components/SearchBar";
import type { Person, PersonStatus, PersonSex } from "../../../types/person";

export default function ListPage() {
  const [page, setPage] = React.useState(1);
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<"" | PersonStatus>("");
  const [sex, setSex] = React.useState<PersonSex>("");

  const { data, isLoading, error } = usePeople({ 
    page, 
    size: 10, 
    q,
    status,
    sex
  });

  const { data: statistics } = usePeopleStatistics();

  React.useEffect(() => {
    setPage(1);
  }, [q, status, sex]);

  const getPersonStatus = (person: Person): PersonStatus => {
    return person.ultimaOcorrencia?.dataLocalizacao ? "LOCALIZADO" : "DESAPARECIDO";
  };

  const people = (data?.content as Person[]) || [];
  const hasResults = people.length > 0;

  const statusCounts = React.useMemo(() => {
    if (!statistics) return { desaparecidos: 0, encontrados: 0 };
    
    return {
      desaparecidos: statistics.quantPessoasDesaparecidas || 0,
      encontrados: statistics.quantPessoasEncontradas || 0
    };
  }, [statistics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Hero Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-2 leading-tight">
              Pessoas Desaparecidas
            </h1>
            
            <p className="text-lg font-semibold text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Sistema da Polícia Judiciária Civil de Mato Grosso
            </p>
          </div>

          {/* Barra de busca + contador de status */}
          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
            {/* Contadores de status */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-start mb-4">
                <div className="flex gap-8">
                  <div className="flex flex-col justify-center items-center">
                    <span className="font-semibold text-base sm:text-lg text-gray-800 text-center">Pessoas desaparecidas</span>
                    <span className="mt-2 text-xl sm:text-2xl font-bold text-red-600">{statusCounts.desaparecidos}</span>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <span className="font-semibold text-base sm:text-lg text-gray-800 text-center">Pessoas encontradas</span>
                    <span className="mt-2 text-xl sm:text-2xl font-bold text-green-600">{statusCounts.encontrados}</span>
                  </div>
                </div>
            </div>

            {/* Barra de busca */}
            <div className="flex-1">
                <SearchBar
                  value={q}
                  status={status}
                  sex={sex}
                  onChangeValue={setQ}
                  onChangeStatus={setStatus}
                  onChangeSex={setSex}
                />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-600 border-t-transparent"></div>
                <span className="text-gray-600 font-medium">Carregando...</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse border border-gray-100">
                  <div className="aspect-[4/4] bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-3/4 mx-auto"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                <div className="text-8xl mb-5 filter drop-shadow-lg">⚠️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Erro ao carregar dados
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Não foi possível conectar com o servidor. Verifique sua conexão e tente novamente.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Tentar novamente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && !hasResults && (
          <div className="text-center py-20">
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
                <div className="text-8xl mb-6 filter drop-shadow-lg">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {q || status 
                    ? `Não encontramos pessoas ${status === "DESAPARECIDO" ? "desaparecidas" : status === "LOCALIZADO" ? "localizadas" : ""} ${q ? `com o nome "${q}"` : ""}. Tente ajustar os critérios de busca.`
                    : "Não há registros disponíveis no momento."
                  }
                </p>
                
                {(q || status) && (
                  <button
                    onClick={() => {
                      setQ("");
                      setStatus("");
                    }}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Lista de pessoas */}
        {!isLoading && !error && hasResults && (
          <div className="space-y-8">
            {/* Grid de pessoas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {people.map((person: Person, index: number) => (
                <div
                  key={person.id}
                  className="transform transition-all duration-300"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <PersonCard
                    id={person.id.toString()}
                    name={person.nome}
                    photoUrl={person.urlFoto}
                    status={getPersonStatus(person)}
                    sex={person.sexo || ""}
                    date={person.ultimaOcorrencia?.dtDesaparecimento ? 
                      new Date(person.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString('pt-BR') : 
                      undefined
                    }
                    location={person.ultimaOcorrencia?.localDesaparecimentoConcat}
                  />
                </div>
              ))}
            </div>

            {/* Paginação sempre visível quando há resultados */}
            <div className="flex justify-center">
              <Pagination
                page={page}
                total={data?.totalElements || 0}
                onChange={setPage}
                pageSize={10}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}