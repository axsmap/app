import { camelCase, upperFirst } from 'lodash'
import { bool, func, object } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import { venuesCategories } from '../../constants'
import Dialog from '../Dialog'
import Icon from '../Icon'
import topBarMessages from '../TopBar/messages'
import SelectBox from '../SelectBox'
import CustomButtonGroup from '../CustomButtonGroup'
import { colors, fonts, fontWeight, fontSize, media } from '../../styles'

import messages from './messages'

const Header = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  height: 4rem;
  padding: 15px 20px;
  background-color: ${colors.white};
`

const Title = styled.h2`
  overflow: hidden;
  text-align: center;
  margin: 0;
  color: ${colors.textColor};
  font-family: ${fonts.primary} !important;
  font-weight: ${fontWeight.semibold} !important;
  font-size: ${fontSize.xl2};
  color: ${colors.textColor};
  text-align: center;
  display: block;
  position: relative;
  width: 100%;

  ${media.desktop`
    font-size: ${fontSize.xl};
  `};
`

const Content = styled.div`
  display: flex;
  overflow-y: auto;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: 15px 20px;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  height: 84px;
  padding: 20px 26px;
  background-color: ${colors.white};
`

class FiltersDialog extends React.Component {
  static propTypes = {
    filters: object.isRequired,
    sendingRequest: bool.isRequired,
    hide: func.isRequired,
    clear: func.isRequired,
    apply: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  state = {
    type: this.props.filters.type,
    entryScore: this.props.filters.entryScore,
    starsOptions: [
      {
        value: 'any',
        label: this.context.intl.formatMessage(messages.anyLabel)
      },
      {
        value: 'lessThan3',
        label: this.context.intl.formatMessage(messages.yellowBlueLabel)
      },
      {
        value: 'from4To5',
        label: this.context.intl.formatMessage(messages.accessibleLabel)
      }
    ],
    interiorScore: this.props.filters.interiorScore,
    bathroomScore: this.props.filters.bathroomScore,
    allowsGuideDog: this.props.filters.allowsGuideDog,
    booleanOptions: [
      {
        value: '1',
        label: this.context.intl.formatMessage(messages.allowedLabel)
      }
    ],
    hasParking: this.props.filters.hasParking,
    steps: this.props.filters.steps,
    stepsOptions: [
      {
        value: 'any',
        label: this.context.intl.formatMessage(messages.anyLabel)
      },
      {
        value: '0',
        label: this.context.intl.formatMessage(messages.zeroStepsLabel)
      },
      {
        value: '1',
        label: this.context.intl.formatMessage(messages.oneStepLabel)
      },
      {
        value: '2',
        label: this.context.intl.formatMessage(messages.twoStepsLabel)
      },
      {
        value: '3',
        label: this.context.intl.formatMessage(messages.moreThanTwoStepsLabel)
      }
    ]
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
          <Button
            backgroundColor={colors.backgroundColor}
            color={colors.darkestGrey}
            disabled={this.props.sendingRequest}
            onClickHandler={this.props.hide}
            style={{ padding: '0rem' }}
          >
            <Icon
              glyph="cross"
              size={1}
              backgroundColor={colors.backgroundColor}
              disabled={this.props.sendingRequest}
              onClickHandler={this.props.hide}
              color={colors.darkestGrey}
            />
          </Button>

          <Title>
            {this.context.intl.formatMessage(messages.filtersTitle)}
          </Title>
        </Header>

        <Content>
          <SelectBox
            id="type"
            label={this.context.intl.formatMessage(messages.venueTypeLabel)}
            value={this.state.type}
            options={options}
            optionsGroups={optionsGroups}
            style={{ marginBottom: '1.5rem' }}
            handleValueChange={this.handleStateChange}
          />

          <CustomButtonGroup
            id="entryScore"
            label={this.context.intl.formatMessage(messages.entryScoreLabel)}
            value={this.state.entryScore}
            options={this.state.starsOptions}
            style={{ marginBottom: '1.5rem' }}
            size="sm"
            handleValueChange={this.handleStateChange}
          />

          <CustomButtonGroup
            id="interiorScore"
            label={this.context.intl.formatMessage(messages.interiorScoreLabel)}
            value={this.state.interiorScore}
            options={this.state.starsOptions}
            style={{ marginBottom: '1.5rem' }}
            size="sm"
            handleValueChange={this.handleStateChange}
          />

          <CustomButtonGroup
            id="bathroomScore"
            label={this.context.intl.formatMessage(messages.bathroomScoreLabel)}
            value={this.state.bathroomScore}
            options={this.state.starsOptions}
            style={{ marginBottom: '1.5rem' }}
            size="sm"
            handleValueChange={this.handleStateChange}
          />

          <CustomButtonGroup
            id="allowsGuideDog"
            label={this.context.intl.formatMessage(
              messages.allowsGuideDogLabel
            )}
            value={this.state.allowsGuideDog}
            options={this.state.booleanOptions}
            style={{ marginBottom: '1.5rem' }}
            size="lg"
            handleValueChange={this.handleStateChange}
          />

          <CustomButtonGroup
            id="hasParking"
            label={this.context.intl.formatMessage(messages.hasParkingLabel)}
            value={this.state.hasParking}
            options={this.state.booleanOptions}
            style={{ marginBottom: '1.5rem' }}
            size="lg"
            handleValueChange={this.handleStateChange}
          />
        </Content>

        <Footer>
          <Button
            backgroundColor={colors.gray500}
            color={colors.white}
            className="gray-btn btn--medium shadow-outer"
            disabled={this.props.sendingRequest}
            onClickHandler={this.props.clear}
          >
            {this.context.intl.formatMessage(messages.clearFiltersButton)}
          </Button>
          <Button
            backgroundColor={colors.gray500}
            color={colors.white}
            className="gray-btn btn--medium shadow-outer"
            disabled={this.props.sendingRequest}
            onClickHandler={() =>
              this.props.apply({
                type: this.state.type,
                entryScore: this.state.entryScore,
                bathroomScore: this.state.bathroomScore,
                allowsGuideDog: this.state.allowsGuideDog,
                hasParking: this.state.hasParking,
                hasSecondEntry: this.state.hasSecondEntry,
                hasWellLit: this.state.hasWellLit,
                isQuiet: this.state.isQuiet,
                isSpacious: this.state.isSpacious,
                steps: this.state.steps
              })
            }
          >
            {this.context.intl.formatMessage(messages.applyFiltersButton)}
          </Button>
        </Footer>
      </Dialog>
    )
  }
}

export default FiltersDialog
