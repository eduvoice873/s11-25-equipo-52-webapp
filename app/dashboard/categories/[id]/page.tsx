/**
 * Este componente es para mostrar el componente
 */



type CategoryEditPageProps = {
  params: {
    id: string;
  };
};

export default function CategoryEditPage({ params }: CategoryEditPageProps) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
      </div>
    </div>
  );
}
