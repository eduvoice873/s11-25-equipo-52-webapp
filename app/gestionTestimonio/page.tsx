"use client";
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Sidebar } from "@/components/ui/sidebar";
import { TestimonialRender } from "../voices-hub/testimonial_render";
import { testimonialsData } from "../landing/components/data";


export default function GestorTestimonial() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Navbar arriba */}
            <Navbar onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Contenedor principal con flex */}
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Contenido principal, ocupa todo lo que queda */}
                <main className="flex-1 p-6">

                    <div>
                        <TestimonialRender testimonials={testimonialsData} />
                    </div>

                </main>
            </div>
        </>
    );
}