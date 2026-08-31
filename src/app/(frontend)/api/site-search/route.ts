import { searchEntireSite } from '@/search/server'

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q')?.trim() || ''

  if (!query) return Response.json({ results: [] })

  const results = await searchEntireSite(query)
  return Response.json(
    { results },
    {
      headers: {
        'Cache-Control': 'private, max-age=30',
      },
    },
  )
}
