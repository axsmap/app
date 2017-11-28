import { camelCase, upperFirst } from 'lodash'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import { venuesCategories } from '../../constants'
import Dialog from '../Dialog'
import Icon from '../Icon'
import topBarMessages from '../TopBar/messages'
import SelectBox from '../SelectBox'
import { colors } from '../../styles'

import messages from './messages'

const Header = styled.div`
  display: flex;

  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;

  border-bottom: 1px solid ${colors.lightGrey};
  border-radius: 5px 5px 0 0;
  height: 3.5rem;
  padding: 0.5rem 1rem;

  background-color: white;
`

const Title = styled.h1`
  overflow: hidden;

  margin: 0;

  color: ${colors.darkestGrey};
  font-size: 1.2rem;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
`

const CloseButton = styled(Button)`
  height: 2.5rem;
  font-size: 0.8rem;
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Content = styled.div`
  display: flex;
  overflow-y: auto;

  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;

  border-radius: 0 0 5px 5px;
  padding: 1rem;
`

const ButtonsWrapper = styled.div`
  display: flex;

  align-items: center;
  flex-shrink: 0;
  justify-content: space-between;

  margin-top: 1rem;
  width: 100%;
`
class FiltersDialog extends PureComponent {
  state = {
    type: ''
  }

  componentWillMount() {
    this.setState({ type: this.props.type })
  }

  handleStateChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    const options = [
      {
        value: 'establishment',
        label: this.context.intl.formatMessage(topBarMessages.filtersAll)
      }
    ]

    const optionsGroups = venuesCategories.map(venueCategory => {
      const opts = venueCategory.options.map(option => ({
        value: option,
        label: this.context.intl.formatMessage(
          topBarMessages[`filters${upperFirst(camelCase(option))}`]
        )
      }))

      return {
        value: venueCategory.value,
        label: this.context.intl.formatMessage(
          topBarMessages[`filters${upperFirst(venueCategory.value)}`]
        ),
        options: opts
      }
    })

    return (
      <Dialog hide={this.props.hide}>
        <Header>
          <Title>
            {this.context.intl.formatMessage(messages.filtersTitle)}
          </Title>
          <CloseButton
            backgroundColor={colors.lightGrey}
            color={colors.darkestGrey}
            disabled={this.props.sendingRequest}
            onClickHandler={this.props.hide}
          >
            <ButtonContent>
              <Icon glyph="cross" size={1} color={colors.darkestGrey} />
              <p style={{ margin: '0 0 0 0.5rem' }}>
                {this.context.intl.formatMessage(messages.closeFiltersButton)}
              </p>
            </ButtonContent>
          </CloseButton>
        </Header>

        <Content>
          <SelectBox
            label={this.context.intl.formatMessage(messages.venueTypeLabel)}
            id="type"
            value={this.state.type}
            options={options}
            optionsGroups={optionsGroups}
            handleValueChange={this.handleStateChange}
          />

          <ButtonsWrapper>
            <Button
              backgroundColor={colors.lightGrey}
              color={colors.darkestGrey}
              disabled={this.props.sendingRequest}
              onClickHandler={this.props.clear}
            >
              {this.context.intl.formatMessage(messages.clearFiltersButton)}
            </Button>
            <Button
              backgroundColor={colors.primary}
              color={colors.darkestGrey}
              disabled={this.props.sendingRequest}
              onClickHandler={() =>
                this.props.apply({
                  type: this.state.type
                })}
            >
              {this.context.intl.formatMessage(messages.applyFiltersButton)}
            </Button>
          </ButtonsWrapper>
        </Content>
      </Dialog>
    )
  }
}

FiltersDialog.propTypes = {
  sendingRequest: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  apply: PropTypes.func.isRequired
}

FiltersDialog.contextTypes = {
  intl: intlShape
}

export default FiltersDialog
