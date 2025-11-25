import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; 
import {
  Bell as BellIcon,
  Settings as SettingIcon,
  CircleUserRound as UserIcon,
  MoreHorizontal,
  Plus
} from "lucide-react";
import Image from "next/image";

export default function DashboardSpacePage() {
  return (
    <>
      <div className="min-h-screen bg-muted/30 font-nunito">

        {/* HEADER */}
        <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">

            <div className="relative w-20 h-10">

               <Image src="/EduVoiceCMS_logo.png" alt="Logo" fill className="object-contain" />

            </div>
            <h1 className="font-lato font-bold text-xl text-primary">EduVoice CMS</h1>
          </div>

          <nav>
            <ul className="flex items-center gap-6">
              <li className="w-64">
                <Input placeholder="Search Spaces..." className="bg-gray-50 border-gray-200 focus:border-secondary" />
              </li>
              <li>
                <button className="text-gray-500 hover:text-primary transition-colors">
                  <BellIcon size={20} />
                </button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-primary transition-colors">
                  <SettingIcon size={20} />
                </button>
              </li>
              <li>
                <button className="text-primary hover:text-blue-900 transition-colors">
                  <UserIcon size={28} />
                </button>
              </li>
            </ul>
          </nav>
        </header>

        <main className="p-8 max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-800 font-lato">Dashboard</h1>

          {/* STATS SECTION */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Tarjeta Stat */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Videos</h2>
              <p className="text-3xl font-bold text-gray-900">152</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Texto</h2>
              <p className="text-3xl font-bold text-gray-900">310</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Testimonios</h2>
              <p className="text-3xl font-bold text-gray-900">462</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Spaces</h2>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Plan</h2>
              <p className="text-3xl font-bold text-gray-900">Pro</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Plan Usage</h2>
              <p className="text-3xl font-bold text-gray-900">65%</p>
            </div>
          </section>

          {/* SPACES SECTION */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 font-lato">Categoria</h2>
              <Button className="bg-blue-800 hover:bg-blue-800/90 cursor-pointer text-white gap-2 px-6" variant={undefined} size={undefined}>
                <Plus size={18} /> Crear Nueva Categoría
              </Button>
            </div>


            {/* <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
              No hay space disponibles. Crea un nuevo space para comenzar a organizar tu contenido.
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* TARJETA SPACE */}
              <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-secondary transition-all group cursor-pointer">
                <header className="flex justify-between items-start mb-4">
                   <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">Case Study Campaign Q4</h3>
                   <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                     <MoreHorizontal size={20} />
                   </button>
                </header>

                <div className="mb-6">
                  <p className="text-sm text-gray-600">15 Videos, 28 Textos</p>
                </div>

                <footer className="flex justify-between items-center text-xs pt-4 border-t border-gray-50">
                  <small className="text-gray-400">Última actualización: Hace 2 días</small>
                  <span className="flex items-center gap-1.5 text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Activo
                  </span>
                </footer>
              </article>

              {/* Tarjeta 2 (Ejemplo) */}
              <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-secondary transition-all group cursor-pointer">
                <header className="flex justify-between items-start mb-4">
                   <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">New Website Launch</h3>
                   <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                     <MoreHorizontal size={20} />
                   </button>
                </header>

                <div className="mb-6">
                  <p className="text-sm text-gray-600">8 Videos, 12 Textos</p>
                </div>

                <footer className="flex justify-between items-center text-xs pt-4 border-t border-gray-50">
                  <small className="text-gray-400">Última actualización: Hace 5 días</small>
                  <span className="flex items-center gap-1.5 text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Activo
                  </span>
                </footer>
              </article>

               {/* Tarjeta 3 (Ejemplo Draft) */}
               <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-secondary transition-all group cursor-pointer">
                <header className="flex justify-between items-start mb-4">
                   <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">University Admissions 2024</h3>
                   <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                     <MoreHorizontal size={20} />
                   </button>
                </header>

                <div className="mb-6">
                  <p className="text-sm text-gray-600">32 Videos, 55 Textos</p>
                </div>

                <footer className="flex justify-between items-center text-xs pt-4 border-t border-gray-50">
                  <small className="text-gray-400">Última actualización: Hace 1 semana</small>
                  <span className="flex items-center gap-1.5 text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                   Borrador
                  </span>
                </footer>
              </article>

            </div>
          </section>
        </main>
      </div>
    </>
  );
}