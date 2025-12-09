export interface SidebarItemType {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  active?: boolean;
  subItems?: {label: string; href: string}[];
}
