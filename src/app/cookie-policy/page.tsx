import { COOKIES } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({ title: COOKIES.title, description: COOKIES.description, path: `/${COOKIES.slug}` });

export default function CookiePolicyPage() {
  return <LegalPage doc={COOKIES} />;
}
