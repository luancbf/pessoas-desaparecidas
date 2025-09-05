import { useParams, Link } from "react-router-dom";
import { usePerson } from "../../../hooks/usePerson";
import { StatusBadge } from "../../../components/StatusBadge";
import { ObservationForm } from "./ObservationForm";

type Cartaz = {
  urlCartaz: string;
  tipoCartaz: string;
};

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: person, isLoading } = usePerson(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="animate-pulse">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Skeleton da foto */}
                  <div className="flex-shrink-0 mx-auto lg:mx-0">
                    <div className="w-80 h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl"></div>
                  </div>
                  
                  {/* Skeleton das informações */}
                  <div className="flex-1 space-y-6">
                    <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl w-3/4"></div>
                    <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-1/3"></div>
                    <div className="space-y-4">
                      <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                      <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-5/6"></div>
                      <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
            <div className="text-8xl mb-6 filter drop-shadow-lg">👤</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Pessoa não encontrada
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              A pessoa que você está procurando não foi encontrada em nossa base de dados.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar à busca
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navegação superior */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar à busca
            </Link>
          </div>

          {/* Card principal da pessoa */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 border border-gray-100">
            <div className="p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Container da foto */}
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  <div className="relative group">
                    {person.urlFoto ? (
                      <>
                        <img
                          src={person.urlFoto}
                          alt={person.nome}
                          className="w-90 h-140 rounded-3xl object-cover border-4 border-gray-100 shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="w-90 h-140 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-gray-100 shadow-2xl flex items-center justify-center"
                          style={{ display: 'none' }}
                        >
                          <span className="text-gray-400 text-8xl filter drop-shadow-lg">👤</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-90 h-140 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-gray-100 shadow-2xl flex items-center justify-center">
                        <span className="text-gray-400 text-8xl filter drop-shadow-lg">👤</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Informações da pessoa */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                      {person.nome}
                  </h1>

                  <div className="my-6">
                    <StatusBadge 
                      status={person.ultimaOcorrencia?.dataLocalizacao ? "LOCALIZADO" : "DESAPARECIDO"} 
                      sex={person.sexo}
                      size="lg"
                    />
                  </div>

                  {/* Grid de informações principais */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Idade da pessoa */}
                    {person.idade && (
                      <div className="p-4 rounded-2xl border border-gray-300">
                        <div className="flex justify-center lg:justify-start items-center mb-2">
                          <span className="text-xl mr-2">🎂</span>
                          <span className="text-xl font-semibold text-gray-900">Idade</span>
                        </div>
                        <p className="text-gray-900 text-lg">{person.idade} anos</p>
                      </div>
                    )}
                    {/* Data do desaparecimento */}
                    {person.ultimaOcorrencia?.dtDesaparecimento && (
                      <div className="p-4 rounded-2xl border border-gray-300">
                        <div className="flex justify-center lg:justify-start items-center mb-2">
                          <span className="text-xl mr-2">📅</span>
                          <span className="text-xl font-semibold text-gray-900">Data do desaparecimento</span>
                        </div>
                        <p className="text-gray-900 text-lg">
                          {new Date(person.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Local do desaparecimento */}
                    {person.ultimaOcorrencia?.localDesaparecimentoConcat && (
                      <div className="p-4 rounded-2xl border border-gray-300 mb-4">
                        <div className="flex justify-center lg:justify-start items-center mb-2">
                          <span className="text-xl mr-3">📍</span>
                          <span className="text-xl font-semibold text-gray-900">Local do desaparecimento</span>
                        </div>
                        <p className="text-gray-900 text-lg">
                          {person.ultimaOcorrencia.localDesaparecimentoConcat}
                        </p>
                      </div>
                    )}

                    {/* Informações adicionais */}
                    {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao && (
                      <div className="p-4 rounded-2xl border border-gray-300 mb-4">
                        <div className="flex justify-center lg:justify-start items-center mb-2">
                          <span className="text-xl mr-2">ℹ️</span>
                          <h3 className="text-xl font-semibold text-gray-900">Informações adicionais</h3>
                        </div>
                        <p className="text-gray-900 leading-relaxed">
                          {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                        </p>
                      </div>
                    )}

                    {/* Vestimentas */}
                    {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido && (
                      <div className="p-4 rounded-2xl border border-gray-300">
                        <div className="flex justify-center lg:justify-start items-center mb-2">
                          <span className="text-xl mr-2">👕</span>
                          <h3 className="text-xl font-semibold text-gray-900">Vestimentas</h3>
                        </div>
                        <p className="text-gray-900 leading-relaxed">
                          {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Cartazes */}
                  {person.listaCartaz && person.listaCartaz.length > 0 && (
                    <div className=" p-4 rounded-2xl border border-indigo-200">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">📄</span>
                        <h3 className="font-semibold text-gray-800 text-lg">Cartazes Disponíveis</h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {person.listaCartaz.map((cartaz: Cartaz, index: number) => (
                          <a
                            key={index}
                            href={cartaz.urlCartaz}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg border border-indigo-200 group"
                          >
                            <span className="mr-2">📄</span>
                            <span className="font-medium">{cartaz.tipoCartaz.replace('_', ' ')}</span>
                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de observação */}
          <ObservationForm personId={id!} />
        </div>
      </div>
    </div>
  );
}