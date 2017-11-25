import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;

  display: inline-block;
  transform: ${props =>
    props.rotate ? `rotate(${props.rotate})` : 'rotate(0deg)'};

  height: ${props => `${props.height}rem` || '1rem'};
  width: ${props => `${props.width}rem` || '1rem'};

  color: inherit;
`

export default Wrapper
