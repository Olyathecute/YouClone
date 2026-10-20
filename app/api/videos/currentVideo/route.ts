import axios from 'axios'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') ?? '20'
  const response = await axios.get('https://pixabay.com/api/videos/', {
    params: {
      key: process.env.PIXABAY_API_KEY,
      id,
    },
  })

  return Response.json(response.data)
}
