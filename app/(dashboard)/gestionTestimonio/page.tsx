"use client";

import { useState, useEffect } from "react";
import { TestimonialRender_admin } from "./testimonial_render-admin";
import { TestimonialFilters } from "@/components/testimonial/TestimonialFilters";

export default function GestorTestimonial() {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [stats, setStats] = useState({
        total: 0,
        pendientes: 0,
        aprobados: 0,
        rechazados: 0,
    });

    useEffect(() => {
        fetch('/api/respuestas-formulario/stats')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error('Error al cargar estadísticas:', err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Gestión de Testimonios</h1>

            <TestimonialFilters
                filter={filter}
                search={search}
                onFilterChange={setFilter}
                onSearchChange={setSearch}
                stats={stats}
            />

            <TestimonialRender_admin
                initialTestimonials={[]}
                filter={filter}
                search={search}
            />
        </div>
    );
}