import { Testimonial } from "./VoicesHub";
import type { AdminTestimonialProps } from "@/components/ui/testimonial/Admin";

export const testimonialsData: AdminTestimonialProps[] = [
  {
    person: {
      nombreCompleto: "Universidad Nacional",
      correo: "rector@universidad.edu",
      role: "Rector",
    },
    testimonial: {
      titulo: "Impacto positivo en estudiantes",
      texto: "EduVoice nos ha permitido recopilar testimonios auténticos de nuestros estudiantes de manera sencilla y profesional.",
      estado: "aprobado",
      media: {
        type: "image",
        previewUrl: "https://img.freepik.com/fotos-premium/educacion-espalda-mujer-negra-celebracion-graduacion-exito-diploma-persona-graduada-nina-titulo-universidad-certificado-conocimiento_590464-186404.jpg",
      },
      destacado: false,
      calificacion: 5,
      date: "Hace 2 días",
      tags: ["Educación", "Universidad"],
      history: [
        { user: 'Elena', message: "aprobó el testimonio", notes: "Tema relevante del evento", time: "2 hours ago" }
      ],
    },
  },
  {
    person: {
      nombreCompleto: "Colegio Privado",
      correo: "directora@colegio.edu",
      role: "Directora Académica",
    },
    testimonial: {
      titulo: "Experiencia intuitiva",
      texto: "La plataforma es intuitiva y nuestros estudiantes disfrutan dejando sus testimonios sobre sus experiencias.",
      estado: "publicado",
      media: {
        type: "video",
        previewUrl: "https://youtu.be/nva3pL-N5bI?si=1r0c7AyQ39Ex7e4G",
      },
      destacado: true,
      calificacion: 5,
      date: "Hace 3 días",
      tags: ["Educación", "Testimonios"],
      history: [
        { user: 'Admin', message: "archivó el testimonio", time: "10 hours ago" }
      ],
    },
  },
  {
    person: {
      nombreCompleto: "StartupHub Tech",
      correo: "ceo@startuphub.com",
      role: "CEO & Founder",
    },
    testimonial: {
      titulo: "Aumento en social proof",
      texto: "EduVoice transformó cómo compartimos historias de éxito de nuestros clientes. La herramienta es intuitiva y ha aumentado nuestro social proof en un 250%.",
      estado: "en_revision",
      destacado: false,
      calificacion: 5,
      date: "Ayer",
      tags: ["Tecnología", "Innovación"],
      history: [],
    },
  },
  {
    person: {
      nombreCompleto: "Escuela de Artes",
      correo: "coordinacion@escueladeartes.edu",
      role: "Coordinadora de Admisiones",
    },
    testimonial: {
      texto: "Hemos recopilado más de 50 testimonios en video en solo un mes. Herramienta increíble y fácil de usar.",
      estado: "aprobado",
      media: {
        type: "video",
        previewUrl: "https://youtu.be/nva3pL-N5bI?si=1r0c7AyQ39Ex7e4G",
      },
      destacado: false,
      calificacion: 5,
      date: "Hace 5 días",
      tags: ["Artes", "Video"],
      history: [
        { user: 'Elena', message: "aprobó el testimonio", time: "2 days ago" }
      ],
    },
  },
  {
    person: {
      nombreCompleto: "Bootcamp de Tecnología",
      correo: "fundador@bootcamp.com",
      role: "Fundador",
    },
    testimonial: {
      texto: "Aumentó nuestras inscripciones en 3X con este increíble ROI.",
      estado: "rechazado",
      media: {
        type: "image",
        previewUrl: "https://img.freepik.com/fotos-premium/educacion-espalda-mujer-negra-celebracion-graduacion-exito-diploma-persona-graduada-nina-titulo-universidad-certificado-conocimiento_590464-186404.jpg",
      },
      destacado: true,
      calificacion: 5,
      date: "Hace 2 semanas",
      tags: ["Tecnología", "Marketing"],
      history: [
        { user: 'Admin', message: "rechazó el testimonio", notes: "Contenido inapropiado", time: "5 hours ago" }
      ],
    },
  },
  {
    person: {
      nombreCompleto: "Academia de Idiomas",
      correo: "directora@academiaidiomas.edu",
      role: "Directora General",
    },
    testimonial: {
      texto: "Nuestros profesores y estudiantes recomiendan EduVoice. La mejor inversión en social proof que hemos hecho.",
      estado: "aprobado",
      destacado: false,
      calificacion: 5,
      date: "Hace 4 días",
      tags: ["Idiomas", "Educación"],
      history: [],
    },
  },
  {
    person: {
      nombreCompleto: "Universidad Privada",
      correo: "vicerrector@privada.edu",
      role: "Vicerrector de Admisiones",
    },
    testimonial: {
      texto: "Los testimonios en video son mucho más convincentes que el texto. Nuestras tasas de inscripción han mejorado.",
      estado: "aprobado",
      media: {
        type: "video",
        previewUrl: "https://youtu.be/nva3pL-N5bI?si=1r0c7AyQ39Ex7e4G",
      },
      destacado: false,
      calificacion: 5,
      date: "Hace 6 días",
      tags: ["Universidad", "Video"],
      history: [],
    },
  },
  {
    person: {
      nombreCompleto: "Centro de Capacitación",
      correo: "gerente@centrocap.com",
      role: "Gerente de Proyectos",
    },
    testimonial: {
      texto: "Resultados excepcionales en poco tiempo.",
      estado: "publicado",
      media: {
        type: "image",
        previewUrl: "https://img.freepik.com/fotos-premium/educacion-espalda-mujer-negra-celebracion-graduacion-exito-diploma-persona-graduada-nina-titulo-universidad-certificado-conocimiento_590464-186404.jpg",
      },
      destacado: true,
      calificacion: 5,
      date: "Hace 1 día",
      tags: ["Capacitación", "Resultados"],
      history: [
        { user: 'Elena', message: "revisó y aprobó", time: "1 hour ago" },
        { user: 'Admin', message: "publicó el testimonio", time: "30 minutes ago" }
      ],
    },
  },
  {
    person: {
      nombreCompleto: "Instituto de Formación",
      correo: "marketing@institutof.com",
      role: "Responsable de Marketing",
    },
    testimonial: {
      texto: "Excelente herramienta para construir confianza en nuevos prospectos. La recomendamos ampliamente.",
      estado: "en_revision",
      destacado: false,
      calificacion: 5,
      date: "Hace 3 horas",
      tags: ["Marketing"],
      history: [
        { user: 'Admin', message: "envió a revisión", time: "4 hours ago" }
      ],
    },
  },
  {
    person: {
      nombreCompleto: "Plataforma de Cursos Online",
      correo: "ceo@platform.com",
      role: "CEO",
    },
    testimonial: {
      texto: "Con EduVoice hemos creado una comunidad de defensores de nuestra marca. Los alumnos aman compartir sus historias.",
      estado: "aprobado",
      destacado: false,
      calificacion: 5,
      media: {
        type: "video",
        previewUrl: "https://youtu.be/nva3pL-N5bI?si=1r0c7AyQ39Ex7e4G",
      },
      date: "Hace 2 horas",
      tags: ["Cursos", "Comunidad"],
      history: [],
    },
  },
  {
    person: {
      nombreCompleto: "Escuela de Negocios",
      correo: "director@escueladenegocios.com",
      role: "Director Ejecutivo",
    },
    testimonial: {
      texto: "Desde que implementamos EduVoice, nuestro sitio web tiene un 40% más de engagement.",
      estado: "aprobado",
      destacado: false,
      calificacion: 5,
      date: "Ayer",
      tags: ["Negocios", "Engagement"],
      history: [
        { user: 'Elena', message: "aprobó el testimonio", time: "3 days ago" }
      ],
    },
  },
];



