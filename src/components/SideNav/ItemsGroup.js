import { arrayOf, node, object, shape, string } from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { rgba } from 'polished'

import { colors, media } from '../../styles'
import RouterLink from '../RouterLink'

const List = styled.nav`
  flex-direction: column;

  display: ${props => (props.$hideOn.includes('phone') ? 'none' : 'flex')};
  list-style: outside none none;

  margin: 0 0 1rem;
  padding: 0;

  background-color: ${colors.lightestGrey};

  & > a:last-child {
    border-bottom: none;
  }

  ${media.tablet`
    display: ${props => (props.$hideOn.includes('tablet') ? 'none' : 'flex')};

    border: 1px solid ${colors.darkestGrey};
    border-radius: 3px;
  `};

  ${media.desktop`
    display: ${props => (props.$hideOn.includes('desktop') ? 'none' : 'flex')};
  `};

  ${media.widescreen`
    display: ${props =>
      props.$hideOn.includes('widescreen') ? 'none' : 'flex'};
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

const Row = styled(({ hideOn, ...rest }) => <RouterLink {...rest} />)`
  position: relative;

  display: ${props => (props.$hideOn.includes('phone') ? 'none' : 'flex')};

  margin: 0;
  border-bottom: 1px solid ${colors.lightGrey};
  padding: 0.5rem 0.625rem;

  color: ${colors.darkestGrey};
  font-weight: bold;
  text-decoration: none;

  &.isActive {
    color: ${colors.secondary};
  }

  &:hover {
    color: ${colors.secondary};
  }

  &.isActive:before {
    content: '';

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    width: 2px;
    background-color: ${colors.warning};
  }

  ${media.tablet`
    display: ${props => (props.$hideOn.includes('tablet') ? 'none' : 'flex')};
  `};

  ${media.desktop`
    display: ${props => (props.$hideOn.includes('desktop') ? 'none' : 'flex')};
  `};

  ${media.widescreen`
    display: ${props =>
      props.$hideOn.includes('widescreen') ? 'none' : 'flex'};
  `};
`

const ItemsGroup = ({ group, match }) => (
  <List hideOn={group.hideOn || ''}>
    {group.title ? <TitleRow>{group.title}</TitleRow> : null}
    {group.rows.map(row => {
      if (row.component) return row.component
      const path = `${match.url}${row.link}`
      const isActive = location.pathname === path
      return (
        <Row
          key={row.link}
          hideOn={row.hideOn || ''}
          className={isActive && 'isActive'}
          to={`${match.url}${row.link}`}
        >
          {row.label}
        </Row>
      )
    })}
  </List>
)

ItemsGroup.propTypes = {
  group: shape({
    id: string.isRequired,
    component: node,
    title: string,
    hideOn: string,
    rows: arrayOf(
      shape({
        label: string,
        link: string
      })
    ).isRequired
  }),
  match: object
}

export default withRouter(ItemsGroup)
