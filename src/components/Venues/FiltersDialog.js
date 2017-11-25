import PropTypes from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Dialog from '../Dialog'
import { colors } from '../../styles'

import messages from './messages'

const Header = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid ${colors.lightGrey};
  border-radius: 5px 5px 0 0;
  height: 3.5rem;
  padding: 0.5rem;

  background-color: white;
`

const Title = styled.h2`
  overflow: hidden;

  margin: 0;

  color: ${colors.darkestGrey};
  font-size: 1.2rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Button = styled.button`
  position: relative;
  z-index: 10;

  opacity: 1;

  appearance: none;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  height: 3rem;
  margin: 0;
  padding: 0 1rem 0 3rem;

  background-color: ${props => props.backgroundColor};
  cursor: pointer;

  color: ${props => props.color};
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
`

const ButtonIcon = props => (
  <Button
    className={props.className}
    backgroundColor={props.backgroundColor}
    color={props.color}
    disabled={props.disabled}
    onClick={() => props.onClickHandler(...props.arguments)}
  >
    {props.text}
  </Button>
)

ButtonIcon.propTypes = {
  className: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  arguments: PropTypes.array,
  text: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired
}

ButtonIcon.defaultProps = {
  className: '',
  arguments: []
}

const Content = styled.div``

const Footer = styled.div``

const FiltersDialog = (props, context) => (
  <Dialog visible={props.visible} hide={props.hide}>
    <Header>
      <Title>{context.intl.formatMessage(messages.filtersTitle)}</Title>
      <ButtonIcon
        backgroundColor={colors.lightestGrey}
        color={colors.darkestGrey}
        disabled={props.sendingRequest}
        text={context.intl.formatMessage(messages.closeFiltersButton)}
        onClickHandler={props.hide}
      />
    </Header>
    <Content />
    <Footer />
  </Dialog>
)

FiltersDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
}

FiltersDialog.contextTypes = {
  intl: intlShape
}

export default FiltersDialog
