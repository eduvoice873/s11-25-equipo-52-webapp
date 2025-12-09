import OrgWallOfLove from "./components/OrgVoicesHub";
import { ORG_TESTIMONIALS } from "@/app/(public)/landing/components/data"; // o la ruta donde los tengas

export default function OrgSpacePage({ params }) {
  const { spaceId } = params;

  return (
    <OrgWallOfLove
      testimonials={ORG_TESTIMONIALS}
    // opcional si quieres mostrar el nombre en el header
    />
  );
}