export const ALL_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    tipo: 'texto',
    autor: {
      nombre: "Universidad Nacional",
      cargo: "Rector",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rector1",
    },
    contenido: "EduVoice nos ha permitido recopilar testimonios auténticos de nuestros estudiantes de manera sencilla y profesional.",
    estrellas: 5,
    fecha: "Hace 2 días"
  },


  {
    id: 2,
    tipo: 'texto',
    autor: {
      nombre: "Colegio Privado",
      cargo: "Directora Académica",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=director4",
    },
    contenido: "La plataforma es intuitiva y nuestros estudiantes disfrutan dejando sus testimonios sobre sus experiencias.",
    estrellas: 5,
    fecha: "Hace 3 días",
    likes: 12
  },
  {
    id: 3,
    tipo: 'texto',
    autor: {
      nombre: "StartupHub Tech",
      cargo: "CEO & Founder",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech_ceo5",
    },
    contenido: "EduVoice transformó cómo compartimos historias de éxito de nuestros clientes. La herramienta es intuitiva y ha aumentado nuestro social proof en un 250%.",
    estrellas: 5,
    fecha: "Ayer",
    likes: 24
  },
  {
    id: 4,
    tipo: 'video',
    autor: {
      nombre: "Escuela de Artes",
      cargo: "Coordinadora de Admisiones",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=coordinator6",
    },
    contenido: "Hemos recopilado más de 50 testimonios en video en solo un mes. Herramienta increíble y fácil de usar.",
    estrellas: 5,
    fecha: "Hace 5 días"
  },
  {
    id: 5,
    tipo: 'imagen',
    autor: {
      nombre: "Bootcamp de Tecnología",
      cargo: "Fundador",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=founder3",
    },
    contenido: "Aumentó nuestras inscripciones en 3X con este increíble ROI.",
    estrellas: 5,
    destacado: "3X Inscripciones",
    fecha: "Hace 2 semanas"
  },
  {
    id: 6,
    tipo: 'texto',
    autor: {
      nombre: "Academia de Idiomas",
      cargo: "Directora General",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=director7",
    },
    contenido: "Nuestros profesores y estudiantes recomiendan EduVoice. La mejor inversión en social proof que hemos hecho.",
    estrellas: 5,
    fecha: "Hace 4 días",
    likes: 15
  },
  {
    id: 7,
    tipo: 'video',
    autor: {
      nombre: "Universidad Privada",
      cargo: "Vicerrector de Admisiones",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vicerrector8",
    },
    contenido: "Los testimonios en video son mucho más convincentes que el texto. Nuestras tasas de inscripción han mejorado.",
    estrellas: 5,
    fecha: "Hace 6 días"
  },
  {
    id: 8,
    tipo: 'imagen',
    autor: {
      nombre: "Centro de Capacitación",
      cargo: "Gerente de Proyectos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=manager9",
    },
    contenido: "Resultados excepcionales en poco tiempo.",
    estrellas: 5,
    destacado: "97% Satisfacción",
    fecha: "Hace 1 día"
  },
  {
    id: 9,
    tipo: 'texto',
    autor: {
      nombre: "Instituto de Formación",
      cargo: "Responsable de Marketing",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marketing10",
    },
    contenido: "Excelente herramienta para construir confianza en nuevos prospectos. La recomendamos ampliamente.",
    estrellas: 5,
    fecha: "Hace 3 horas",
    likes: 22
  },
  {
    id: 10,
    tipo: 'video',
    autor: {
      nombre: "Plataforma de Cursos Online",
      cargo: "CEO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ceo11",
    },
    contenido: "Con EduVoice hemos creado una comunidad de defensores de nuestra marca. Los alumnos aman compartir sus historias.",
    estrellas: 5,
    fecha: "Hace 2 horas"
  },
  {
    id: 11,
    tipo: 'texto',
    autor: {
      nombre: "Escuela de Negocios",
      cargo: "Director Ejecutivo",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=executive12",
    },
    contenido: "Desde que implementamos EduVoice, nuestro sitio web tiene un 40% más de engagement.",
    estrellas: 5,
    fecha: "Ayer",
    likes: 18
  }
];

