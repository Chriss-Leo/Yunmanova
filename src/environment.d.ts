declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URL: string
      NEXT_PUBLIC_SERVER_URL: string
      NEXT_PUBLIC_BAIDU_SITE_VERIFICATION?: string
      NEXT_PUBLIC_BING_SITE_VERIFICATION?: string
      NEXT_PUBLIC_CLARITY_PROJECT_ID?: string
      NEXT_PUBLIC_GA4_MEASUREMENT_ID?: string
      NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?: string
      NEXT_PUBLIC_360_SITE_VERIFICATION?: string
      NEXT_PUBLIC_SOGOU_SITE_VERIFICATION?: string
      NEXT_PUBLIC_YANDEX_SITE_VERIFICATION?: string
      VERCEL_PROJECT_PRODUCTION_URL: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
