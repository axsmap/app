import { placeholder } from 'polished'
import { array, bool, func } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Icon from '../Icon'
import Spn from '../Spinner'
import { colors } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 1.5rem;
  width: 100%;
`

const Form = styled.form`
  display: flex;

  flex-grow: 1;

  height: 3rem;
  width: 100%;
`

const FormInput = styled.input`
  flex-grow: 1;

  border: none;
  border-radius: 3px 0 0 3px;
  box-shadow: inset 0px 0px 0px 1px ${colors.darkGrey};
  height: 100%;
  margin: 0 -0.1rem 0 0;
  padding: 0.5rem 1rem;
  width: 100%;

  background-color: white;

  color: ${colors.darkestGrey};

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.primary};
    outline: none;
  }

  ${placeholder({
    color: colors.darkGrey,
    textOverflow: 'ellipsis !important'
  })};
`

const FormButton = styled.button`
  display: flex;
  opacity: 1;

  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 0 3px 3px 0;
  box-shadow: none;
  height: 100%;
  padding: 0;
  width: 4rem;

  appearance: none;
  background-color: ${colors.primary};
  cursor: pointer;

  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px ${colors.secondary};
    outline: none;
  }

  &:disabled,
  &.is-disabled {
    opacity: 0.5;
  }
`

const Spinner = styled(Spn)`
  flex-grow: 0;
  margin-top: 1rem;
`

const Users = styled.ul`
  list-style-type: none;
  margin: 1rem 0 0 0;
  padding: 0;
  width: 100%;
`

const User = styled.li`
  display: flex;

  align-items: center;
  justify-content: space-between;

  margin: 0 0 1rem 0;
  padding: 0;
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`

const Avatar = styled.div`
  flex-shrink: 0;

  border-radius: 100%;
  height: 3rem;
  margin-right: 1rem;
  width: 3rem;

  background-image: ${props => `url("${props.image}")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const FullName = styled.p`
  overflow: hidden;

  margin: 0;

  color: ${colors.darkGrey};
  font-weight: bold;
  text-overflow: ellipsis;
`

export default class EditUsersInvitations extends React.Component {
  static propTypes = {
    sendingRequest: bool.isRequired,
    loadingUsers: bool.isRequired,
    users: array.isRequired,
    clearInvitationsState: func.isRequired,
    getUsers: func.isRequired,
    invite: func.isRequired
  }

  static contextTypes = { intl: intlShape }

  state = {
    keywords: ''
  }

  componentWillUnmount() {
    this.props.clearInvitationsState()
  }

  handleKeywordsChange = event => {
    this.setState({ keywords: event.target.value })
  }

  render() {
    const formatMessage = this.context.intl.formatMessage
    const users = (
      <Users
        style={{ display: this.props.users.length > 0 ? 'block' : 'none' }}
      >
        {this.props.users.map(u => (
          <User key={u.id}>
            <ProfileWrapper>
              <Avatar image={u.avatar} />
              <FullName>{`${u.firstName} ${u.lastName}`}</FullName>
            </ProfileWrapper>

            <Button
              backgroundColor={colors.lightGrey}
              disabled={this.props.sendingRequest}
              onClickHandler={() => this.props.invite(u.id, 'user-event')}
            >
              {formatMessage(messages.inviteButton)}
            </Button>
          </User>
        ))}
      </Users>
    )

    return (
      <Wrapper>
        <Form
          onSubmit={event => {
            event.preventDefault()
            this.props.getUsers(this.state.keywords)
          }}
        >
          <FormInput
            type="text"
            value={this.state.keywords}
            placeholder={formatMessage(messages.inputUsersPlaceholder)}
            onChange={this.handleKeywordsChange}
          />
          <FormButton type="submit" disabled={this.props.sendingRequest}>
            <Icon glyph="lens" size={1.5} color={colors.darkestGrey} />
          </FormButton>
        </Form>

        {this.props.loadingUsers ? <Spinner size={3} /> : users}
      </Wrapper>
    )
  }
}
