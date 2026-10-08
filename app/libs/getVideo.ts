import axios from 'axios'

export async function getVideo(id: number) {
  const response = await axios.get('/api/currentVideo', {
    params: {
      id,
    },
  })

  console.log('RESPONSE getVideo', response.data)
  return response.data
}
