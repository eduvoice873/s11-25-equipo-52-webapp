import React from 'react';

export default function ApiSection() {
  return (
    <section id="widgets" className="py-24 bg-linear-to-br from-brand-blue to-[#172B5E] text-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-brand-light"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-brand-yellow"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <span className="text-brand-yellow font-extrabold text-sm uppercase tracking-wider">Sin Código</span>
          <h2 className="text-4xl md:text-5xl font-black text-background font-nunito">
            Widgets embebibles en <span className="text-brand-yellow">segundos</span>
          </h2>
          <p className="text-blue-100 text-xl leading-relaxed font-lato">
            Genera el código embed y pégalo en tu sitio web. Tus testimonios se actualizan automáticamente sin tocar código.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="bg-brand-yellow/20 p-3 rounded-xl shrink-0">
                <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 font-nunito">Copia y Pega</h4>
                <p className="text-blue-200 font-lato">Una sola línea de código, sin configuración compleja</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-yellow/20 p-3 rounded-xl shrink-0">
                <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 font-nunito">Actualización Automática</h4>
                <p className="text-blue-200 font-lato">Los nuevos testimonios aparecen sin redesplegar tu sitio</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-brand-yellow/20 p-3 rounded-xl shrink-0">
                <svg className="w-6 h-6 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 font-nunito">Totalmente Personalizable</h4>
                <p className="text-blue-200 font-lato">Colores, estilos, diseño grid o carrusel, filtros por tags</p>
              </div>
            </div>
          </div>

          <a href="/signup" className="border-2 border-brand-yellow text-brand-yellow px-8 py-4 rounded-xl font-bold shadow-lg mt-6 hover:bg-brand-yellow hover:text-brand-blue transition-colors w-fit font-nunito">
            Generar Widget Ahora →
          </a>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 font-mono text-sm overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-brand-light text-xs font-semibold">embed-widget.html</span>
          </div>

          <pre className="p-6 overflow-x-auto text-gray-100 text-xs leading-relaxed">
            <code>
              <span className="text-gray-500">{'<!-- EduVoice CMS Widget -->'}</span>
              {'\n'}<span className="text-purple-400">{'<div'}</span>
              {'\n'}  <span className="text-cyan-400">id</span>=<span className="text-amber-300">"eduvoice-widget"</span>
              {'\n'}  <span className="text-cyan-400">data-orgid</span>=<span className="text-amber-300">"1a77bf0a-e9fc-4acd-97a0-e4c323c29fa5"</span>
              {'\n'}  <span className="text-cyan-400">data-category</span>=<span className="text-amber-300">"52d6e038-d78e-4222-8fc3-12e286c46be4"</span>
              {'\n'}  <span className="text-cyan-400">data-layout</span>=<span className="text-amber-300">"grid"</span>
              {'\n'}<span className="text-purple-400">{'></div>'}</span>
              {'\n'}<span className="text-purple-400">{'<script'}</span>
              {'\n'}  <span className="text-cyan-400">src</span>=<span className="text-amber-300">"https://eduvoice-cms.vercel.app/widget.js"</span>
              {'\n'}<span className="text-purple-400">{'></script>'}</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
