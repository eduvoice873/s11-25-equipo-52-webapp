//components/ui/Card.tsx
import { cn } from "@/lib/utils";
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
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}
export {

  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}