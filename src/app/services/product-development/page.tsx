import { SERVICES } from "@/lib/services";
import { pageMetadata } from "@/lib/metadata";
import { ServicePage } from "@/components/service/ServicePage";

const service = SERVICES.product;

export const metadata = pageMetadata({ ...service.meta, path: service.path });

export default function ProductDevelopmentPage() {
  return <ServicePage service={service} />;
}