export const ORG_TESTIMONIALS = [
  {
    author: "Ana García",
    program: "Ingeniería de Software",
    content: "Una experiencia transformadora que cambió mi carrera.",
    image: "https://picsum.photos/id/1011/800/600",
    year: 2024,
    type: "Texto"
  },
  {
    author: "Carlos Rodríguez",
    program: "Marketing Digital",
    content: "Los profesores son de clase mundial y el apoyo es increíble.",
    image: "https://picsum.photos/id/1015/800/600",
    year: 2023,
    type: "Video"
  },
  {
    author: "Elena Martínez",
    program: "Ciencia de Datos",
    content: "Aprendí habilidades prácticas que apliqué desde el primer día.",
    image: "https://picsum.photos/id/1005/800/600",
    year: 2024,
    type: "Texto"
  },
  {
    author: "Javier Moreno",
    program: "Diseño UX/UI",
    content: "La comunidad de estudiantes es colaborativa y diversa.",
    image: "https://picsum.photos/id/1027/800/600",
    year: 2023,
    type: "Imagen"
  },
  {
    author: "Lucía Torres",
    program: "Administración de Empresas",
    content: "El programa superó todas mis expectativas.",
    image: "https://picsum.photos/id/1001/800/600",
    year: 2024,
    type: "Texto"
  },
  {
    author: "Marcos Sánchez",
    program: "Desarrollo Web Full-Stack",
    content: "Nunca imaginé que aprender en línea pudiera ser tan atractivo.",
    image: "https://picsum.photos/id/1033/800/600",
    year: 2023,
    type: "Video"
  },
];


export const PREVIEW_TESTIMONIALS = ALL_TESTIMONIALS.slice(0, 3);
