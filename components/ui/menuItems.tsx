import { Home, Mail, FileText, Star, Users } from "lucide-react";

export const menuItems = [
  {
    label: "Inbox",
    href: "/inbox",
    icon: <Mail stroke="#B0BAD4" />,
    badge: 32,
    active: true,
  },
  {
    label: "Video",
    href: "/video",
    icon: <Home />,
    badge: 32,
  },
  {
    label: "Texto",
    href: "/text",
    icon: <FileText />,
    badge: 32,
  },
  {
    label: "Like",
    href: "/like",
    icon: <Star />,
    badge: 32,
  },
  {
    label: "Archivado",
    href: "/archivado",
    icon: <FileText />,
    badge: 32,
  },
  {
    label: "Añadir colaborador",
    href: "/colaboradores",
    icon: <Users />,
  },
];
