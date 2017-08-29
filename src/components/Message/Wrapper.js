import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  justify-content: space-between;

  display: flex;

  border: 2px solid ${props => props.theme.color};
  border-radius: 3px;
  margin-bottom: 1rem;
  padding: .5rem;
  width: 100%;
`

export default Wrapper
