import { node, string } from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import { colors } from '../../styles'
import RouterLink from '../RouterLink'

const Row = styled.li`
  display: flex;

  transition: background-color 0.3s ease;

  margin: 0 0 0.5rem;
  border-right: 2px solid ${colors.primary};
  border-bottom: 2px solid ${colors.primary};
  border-radius: 10px;
  width: 100%;

  font-size: 1.125rem;

  &:hover {
    background-color: ${colors.lightGrey};
  }
`

const RowLink = styled(RouterLink)`
  display: flex;

  height: inherit;
  width: inherit;
  padding: 0.75rem;

  cursor: pointer;

  color: ${colors.darkestGrey};
  text-decoration: none;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }
`

const UserRow = ({ to, children }) => (
  <Row>
    <RowLink to={to}>{children}</RowLink>
  </Row>
)

UserRow.propTypes = {
  children: node.isRequired,
  to: string.isRequired
}

export default UserRow
