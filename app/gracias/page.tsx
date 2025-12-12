"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, Home, ArrowRight } from "lucide-react";

export default function GraciasPage() {
  const router = useRouter();
  const [mensaje, setMensaje] = useState("");
  const [urlRetorno, setUrlRetorno] = useState("/");

  useEffect(() => {
    // Leer el mensaje y URL personalizada desde sessionStorage
    const mensajeGuardado = sessionStorage.getItem("mensajeGracias");
    const urlGuardada = sessionStorage.getItem("urlVolverAlInicio");

    if (mensajeGuardado) {
      setMensaje(mensajeGuardado);
      sessionStorage.removeItem("mensajeGracias");
    }

    if (urlGuardada) {
      setUrlRetorno(urlGuardada);
      sessionStorage.removeItem("urlVolverAlInicio");
    }
  }, []);

  const mensajeDefault = "Tu aporte ha sido enviado correctamente y ayudará a otras personas a conocer experiencias reales.";

  return (
    <div className="min-h-screen  from-green-50 to-emerald-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        {/* Icono de éxito */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Gracias por tu testimonio!
        </h1>

        {/* Descripción */}
        <p className="text-gray-600 mb-2 text-base leading-relaxed">
          {mensaje || mensajeDefault}
        </p>

        <p className="text-gray-500 text-sm mb-8">
          Revisaremos tu testimonio pronto y lo publicaremos en nuestras plataformas.
        </p>

        {/* Beneficios */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">¿Qué ocurre ahora?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Tu testimonio será revisado por nuestro equipo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Será publicado en nuestras plataformas</span>
            </li>
          </ul>
        </div>



        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6">
          Si tienes preguntas, contáctanos en support@eduvoice.com
        </p>
      </div>
    </div>
  );
}
