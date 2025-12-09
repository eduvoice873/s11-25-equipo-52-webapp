import React from 'react';

export default function ApiSection() {
  return (
    <section id="api" className="py-24 bg-linear-to-br from-brand-blue to-[#172B5E] text-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-brand-light"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-brand-yellow"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <span className="text-brand-yellow font-extrabold text-sm uppercase tracking-wider">Developer First</span>
          <h2 className="text-4xl md:text-5xl font-black text-background">
            Integra testimonios en <span className="text-brand-yellow">minutos</span>, no días
          </h2>
          <p className="text-blue-100 text-xl leading-relaxed font-lato">
            API REST completa y documentada. Integra testimonios en tu LMS, app móvil o sitio web sin
            fricciones.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="bg-brand-yellow/20 p-3 rounded-xl shrink-0">
                <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Documentación Swagger en Vivo</h4>
                <p className="text-blue-200 font-lato">Prueba endpoints directamente desde el navegador</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-yellow/20 p-3 rounded-xl shrink-0">
                <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">CDN Global Ultra-Rápido</h4>
                <p className="text-blue-200 font-lato">Videos y assets servidos desde el edge más cercano</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-yellow/20 p-3 rounded-xl shrink-0">
                <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                  </path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Seguridad Empresarial</h4>
                <p className="text-blue-200 font-lato">Autenticación por tokens, rate limiting y encriptación</p>
              </div>
            </div>
          </div>

          <a href="/documentation" className="border-2 border-brand-yellow text-brand-yellow px-8 py-4 rounded-xl font-bold shadow-lg mt-6 hover:bg-brand-yellow hover:text-brand-blue transition-colors w-fit">
            Ver Documentación API →
          </a>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 font-mono text-sm overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-brand-light text-xs font-semibold">GET /api/v1/testimonials</span>
          </div>

          <pre className="p-6 overflow-x-auto text-gray-100 text-xs leading-relaxed">
            <code>
              <span className="text-purple-400">fetch</span>(<span className="text-amber-300">'https://api.eduvoicecms.com/v1/testimonials'</span>, {'{'}
              {'\n'}  <span className="text-cyan-400">method</span>: <span className="text-amber-300">'GET'</span>,
              {'\n'}  <span className="text-cyan-400">headers</span>: {'{'}
              {'\n'}    <span className="text-green-400">'Authorization'</span>: <span className="text-amber-300">'Bearer YOUR_API_KEY'</span>,
              {'\n'}    <span className="text-green-400">'Content-Type'</span>: <span className="text-amber-300">'application/json'</span>
              {'\n'}  {'}'},
              {'\n'}  <span className="text-cyan-400">params</span>: {'{'}
              {'\n'}    <span className="text-green-400">category</span>: <span className="text-amber-300">'bootcamp'</span>,
              {'\n'}    <span className="text-green-400">status</span>: <span className="text-amber-300">'approved'</span>,
              {'\n'}    <span className="text-green-400">limit</span>: <span className="text-purple-400">10</span>
              {'\n'}  {'}'}
              {'\n'}{'}'})
              {'\n'}.<span className="text-blue-400">then</span>(<span className="text-yellow-200">response</span> ={'>'} <span className="text-yellow-200">response</span>.<span className="text-blue-400">json</span>())
              {'\n'}.<span className="text-blue-400">then</span>(<span className="text-yellow-200">data</span> ={'>'} {'{'}
              {'\n'}  <span className="text-gray-500">// Response:</span>
              {'\n'}  <span className="text-gray-500">// {'{'}</span>
              {'\n'}  <span className="text-gray-500">//   "testimonials": [</span>
              {'\n'}  <span className="text-gray-500">//     {'{'}</span>
              {'\n'}  <span className="text-gray-500">//       "id": "abc123",</span>
              {'\n'}  <span className="text-gray-500">//       "student": "María García",</span>
              {'\n'}  <span className="text-gray-500">//       "video_url": "https://cdn.eduvoicecms...",</span>
              {'\n'}  <span className="text-gray-500">//       "category": "bootcamp",</span>
              {'\n'}  <span className="text-gray-500">//       "tags": ["desarrollo-web", "2024"]</span>
              {'\n'}  <span className="text-gray-500">//     {'}'}</span>
              {'\n'}  <span className="text-gray-500">//   ]</span>
              {'\n'}  <span className="text-gray-500">// {'}'}</span>
              {'\n'}{'}'});
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
