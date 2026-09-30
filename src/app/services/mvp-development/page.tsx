import { SERVICES } from "@/lib/services";
import { pageMetadata } from "@/lib/metadata";
import { ServicePage } from "@/components/service/ServicePage";

const service = SERVICES.mvp;

export const metadata = pageMetadata({ ...service.meta, path: service.path });

export default function MvpDevelopmentPage() {
  return <ServicePage service={service} />;
}
