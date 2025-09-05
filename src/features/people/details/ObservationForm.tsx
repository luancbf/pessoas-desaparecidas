import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../services/api";

const schema = z.object({
  description: z.string().min(5, "Descreva a observação com pelo menos 5 caracteres"),
  phone: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  photos: z.any().optional(),
});

type FormData = z.infer<typeof schema>;

type ObservationFormProps = {
  personId: string;
};

export const ObservationForm: React.FC<ObservationFormProps> = ({ personId }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const onSubmit = async (values: FormData) => {
    try {
      await api.post(`/people/${personId}/observations`, values);
      setIsSuccess(true);
      reset();
      setIsFormOpen(false);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Erro ao enviar observação:", error);
      alert("Erro ao enviar observação. Tente novamente.");
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
          <div className="text-8xl mb-6 filter drop-shadow-lg">✅</div>
          <h3 className="text-3xl font-bold mb-4">Observação Enviada!</h3>
          <p className="text-green-100 text-lg leading-relaxed max-w-md mx-auto">
            Obrigado por compartilhar essas informações. Sua contribuição é muito importante para nos ajudar.
          </p>
        </div>
        
        <div className="p-8 text-center">
          <button
            onClick={() => {
              setIsSuccess(false);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
          >
            <span className="mr-2">➕</span>
            Enviar outra observação
          </button>
        </div>
      </div>
    );
  }

  if (!isFormOpen) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Call to Action Principal */}
        <div className="p-12 text-center">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tem alguma informação?
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Sua contribuição pode ser fundamental para ajudar a localizar esta pessoa. 
              Compartilhe qualquer informação que possa auxiliar nas investigações.
            </p>
          </div>

          {/* Benefícios da colaboração */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-semibold text-black mb-2">Ajude na localização</h3>
              <p className="text-gray-700 text-sm">
                Qualquer detalhe pode ser importante para encontrar esta pessoa
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-semibold text-black mb-2">Faça a diferença</h3>
              <p className="text-gray-700 text-sm">
                Sua observação pode reunir uma família novamente
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-black mb-2">Totalmente seguro</h3>
              <p className="text-gray-700 text-sm">
                Suas informações são protegidas e confidenciais
              </p>
            </div>
          </div>

          {/* Botão principal para abrir formulário */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-bold text-lg group cursor-pointer"
          >
            Compartilhar informação
            <svg className="w-6 h-6 ml-3 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      <div className="pt-8 pl-8 mb-5 text-gray-900">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsFormOpen(false)}
            className="p-2 hover:text-gray-600 rounded-xl transition-colors duration-200 group cursor-pointer"
            title="Fechar formulário"
          >
            <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8 lg:px-12 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Descrição */}
          <div className="lg:col-span-2">
            <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <span className="text-2xl mr-3">📝</span>
              Descrição da observação *
            </label>
            <textarea
              {...register("description")}
              placeholder="Descreva detalhadamente o que você viu, quando aconteceu e onde foi..."
              className={`w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 placeholder-gray-500 ${
                errors.description 
                  ? "border-red-300 bg-red-50" 
                  : "border-gray-200 hover:border-gray-300 focus:border-blue-500"
              }`}
              rows={6}
            />
            {errors.description && (
              <div className="mt-3 flex items-center text-red-600">
                <span className="text-lg mr-2">⚠️</span>
                <p className="font-medium">{errors.description.message}</p>
              </div>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <span className="text-2xl mr-3">📞</span>
              Telefone para contato
            </label>
            <input
              type="text"
              {...register("phone")}
              placeholder="(00) 00000-0000"
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-300 transition-all duration-300 text-gray-900 placeholder-gray-500"
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                setValue("phone", formatted);
              }}
              maxLength={15}
            />
          </div>

          {/* Data */}
          <div>
            <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <span className="text-2xl mr-3">📅</span>
              Data da observação
            </label>
            <input
              type="date"
              {...register("date")}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-300 transition-all duration-300 text-gray-900"
            />
          </div>

          {/* Localização */}
          <div className="lg:col-span-2">
            <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <span className="text-2xl mr-3">📍</span>
              Local onde foi avistada
            </label>
            <input
              type="text"
              {...register("location")}
              placeholder="Ex: Cidade X, Bairro Y, Rua Z..."
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-300 transition-all duration-300 text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Upload de fotos */}
          <div className="lg:col-span-2">
            <label className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <span className="text-2xl mr-3">📸</span>
              Anexar fotos (opcional)
            </label>
            
            <div className="relative">
              <input
                type="file"
                {...register("photos")}
                accept="image/*"
                multiple
                className="w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-400 transition-all duration-300 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:transition-all file:duration-200 cursor-pointer"
              />
            </div>
            
            <div className="mt-3 flex items-center text-gray-500">
              <p className="text-sm">
                Formatos aceitos: JPG, PNG, GIF. Máximo 5 fotos. Isso pode ajudar muito na identificação!
              </p>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Botão cancelar */}
          <button
            type="button"
            onClick={() => setIsFormOpen(false)}
            className="inline-flex justify-center items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-semibold border-2 border-gray-200 hover:border-gray-300"
          >
            Cancelar
          </button>

          {/* Botão enviar */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex justify-center items-center px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
              isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none transform-none"
                : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-400 border-t-transparent mr-3"></div>
                Enviando observação...
              </>
            ) : (
              <>
                Enviar Observação
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};