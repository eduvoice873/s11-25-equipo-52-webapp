"use client";
import { TestimonialRender_admin } from "./testimonial_render-admin";
import { testimonialsData } from "../landing/components/data";
import DashboardLayout from "@/components/dashboard/DashboardLayout";


export default function GestorTestimonial() {
    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-xl font-semibold">Bienvenido al dashboard</h1>
                <div className="mt-6">
                    <TestimonialRender_admin testimonials={testimonialsData} />
                </div>
            </div>
        </DashboardLayout>
    );
}