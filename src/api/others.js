import handleEndpoint from './handle-endpoint'

export async function contactEndpoint(data) {
  return handleEndpoint({ method: 'post', url: '/contact', data })
}
