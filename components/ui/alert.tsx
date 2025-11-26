import { cn } from "@/lib/utils";

export function Alert({ type = "info", title, description }) {
  const styles = {
    info: "bg-blue-100 border-blue-300 text-blue-800",
    success: "bg-green-100 border-green-300 text-green-800",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
    error: "bg-red-100 border-red-300 text-red-800",
  };

  return ( 


<div className={cn("border rounded-xl p-4", styles[type])}>
      {title && <h4 className="font-bold">{title}</h4>}
      {description && <p className="text-sm mt-1">{description}</p>}

</div>
  );
}
