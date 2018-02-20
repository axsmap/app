import { array, bool } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors } from '../../styles'

const Wrapper = styled.ul`
  list-style-type: none;
  margin: 0 0 1.5rem 0;
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

const Button = styled.button`
  display: flex;
  opacity: 1;

  align-items: center;
  justify-content: center;

  appearance: none;
  border: none;
  border-radius: 100%;
  height: 3rem;
  margin: 0;
  padding: 0;
  width: 3rem;

  background-color: ${props => props.backgroundColor};
  cursor: pointer;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
`

const EditUsersManagers = props => {
  const managers = props.managers.map(m => (
    <Manager key={m.id}>
      <ProfileWrapper>
        <Avatar image={m.avatar} />
        <FullName>{`${m.firstName} ${m.lastName}`}</FullName>
      </ProfileWrapper>
      <Button
        backgroundColor={colors.alert}
        disabled={props.sendingRequest}
        onClick={() => props.removeManager(props.mapathonId, m.id)}
      >
        <Icon glyph="cross" size={1} />
      </Button>
    </Manager>
  ))

  return <Wrapper>{managers}</Wrapper>
}

EditUsersManagers.propTypes = {
  managers: array.isRequired,
  sendingRequest: bool.isRequired
}

export default EditUsersManagers
