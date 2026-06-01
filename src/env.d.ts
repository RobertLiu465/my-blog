/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly CI_SKIP_CONTENT_COLLECTIONS?: string;
  readonly CI_SKIP_RSS_SITEMAP?: string;
  readonly PUBLIC_GISCUS_ENABLED?: string;
  readonly PUBLIC_GISCUS_REPO?: string;
  readonly PUBLIC_GISCUS_REPO_ID?: string;
  readonly PUBLIC_GISCUS_CATEGORY?: string;
  readonly PUBLIC_GISCUS_CATEGORY_ID?: string;
  readonly PUBLIC_TWIKOO_ENABLED?: string;
  readonly PUBLIC_TWIKOO_ENV_ID?: string;
  readonly PUBLIC_TWIKOO_REGION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  twikoo?: {
    init: (options: Record<string, string>) => void | Promise<void>;
    getVisitorsCount?: (options: Record<string, string>) => Promise<{ time?: number } | null>;
  };
}
