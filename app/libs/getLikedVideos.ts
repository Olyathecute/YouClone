import axios from 'axios'

export async function getLikedVideos(ids: number[]) {
  const response = await axios.get('/api/videos/likedVideos', {
    params: {
      ids,
    },
  })
  return response.data
}
