import { array, bool } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import { colors } from '../../styles'

import messages from './messages'

const Wrapper = styled.ul`
  list-style-type: none;
  margin: 0 0 1rem 0;
  padding: 0;
  width: 100%;
`

const Manager = styled.li`
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

const EditManagers = (props, context) => {
  const managers = props.managers.map(m => (
    <Manager key={m.id}>
      <ProfileWrapper>
        <Avatar image={m.avatar} />
        <FullName>{`${m.firstName} ${m.lastName}`}</FullName>
      </ProfileWrapper>
      <Button
        backgroundColor={colors.lightGrey}
        disabled={props.sendingRequest}
        onClickHandler={() => props.removeManager(props.teamId, m.id)}
      >
        {context.intl.formatMessage(messages.removeButton)}
      </Button>
    </Manager>
  ))

  return <Wrapper>{managers}</Wrapper>
}

EditManagers.propTypes = {
  managers: array.isRequired,
  sendingRequest: bool.isRequired
}

EditManagers.contextTypes = {
  intl: intlShape
}

export default EditManagers
