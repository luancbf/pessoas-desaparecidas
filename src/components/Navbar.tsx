import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-xl border-b border-gray-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo e título */}
          <Link
            to="/"
            className="flex items-center space-x-4 hover:opacity-90 transition-opacity duration-200 group"
          >
            <img
              src="/pjc_logo.svg"
              alt="PJC MT Logo"
              className="h-12 w-12 object-contain"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold leading-tight">Polícia Judiciária Civil - MT</h1>
              <p className="text-gray-200 text-sm font-medium">
                Pessoas Desaparecidas
              </p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}