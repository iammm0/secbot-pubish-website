import { redirect } from "next/navigation";
import { DEFAULT_DOC_BRANCH, listLegacyStaticSlugParams } from "@/src/lib/docs-fs";
import { defaultLocale, isLocale } from "@/src/i18n/config";

type LegacyDocViewPageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams?: Promise<{ lang?: string }>;
};

export function generateStaticParams() {
  return listLegacyStaticSlugParams();
}

export default async function LegacyDocViewPage({ params, searchParams }: LegacyDocViewPageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const lang = sp?.lang && isLocale(sp.lang) ? sp.lang : defaultLocale;
  const target = slug?.length
    ? `/docs/secbot/${DEFAULT_DOC_BRANCH}/${slug.join("/")}`
    : `/docs/secbot/${DEFAULT_DOC_BRANCH}`;

  redirect(`${target}?lang=${lang}`);
}
