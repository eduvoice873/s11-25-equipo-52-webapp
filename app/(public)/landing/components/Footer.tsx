
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image src="/EduVoiceCMS_logo.png" alt="EduVoice CMS Logo" width={32} height={32} className="h-8 w-auto" />
            <span className="text-xl font-extrabold text-background">EduVoice CMS</span>
          </div>
          <p className="text-sm text-gray-400 font-lato">
            EduVoice CMS es la plataforma líder en gestión de testimonios para instituciones educativas y
            empresas EdTech.
          </p>
          <p className="text-xs text-gray-500 font-lato">
            © 2025 EduVoice CMS. Todos los derechos reservados.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-background mb-4">Producto</h4>
          <ul className="space-y-3 text-sm font-lato">
            <li><a href="#caracteristicas" className="hover:text-brand-light transition-colors">Características</a></li>
            <li><a href="#api" className="hover:text-brand-light transition-colors">API Docs</a></li>
            <li><a href="#casos" className="hover:text-brand-light transition-colors">Casos de Uso</a></li>
            <li><Link href="/pricing" className="hover:text-brand-light transition-colors">Precios</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-background mb-4">Recursos</h4>
          <ul className="space-y-3 text-sm font-lato">
            <li><Link href="/documentation" className="hover:text-brand-light transition-colors">Documentación</Link></li>
            <li><Link href="/blog" className="hover:text-brand-light transition-colors">Blog</Link></li>
            <li><Link href="/guides" className="hover:text-brand-light transition-colors">Guías</Link></li>
            <li><Link href="/support" className="hover:text-brand-light transition-colors">Soporte</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-background mb-4">Empresa</h4>
          <ul className="space-y-3 text-sm font-lato">
            <li><Link href="/about" className="hover:text-brand-light transition-colors">Sobre Nosotros</Link></li>
            <li><Link href="/contact" className="hover:text-brand-light transition-colors">Contacto</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-light transition-colors">Privacidad</Link></li>
            <li><Link href="/terms" className="hover:text-brand-light transition-colors">Términos</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
