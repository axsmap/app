import styled from 'styled-components'

const Text = styled.p`
  margin: 0;

  color: ${props => props.theme.color};
  font-size: .8rem;
  font-weight: bold;
  text-align: center;
`

export default Text
