import React from "react";
import type { PersonStatus, PersonSex } from "../types/person";

type StatusBadgeProps = {
  status: PersonStatus;
  sex?: PersonSex;
  size?: "sm" | "md" | "lg";
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, sex = "", size = "md" }) => {
  const isFound = status === "LOCALIZADO";
  const isFemale = sex === "FEMININO";
  
  const sizeClasses = {
    sm: "font-bold text-sm",
    md: "font-bold text-lg",
    lg: "font-bold text-2xl"
  };

  const getStatusText = () => {
    if (status === "DESAPARECIDO") {
      return isFemale ? "Desaparecida" : "Desaparecido";
    } else {
      return isFemale ? "Encontrada" : "Encontrado";
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <span
        className={`
          ${sizeClasses[size]} 
          rounded-full uppercase tracking-wide
          ${isFound 
            ? "text-emerald-600" 
            : "text-red-600"
          }
        `}
      >
        {getStatusText()}
      </span>
    </div>
  );
};