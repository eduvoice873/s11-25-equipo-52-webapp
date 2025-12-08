export interface UserType {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  status: 'active' | 'pending' | 'inactive';
  avatar?: string;
  createdAt: string;

  lastSeen: string;
  category: string;
  tags: string[];
  testimonials: {
    text: string;
    createdAt: string;
  }[];
}
