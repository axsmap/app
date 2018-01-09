import styled from 'styled-components'

import { media } from '../../styles'

const ListsWrapper = styled.section`
  flex-direction: column;
  justify-content: space-between;

  display: flex;

  margin: 0;
  width: 100%;
  padding: 0 1rem;

  ${media.tablet`
    flex-direction: row;

    padding: 0;
  `};
`

export default ListsWrapper
