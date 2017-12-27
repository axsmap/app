// import handleApiCall from './handleApiCall'

// const apiUrl = process.env.REACT_APP_API_URL

function* fakeEndpointGenerator() {
  // We use a generator in order to return different values emulating api calls
  yield* [
    {
      avatar:
        'http://axsmap.s3.amazonaws.com/user/individual/xyiFJIVZZZ/420181_310021075724622_808189044_n.jpg',
      description: 'Master Student Inclusive Design at OCAD U',
      id: '111111111',
      members: [
        {
          firstName: 'Member',
          lastName: '1'
        },
        {
          firstName: 'Member',
          lastName: '2'
        },
        {
          firstName: 'Member',
          lastName: '3'
        },
        {
          firstName: 'Member',
          lastName: '4'
        }
      ],
      name: 'Masters Inclusive Design',
      rankAccordingToReviews: 1,
      reviews: 1341
    },
    {
      avatar:
        'http://axsmap.s3.amazonaws.com/user/individual/-Jvq4zlKMb/google-paris.jpg',
      description: 'Accessibility Mapathon in Paris, France!',
      id: '22222222',
      members: [
        {
          firstName: 'Member',
          lastName: '5'
        },
        {
          firstName: 'Member',
          lastName: '6'
        }
      ],
      name: 'FR-PAR',
      rankAccordingToReviews: 2,
      reviews: 789
    },
    {
      avatar: 'https://www.axsmap.com/images/icon_team.png',
      description: 'Atlanta Midtown Office',
      id: '333333333',
      members: [
        {
          firstName: 'Member',
          lastName: '7'
        },
        {
          firstName: 'Member',
          lastName: '8'
        },
        {
          firstName: 'Member',
          lastName: '9'
        },
        {
          firstName: 'Member',
          lastName: '10'
        }
      ],
      name: 'Atlanta',
      rankAccordingToReviews: 3,
      reviews: 552
    }
  ]
}

const fakeEndpoint = fakeEndpointGenerator()

export async function getTeamsEndpoint() {
  // return handleApiCall({ method: 'get', url: `${apiUrl}/teams`, params })
  const endpointData = fakeEndpoint.next()
  let data
  if (!endpointData.done) {
    data = {
      results: [endpointData.value],
      nextPage: 'adaddsdsasdasasdadda'
    }
  } else {
    data = {
      results: [],
      nextPage: ''
    }
  }

  return { data }
}
