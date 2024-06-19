import styled from 'styled-components'

import logoIcon from '../../images/logo.svg'

const Logo = styled.img.attrs({
  src: `${logoIcon}`,
  alt: 'AXS Map logo'
})`
  height: ${props => props.height || '3rem'};
  margin-bottom: ${props => props.marginBottom};
  margin-right: ${props => props.marginRight};
`

export default Logo
