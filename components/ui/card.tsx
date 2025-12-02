//components/ui/Card.tsx
interface CardProps {
  title?: React.ReactNode; // Opcional
  bg?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, description, className }: CardProps) {
  return (
    <div
      className={`
        bg-white shadow-sm rounded-2xl p-6 w-full max-w-md space-y-4 
        ${className ?? ''}
      `}
    >
      {title && (
        <h2 className="text-xl text-center font-nunito  mb-4">{title}</h2>
      )}
      {description && (
        <p className="text-sm text-center font-nunito font-bold mb-4">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
