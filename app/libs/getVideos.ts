import axios from 'axios'

export async function getVideos(page: number) {
  const response = await axios.get('/api/videos', {
    params: {
      page,
      per_page: 20,
    },
  })

  console.log('RESPONSE', response.data)
  return response.data
}
