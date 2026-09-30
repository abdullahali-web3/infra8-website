import { TERMS } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({ title: TERMS.title, description: TERMS.description, path: `/${TERMS.slug}` });

export default function TermsOfServicePage() {
  return <LegalPage doc={TERMS} />;
}
