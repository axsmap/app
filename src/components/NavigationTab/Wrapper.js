import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Wrapper = styled(NavLink)`
  align-items: center;

  color: white;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  position: relative;
  width: 25%;
`

export default Wrapper
