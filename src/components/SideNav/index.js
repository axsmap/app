import { array, object } from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { media } from '../../styles'

import ItemsGroup from './ItemsGroup'

const Wrapper = styled.aside`
  flex-shrink: 0;

  display: ${props => (props.showOnMobile ? 'block' : 'none')};

  width: 100%;
  height: 100%;

  ${media.tablet`
    display: block;

    width: 15rem;
    padding-right: 1.5rem;
  `};
`

/*
  ## Example config array
  
  config = [
    {
      id: "id1",
      title:"Title 1",
      rows: [
        {label:"row 1", link:"/row1"},
        {label:"row 2", link:"/row2"},
        {label:"row 3", link:"/row3"}
      ]
    },
    {
      id: "id2",
      rows: [
        {label:"row 4", link:"/row4"}
      ]
    }
  ]

  ## Output
    Title 1
    - row 1
    - row 2
    - row 3

    row 4
*/
const SideNav = ({ config, match }) => {
  const showOnMobile = location.pathname === match.url
  return (
    <Wrapper showOnMobile={showOnMobile}>
      {config.map(group => <ItemsGroup key={group.id} group={group} />)}
    </Wrapper>
  )
}

SideNav.propTypes = {
  config: array.isRequired,
  match: object
}

export default withRouter(SideNav)
