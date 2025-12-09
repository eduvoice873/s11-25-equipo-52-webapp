


import { Metadata } from "next";
import GestorTestimonial from "../gestionTestimonio/page";

import DashboardCategoryPage from "@/components/dashboard-category/page";




export const metadata: Metadata =
{
title: "Home",
description: "Panel de control principal de EduVoice CMS",
icons: {
    icon: '/EduVoiceCMS_logo-SN.png',
  },
}


export default function HomePage() {

  return (
    <DashboardCategoryPage />
  )
}
