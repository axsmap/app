import { rgba } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import RouterLink from '../RouterLink'
import { colors, media } from '../../styles'

const Wrapper = styled(({ width, backgroundColor, color, ...rest }) => (
  <RouterLink {...rest} />
))`
  display: flex;
  opacity: 1;

  align-items: center;
  justify-content: center;

  appearance: none;
  border: none;
  border-radius: 3px;
  box-shadow: ${props =>
    props.float ? `0 3px 5px ${rgba(colors.darkestGrey, 0.4)}` : 'none'};
  height: 3rem;
  margin: 0;
  padding: 0 1rem;
  width: ${props => props.width || 'auto'};

  background-color: ${props => props.$backgroundColor || colors.primary};
  cursor: pointer;

  color: ${props => props.color || colors.darkestGrey};
  font-size: ${props => props.fontSize || '1rem'};
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }

  ${media.desktop`
    font-size: 1.1rem;
  `};

  ${media.widescreen`
    font-size: 1.2rem;
  `};
`

const LinkButton = props => (
  <Wrapper disabled={props.disabled} {...props}>
    {props.children}
  </Wrapper>
)

LinkButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default LinkButton
