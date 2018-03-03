import { intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { rgba } from 'polished'
import styled from 'styled-components'

import RouterLink from '../RouterLink'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  position: relative;

  display: flex;

  align-items: center;
  justify-content: center;

  height: inherit;
`

const Link = styled(RouterLink)`
  display: flex;

  align-items: center;
  justify-content: center;

  height: inherit;
  margin-right: 0.2rem;
  padding: 0 0.5rem;
  width: 100%;

  color: ${colors.darkestGrey};
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }

  &:hover {
    color: ${colors.secondary};
  }
`

const Image = styled.img`
  border-radius: 100%;
  height: 2rem;
  width: inherit;
`

const Bar = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;

  display: ${props => (props.isVisible ? 'block' : 'none')};

  height: 2px;
  width: 100%;

  background-color: ${colors.primary};
`

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 100%;

  display: ${props => (props.isVisible ? 'flex' : 'none')};

  flex-direction: column;

  box-shadow: 0 1px 0 0 ${colors.grey};
  padding: 0.5rem;
  width: 100%;

  background-color: white;

  ${media.desktop`
    display: ${props => (props.isVisible ? 'flex' : 'none')};
  `};
`

const Button = styled.button`
  appearance: none;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  height: 3rem;
  margin: 0;
  padding: 0.5em;
  width: 100%;

  background-color: ${colors.alert};
  cursor: pointer;

  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    background-color: ${rgba(colors.alert, 0.5)};
    color: ${rgba('white', 0.5)};
  }

  ${media.desktop`
    font-size: 1.1rem;
  `};

  ${media.widescreen`
    font-size: 1.2rem;
  `};
`

class NavDropdown extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    sendingRequest: PropTypes.bool.isRequired,
    onSignOutClick: PropTypes.func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    showDropdown: false
  }

  hideDropdown = () => this.setState({ showDropdown: false })

  showDropdown = () => this.setState({ showDropdown: true })

  render() {
    return (
      <Wrapper
        onMouseEnter={this.showDropdown}
        onMouseLeave={this.hideDropdown}
      >
        <Link to="/account">
          {this.context.intl.formatMessage(messages.navAccount)}
        </Link>
        <Image src={this.props.avatarUrl} />
        <Bar isVisible={this.props.isActive} />

        <Dropdown isVisible={this.state.showDropdown}>
          <Button
            disabled={this.props.sendingRequest}
            onClick={this.props.onSignOutClick}
          >
            {this.context.intl.formatMessage(messages.dropdownSignOut)}
          </Button>
        </Dropdown>
      </Wrapper>
    )
  }
}

export default NavDropdown
