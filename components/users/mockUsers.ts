import { UserType } from "@/types/user";

export const mockUsers: UserType[] = [
  {
    id: '1',
    name: 'Ana López',
    email: 'ana@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2024-11-01',
    lastSeen: '2024-12-01',
    category: 'Marketing',
    tags: ['UX', 'Education', 'Voice', 'AI'],
    testimonials: [
      {
        text: 'This app changed my workflow completely. I love it.',
        createdAt: 'Nov 2023',
      },
    ],
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    email: 'carlos@example.com',
    role: 'editor',
    status: 'pending',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: '2024-11-03',
    lastSeen: '2024-12-02',
    category: 'Design',
    tags: ['Figma', 'UI', 'Prototyping'],
    testimonials: [
      {
        text: 'Very intuitive and easy to use.',
        createdAt: 'Dec 2023',
      },
    ],
  },
];
