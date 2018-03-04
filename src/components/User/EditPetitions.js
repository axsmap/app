import { array, bool, func, number, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import { colors, media } from '../../styles'
import Button from '../Button'
import Icon from '../Icon'
import Spinner from '../Spinner'

import messages from './messages'
import EditPetition from './EditPetition'

const PetitionsWrapper = styled.article`width: 100%;`

const PetitionsList = styled.ul`
  display: flex;
  list-style: outside none none;

  flex-direction: column;

  margin: 0.5rem 0 0;
  width: 100%;
  padding: 0;

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
`

const ButtonsWrapper = styled.div`
  bottom: 5rem;
  left: 0;
  position: fixed;

  display: flex;

  justify-content: space-around;

  width: 100%;
  padding: 0 1rem;

  ${media.desktop`
    position: static;

    margin-top: 1rem;
  `};
`

const FiltersContainer = styled.div`
  justify-content: center;

  display: flex;

  margin-bottom: 2rem;
  width: 100%;
`

const FiltersWrapper = styled.div`
  display: inline-block;

  margin: 0;
  border-radius: 3px;
  padding: 2px;

  background-color: ${colors.secondary};
`

const FilterButton = styled(Button)`
  height: 2.5rem;

  background-color: ${colors.lightestGrey};

  &:disabled,
  &[disabled] {
    opacity: 1;
    background-color: ${colors.secondary};
    color: ${colors.lightestGrey};
  }
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NoResults = styled.p`
  margin: 0;
  width: 100%;

  color: ${colors.darkGrey};
  font-weight: bold;
  text-align: center;
`

class EditPetitions extends React.Component {
  static propTypes = {
    sendingRequest: bool.isRequired,
    filter: string.isRequired,
    loadingPetitions: bool.isRequired,
    nextPage: number,
    petitions: array.isRequired,
    getPetitions: func.isRequired,
    onClickFilterReceived: func.isRequired,
    onClickFilterSent: func.isRequired,
    setPetitionAccepted: func.isRequired,
    setPetitionCanceled: func.isRequired,
    setPetitionRejected: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentDidMount() {
    this.props.getPetitions()
  }

  render() {
    const {
      filter,
      loadingPetitions,
      nextPage,
      petitions,
      sendingRequest,
      getPetitions,
      onClickFilterReceived,
      onClickFilterSent,
      setPetitionAccepted,
      setPetitionCanceled,
      setPetitionRejected
    } = this.props
    const formatMessage = this.context.intl.formatMessage

    const petitionsList = (
      <PetitionsList disabled={sendingRequest}>
        {petitions.map(petition => (
          <EditPetition
            key={petition.id}
            {...petition}
            filter={filter}
            sendingRequest={sendingRequest}
            setPetitionAccepted={setPetitionAccepted}
            setPetitionCanceled={setPetitionCanceled}
            setPetitionRejected={setPetitionRejected}
          />
        ))}
      </PetitionsList>
    )

    return (
      <PetitionsWrapper>
        <FiltersContainer>
          <FiltersWrapper>
            <FilterButton
              disabled={filter === 'received'}
              onClickHandler={onClickFilterReceived}
            >
              {formatMessage(messages.filterReceivedLabel)}
            </FilterButton>

            <FilterButton
              disabled={filter === 'sent'}
              onClickHandler={onClickFilterSent}
            >
              {formatMessage(messages.filterSentLabel)}
            </FilterButton>
          </FiltersWrapper>
        </FiltersContainer>

        {loadingPetitions ? (
          <Spinner color={colors.secondary} />
        ) : (
          petitionsList
        )}

        {nextPage ? (
          <ButtonsWrapper>
            <Button
              disabled={sendingRequest}
              float
              onClickHandler={getPetitions}
            >
              <ButtonContent>
                <Icon glyph="load" size={1} color={colors.darkestGrey} />
                <p style={{ margin: '0 0 0 0.5rem' }}>
                  {formatMessage(messages.loadMoreButton)}
                </p>
              </ButtonContent>
            </Button>
          </ButtonsWrapper>
        ) : null}

        {!loadingPetitions && petitions.length === 0 ? (
          <NoResults>{formatMessage(messages.noResultsText)}</NoResults>
        ) : null}
      </PetitionsWrapper>
    )
  }
}

export default EditPetitions
