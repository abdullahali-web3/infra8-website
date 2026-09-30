import { PRIVACY } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({ title: PRIVACY.title, description: PRIVACY.description, path: `/${PRIVACY.slug}` });

export default function PrivacyPolicyPage() {
  return <LegalPage doc={PRIVACY} />;
}
