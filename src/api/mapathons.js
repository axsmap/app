import handleEndpoint from './handle-endpoint'

export async function getMapathonsEndpoint(params) {
  console.log('pro:', params)
  return handleEndpoint({ method: 'get', url: '/events', params })
}
export async function getInactiveMapathonsEndpoint() {
  return handleEndpoint({
    method: 'get',
    url: '/events/old',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    }
  })
}

export async function createMapathonEndpoint(data) {
  return handleEndpoint({ method: 'post', url: '/events', data })
}

export async function getMapathonEndpoint(mapathonId) {
  return handleEndpoint({ method: 'get', url: `/events/${mapathonId}` })
}

export async function editMapathonEndpoint(mapathonId, data) {
  return handleEndpoint({ method: 'put', url: `/events/${mapathonId}`, data })
}

export async function joinMapathonEndpoint(mapathonId, data) {
  return handleEndpoint({
    method: 'post',
    url: `/events/${mapathonId}/join`,
    data
  })
}

export async function leaveMapathonEndpoint(mapathonId) {
  return handleEndpoint({
    method: 'put',
    url: `/events/${mapathonId}/leave`
  })
}
