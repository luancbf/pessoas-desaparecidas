import { Link } from "react-router-dom";
import { StatusBadge } from "./StatusBadge";
import type { PersonStatus, PersonSex } from "../types/person";

type PersonCardProps = {
  id: string;
  name: string;
  photoUrl?: string;
  status: PersonStatus;
  sex: PersonSex;
  date?: string;
  location?: string;
};

export function PersonCard({ id, name, photoUrl, status, sex, date, location }: PersonCardProps) {
  const safeSex = sex || "";
  
  return (
    <Link
      to={`/pessoa/${id}`}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 h-full flex flex-col"
    >
      {/* Container da foto */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {photoUrl ? (
          <>
            <img
              src={photoUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) {
                  fallback.style.display = 'flex';
                }
              }}
            />
            <div 
              className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
              style={{ display: 'none' }}
            >
              <span className="text-gray-400 text-6xl">👤</span>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-6xl">👤</span>
          </div>
        )}
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Informações */}
      <div className="flex flex-col justify-between p-6 flex-grow min-h-[140px]">
        {/* Conteúdo superior - StatusBadge, Nome, Data e Local */}
        <div className="flex flex-col items-center space-y-3">
          <StatusBadge status={status} sex={safeSex} size="md"/>

          <div className="text-center">
            <h3 className="font-bold text-base text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
              {name}
            </h3>
            
            {/* Data e Local */}
            <div className="mt-2 space-y-1 text-sm text-gray-700">
              {date && (
                <p className="line-clamp-1">{date}</p>
              )}
              {location && (
                <p className="line-clamp-1">{location}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Indicador de ação */}
        <div className="flex items-center justify-center text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-200 mt-4">
          <span>Ver detalhes</span>
          <svg 
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}