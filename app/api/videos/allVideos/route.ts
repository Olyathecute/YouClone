import axios from 'axios'
import { setTimeout as sleep } from 'timers/promises'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const page = searchParams.get('page') ?? '1'
  const perPage = searchParams.get('per_page') ?? '20'

  // await new Promise((resolve) => setTimeout(resolve, 2000))

  await sleep(2000)

  const response = await axios.get('https://pixabay.com/api/videos/', {
    params: {
      key: process.env.PIXABAY_API_KEY,
      page,
      per_page: perPage,
    },
  })

  return Response.json(response.data)
}
