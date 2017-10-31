import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  border: 2px solid ${props => props.theme.color};
  border-radius: 3px;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;

  background-color: white;
`

export default Wrapper
