import axios from 'axios'

export async function getVideo(id: number) {
  const response = await axios.get('/api/videos/currentVideo', {
    params: {
      id,
    },
  })
  return response.data
}
