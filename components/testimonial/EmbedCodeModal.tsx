'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, X, Code, Frame } from 'lucide-react';
import { toast } from 'sonner';

interface EmbedCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonioId: string;
  titulo?: string;
}

export function EmbedCodeModal({ isOpen, onClose, testimonioId, titulo }: EmbedCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'script' | 'iframe'>('iframe');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  if (!isOpen) return null;

  const generateIframeCode = () => {
    return `<iframe
  src="${baseUrl}/embed/testimonials/${testimonioId}"
  width="100%"
  height="400"
  frameborder="0"
  style="border: 1px solid #e5e7eb; border-radius: 8px;"
  title="Testimonio${titulo ? ` - ${titulo}` : ''}"
></iframe>`;
  };

  const generateScriptCode = () => {
    return `<!-- Widget de Testimonio Individual -->
<div id="testimonial-${testimonioId}"></div>
<script>
  (function() {
    var container = document.getElementById('testimonial-${testimonioId}');
    var iframe = document.createElement('iframe');
    iframe.src = '${baseUrl}/embed/testimonials/${testimonioId}';
    iframe.width = '100%';
    iframe.height = '400';
    iframe.frameBorder = '0';
    iframe.style.border = '1px solid #e5e7eb';
    iframe.style.borderRadius = '8px';
    container.appendChild(iframe);
  })();
</script>`;
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Código copiado al portapapeles');
    setTimeout(() => setCopied(false), 2000);
  };

  const embedCode = activeTab === 'iframe' ? generateIframeCode() : generateScriptCode();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Código para Embeber Testimonio</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {titulo && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Testimonio:</strong> {titulo}
              </p>
            </div>
          )}

          <div className="mb-4">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('iframe')}
                className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${activeTab === 'iframe'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                <Frame size={18} />
                Iframe
              </button>
              <button
                onClick={() => setActiveTab('script')}
                className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${activeTab === 'script'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                <Code size={18} />
                Script
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">
                {activeTab === 'iframe' ? 'Código Iframe' : 'Código Script'}
              </h3>
              <button
                onClick={() => copyToClipboard(embedCode)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copiar Código
                  </>
                )}
              </button>
            </div>
            <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto text-sm border border-gray-300">
              <code>{embedCode}</code>
            </pre>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Instrucciones:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-900">
              <li>Copia el código usando el botón "Copiar Código"</li>
              <li>Pega el código en el HTML de tu sitio web</li>
              <li>El testimonio se mostrará automáticamente en esa ubicación</li>
              <li>El iframe se adapta al ancho del contenedor (responsive)</li>
            </ol>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Vista Previa:</h4>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              {baseUrl && (
                <iframe
                  src={`${baseUrl}/embed/testimonials/${testimonioId}`}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  style={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  title="Vista previa del testimonio"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
