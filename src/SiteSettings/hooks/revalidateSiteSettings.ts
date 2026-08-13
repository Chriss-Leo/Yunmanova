import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateSiteSettings: GlobalAfterChangeHook = ({
  context,
  doc,
  req: { payload },
}) => {
  if (context.disableRevalidate) return doc

  payload.logger.info('Revalidating site settings')
  revalidateTag('global_site-settings', 'max')

  return doc
}
