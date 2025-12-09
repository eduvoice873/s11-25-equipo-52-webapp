import {
  Home,
  MessageSquare,
  Tag,
  Folder,
  Users,
  Settings,
  Code,
  Shield,
  UserPen,
} from 'lucide-react';
import { SidebarItemType } from '@/types/sidebar';



export const adminMenu: SidebarItemType[] = [
  { label: 'Inicio', href: '/home', icon: <Home /> },

  {
    label: 'Testimonios',
    href: '/testimonios',
    icon: <MessageSquare />,
    subItems: [
      { label: 'Ver Testimonios', href: '/testimonios' },
      { label: 'Todos los testimonio', href: '/testimonio/gestionar' }
    ]
  },

  { label: 'Widget', href: '/widget-generator', icon: <Code /> },
  { label: 'Categorías', href: 'categories', icon: <Folder /> },
  { label: 'Etiquetas', href: '/gestionEtiquetas', icon: <Tag /> },
  { label: 'Usuarios', href: '/users', icon: <Users /> },
  { label: 'Perfil', href: '/perfil', icon: <UserPen /> },
];

export const editorMenu: SidebarItemType[] = [
  { label: 'Inicio', href: 'home', icon: <Home /> },
  {
    label: 'Testimonios',
    href: '/dashboard/testimonios',
    icon: <MessageSquare />,
  },
  {
    label: 'Moderación',
    href: '/gestionTestimonio',
    icon: <Shield />,
  },
  {
    label: 'Widget',
    href: '/widget-generator',
    icon: <Code />,
  },
  { label: 'Categorías', href: '/categorias', icon: <Folder /> },
  { label: 'Etiquetas', href: '/gestionEtiquetas', icon: <Tag /> },
  { label: 'Usuarios', href: '/users', icon: <Users /> },
  { label: 'Perfil', href: '/perfil', icon: <UserPen /> },
];
