import handleEndpoint from './handle-endpoint'

export async function createReviewEndpoint(data) {
  return handleEndpoint({ method: 'post', url: '/reviews', data })
}
