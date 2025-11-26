import  OrgWallOfLove  from "./components/OrgWallOfLove";
import { ORG_TESTIMONIALS } from "@/app/landing/components/testimonials-data"; // o la ruta donde los tengas

export default function OrgSpacePage({ params }) {
  const { spaceId } = params;

  return (
    <OrgWallOfLove
      testimonials={ORG_TESTIMONIALS}
    // opcional si quieres mostrar el nombre en el header
    />
  );
}
