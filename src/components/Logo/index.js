import styled from 'styled-components'

import logoIcon from '../../images/logo.svg'

const Logo = styled.img.attrs({
  src: `${logoIcon}`,
  alt: 'AXS Map logo'
})`
  height: ${props => props.height || '3rem'};
  margin-bottom: ${props => props.marginBottom || '2rem'};
  margin-right: ${props => props.marginRight || '0'};
`

export default Logo
