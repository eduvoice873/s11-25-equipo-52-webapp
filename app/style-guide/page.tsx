import {
  Button,
  Card,
  Input,
  Alert,
  Navbar,
  Sidebar,
  Typography,
  FormField,
} from '@/components/ui/design-system';

export default function StyleGuide() {
  return (
    <div className="p-10 space-y-12">
      <Navbar />

      <h1 className="text-3xl font-bold text-brand-blue">Design System</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tipografía </h2>
        <Typography />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Botones</h2>
        <div className="flex gap-4">
          <Button variant="primary" className={undefined} size={undefined}>
            Primary
          </Button>

          <Button variant="secondary" className={undefined} size={undefined}>
            Secondary
          </Button>
          <Button variant="outline" className={undefined} size={undefined}>
            Outline
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Inputs</h2>
        <Input placeholder="Escribe algo..." />
        <Input state="error" placeholder="Error input" />
        <Input size="lg" placeholder="Grande" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Inputs</h2>

        <Input placeholder="Default" />

        <Input variant="outline" placeholder="Outline" />

        <Input size="sm" placeholder="Pequeño" />
        <Input size="lg" placeholder="Grande" />

        <Input state="error" placeholder="Error input" />
        <Input state="success" placeholder="Success input" />

        <Input disabled placeholder="Deshabilitado" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Alerts</h2>
        <Alert type="info" title="Info" description="Este es un mensaje." />
        <Alert type="error" title="Error" description="Algo salió mal." />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Card</h2>
        <Card title="Ejemplo Card">Contenido aquí.</Card>
      </section>
    </div>
  );
}
