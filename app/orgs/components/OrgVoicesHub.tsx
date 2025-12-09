"use client";

import { useState } from "react";
import { Search, ChevronDown, Star, MessageCircle, BookOpen, Calendar, Film } from "lucide-react";
import Imagen from "next/image";

interface Testimonial {
  id?: string | number;
  author: string;
  program: string;
  content: string;
  year: number;
  type: string;
  image: string;
}

export default function OrgWallOfLove({ testimonials }: { testimonials: Testimonial[] }) {
  const [query, setQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Obtener opciones únicas para los filtros
  const programs = [...new Set(testimonials.map((t: Testimonial) => t.program))];
  const years = [...new Set(testimonials.map((t: Testimonial) => t.year))].sort((a: number, b: number) => b - a);
  const types = ["Video", "Texto", "Imagen"];

  const filtered = testimonials.filter((t) => {
    const matchSearch = query === "" ||
      t.author.toLowerCase().includes(query.toLowerCase()) ||
      t.program.toLowerCase().includes(query.toLowerCase()) ||
      t.content.toLowerCase().includes(query.toLowerCase());

    const matchProgram = programFilter === "" || t.program === programFilter;
    const matchYear = yearFilter === "" || t.year === parseInt(yearFilter);
    const matchType = typeFilter === "" || t.type === typeFilter;

    return matchSearch && matchProgram && matchYear && matchType;
  });

  return (
    <section className="min-h-screen bg-linear-to-b from-slate-50 to-white text-gray-900">

      {/* Header */}
      <header className="w-full border-b border-gray-100 py-4 px-6 flex justify-between items-center bg-white sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <Imagen src="/EduVoiceCMS_logo.svg" alt="Eduvoice CMS Logo" width={40} height={40} className="h-12 w-auto" />
          <h2 className="text-lg md:text-xl font-bold bg-linear-to-r from-brand-blue to-blue-600 bg-clip-text text-transparent">EduVoice Space</h2>
        </div>
        <a
          href="#" // Aquí ponemos el enlace al formulario de testimonio
          className="bg-brand-blue px-5 py-2 text-sm font-semibold rounded-lg text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all whitespace-nowrap"
        >
          Deja tu testimonio
        </a>
      </header>

      {/* Hero Voices Hub */}
      <div className="max-w-7xl mx-auto px-6 mt-20 text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Conoce la experiencia de nuestra comunidad
        </h1>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
          Explora las historias y testimonios de nuestros alumnos y descubre lo que hace especial a nuestra institución.
        </p>

        {/* Buscador y Filtros */}
        <div className="mt-12 flex flex-col md:flex-row gap-3 justify-center items-center flex-wrap bg-white p-4 rounded-2xl shadow-md border border-gray-100">
          <div className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl flex items-center gap-3 w-full md:w-80 focus-within:border-brand-blue focus-within:shadow-md transition">
            <Search className="w-5 h-5 text-brand-blue" />
            <input
              type="text"
              placeholder="Buscar por nombre, curso..."
              className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Filtro Programa Académico */}
          <div className="relative w-full md:w-56 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-blue shrink-0" />
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl appearance-none text-gray-700 cursor-pointer hover:border-brand-blue hover:shadow-md transition font-medium"
            >
              <option value="">Programa Académico</option>
              {programs.map((program) => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Filtro Año de Graduación */}
          <div className="relative w-full md:w-56 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-blue shrink-0" />
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl appearance-none text-gray-700 cursor-pointer hover:border-brand-blue hover:shadow-md transition font-medium"
            >
              <option value="">Año de Graduación</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Filtro Tipo */}
          <div className="relative w-full md:w-56 flex items-center gap-2">
            <Film className="w-5 h-5 text-brand-blue shrink-0" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl appearance-none text-gray-700 cursor-pointer hover:border-brand-blue hover:shadow-md transition font-medium"
            >
              <option value="">Tipo de Contenido</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Resultados Counter */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-gray-600 font-medium">
          Mostrando <span className="text-brand-blue font-bold">{filtered.length}</span> testimonio{filtered.length !== 1 ? 's' : ''} de <span className="text-brand-blue font-bold">{testimonials.length}</span>
        </p>
      </div>

      {/* GRID INSTITUCIONAL */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <div key={i} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue transition-all duration-300 transform hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.author}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Badge de tipo */}
                  <div className="absolute top-3 right-3 bg-brand-blue text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.type}
                  </div>
                  {/* Badge de año */}
                  <div className="absolute top-3 left-3 bg-white bg-opacity-90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="flex gap-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-brand-blue shrink-0" />
                    <p className="font-semibold text-gray-900 text-base leading-relaxed line-clamp-3">"{item.content}"</p>
                  </div>

                  {/* Author Info */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-bold text-gray-900">{item.author}</p>
                    <p className="text-sm text-brand-blue font-medium">{item.program}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-20">
            <div className="bg-white p-12 rounded-2xl border border-gray-200 max-w-md mx-auto">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No se encontraron testimonios con los filtros seleccionados.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setProgramFilter("");
                  setYearFilter("");
                  setTypeFilter("");
                }}
                className="mt-6 bg-brand-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-200 bg-white">
        © {new Date().getFullYear()} {`Nombre de tu institución`}.
        Todos los derechos reservados.
        <br />
        Powered by{" "}
        <a href="/" className="text-brand-blue font-bold hover:underline">
          EduVoice
        </a>
      </footer>
    </section>
  );
}