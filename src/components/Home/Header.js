import styled from 'styled-components'

import homeImage from '../../images/home-image.svg'

const Header = styled.div`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;

  display: flex;

  height: 8rem;
  width: 100%;

  background-image: url(${homeImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default Header
