import handleEndpoint from './handle-endpoint'

export async function createPhotoEndpoint(data) {
  return handleEndpoint({
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data'
    },
    url: '/photos',
    data
  })
}

export async function deletePhotoEndpoint(photoId) {
  return handleEndpoint({ method: 'delete', url: `/photos/${photoId}` })
}
