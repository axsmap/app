import { arrayOf, object, shape, string } from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { rgba } from 'polished'

import { colors, media } from '../../styles'
import RouterLink from '../RouterLink'

const List = styled.nav`
  flex-direction: column;

  display: flex;
  list-style: outside none none;

  margin: 0 0 1rem;
  padding: 0;

  background-color: ${colors.lightestGrey};

  & > a:last-child {
    border-bottom: none;
  }

  ${media.tablet`
    border: 1px solid ${colors.darkestGrey};
    border-radius: 3px;
  `};
`

const TitleRow = styled.h3`
  margin: 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 0.5rem 0.625rem;

  color: ${rgba(colors.darkGrey, 0.8)};
  font-size: 1.3rem;
  text-align: center;

  ${media.tablet`
    border-bottom: 1px solid ${colors.grey};

    background-color: ${colors.lightGrey};

    color: ${colors.darkestGrey};
    text-align: left;
  `};
`

const Row = styled(RouterLink)`
  position: relative;

  margin: 0;
  border-bottom: 1px solid ${colors.lightGrey};
  padding: 0.5rem 0.625rem;

  color: ${props => (props.isActive ? colors.secondary : colors.darkestGrey)};
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: ${colors.secondary};
  }

  &:before {
    content: '';

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    width: 2px;
    background-color: ${props => props.isActive && colors.warning};
  }
`

const ItemsGroup = ({ group, match }) => (
  <List>
    {group.title ? <TitleRow>{group.title}</TitleRow> : null}
    {group.rows.map(row => {
      const path = `${match.url}${row.link}`
      const isActive = location.pathname === path
      return (
        <Row key={row.link} to={`${match.url}${row.link}`} isActive={isActive}>
          {row.label}
        </Row>
      )
    })}
  </List>
)

ItemsGroup.propTypes = {
  group: shape({
    id: string.isRequired,
    title: string,
    rows: arrayOf(
      shape({
        label: string.isRequired,
        link: string.isRequired
      })
    ).isRequired
  }),
  match: object
}

export default withRouter(ItemsGroup)
