import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-xl border-t border-gray-600 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-6">
          {/* Logo e título */}
          <Link
            to="/"
            className="flex items-center space-x-4 hover:opacity-90 transition-opacity duration-200 group"
          >
            <img
              src="/pjc_logo.svg"
              alt="PJC MT Logo"
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-bold leading-tight">Polícia Judiciária Civil - MT</h2>
              <p className="text-gray-200 text-sm font-medium">
                Pessoas Desaparecidas
              </p>
            </div>
          </Link>

          {/* Informações adicionais */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
            <div className="flex flex-col space-y-1">
              <p className="text-gray-200 text-sm">
                Sistema desenvolvido para auxiliar na localização de pessoas desaparecidas
              </p>
              <p className="text-gray-300 text-xs">
                © {new Date().getFullYear()} Polícia Judiciária Civil do Estado de Mato Grosso
              </p>
            </div>
          </div>
        </div>

        {/* Linha divisória e informações finais */}
        <div className="border-t border-gray-600 pt-4 pb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-300">
            <p>
              Em caso de emergência, ligue <strong className="text-white">190</strong>
            </p>
            <p>
              Denúncias: <strong className="text-white">181</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}