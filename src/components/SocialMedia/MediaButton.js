import PropTypes from 'prop-types'
import React from 'react'
import { rgba } from 'polished'
import styled from 'styled-components'

import { colors } from '../../styles'

import Icon from './Icon'

const ButtonLink = styled.a`
  text-decoration: none;
  width: 49%;
`

const Button = styled.div.attrs({ role: 'button' })`
  position: relative;

  border: none;
  border-radius: 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.darkestGrey};
  height: 3rem;
  margin-bottom: ${props => props.marginBottom || '0'};
  margin-top: ${props => props.marginTop || '0'};

  background-color: ${props => props.backgroundColor};

  color: ${colors.lightestGrey};
  font-size: 1rem;
  font-weight: bold;
  line-height: 3rem;
  text-transform: uppercase;
  text-align: center;

  &:active,
  &:focus {
    outline: 2px solid ${colors.alert}; 
  }

  &:disabled,
  &[disabled] {
    box-shadow: inset 0px 0px 0px 1px ${rgba(colors.darkestGrey, 0.5)};
    background-color: ${rgba(colors.primary, 0.5)};
    color: ${rgba(colors.darkestGrey, 0.5)};
  }
`

const MediaButton = props =>
  <ButtonLink
    href={`https://www.facebook.com/v2.10/dialog/oauth?
    client_id=${process.env.REACT_APP_FACEBOOK_ID}
    &redirect_uri=https://localhost:3000/auth/facebook
    &response_type=token
    &scope=email,public_profile`}
  >
    <Button backgroundColor={props.backgroundColor}>
      <Icon src={props.icon} />
      <div>
        {props.text}
      </div>
    </Button>
  </ButtonLink>

MediaButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default MediaButton
