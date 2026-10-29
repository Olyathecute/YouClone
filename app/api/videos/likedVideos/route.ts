import axios from 'axios'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const ids = searchParams.getAll('ids[]').map(Number)

    if (ids.length === 0 || ids.some((id) => !Number.isInteger(id))) {
      return Response.json({ error: 'Invalid video IDs' }, { status: 400 })
    }

    const requests = ids.map((id) =>
      axios.get('https://pixabay.com/api/videos/', {
        params: {
          key: process.env.PIXABAY_API_KEY,
          id,
        },
      }),
    )

    const responses = await Promise.all(requests)
    const videos = responses.flatMap((response) => response.data.hits)

    return Response.json(videos)
  } catch (error) {
    console.error('Error fetching liked videos:', error)

    return Response.json({ error: 'Failed to fetch liked videos' }, { status: 500 })
  }
}
