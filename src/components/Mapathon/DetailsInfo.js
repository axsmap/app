import { string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;

  ${media.tablet`
    align-items: flex-start;
    flex-direction: row;
  `};
`

const Box = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 1rem;
  width: 75%;

  &:first-of-type {
    padding-top: 2rem;
  }

  &:last-of-type {
    padding-bottom: 2rem;
  }

  ${media.tablet`
    width: 45%;

    &:first-of-type {
      padding: 2rem 1rem 2rem 0;
    }

    &:last-of-type {
      padding: 2rem 0 2rem 1rem;
    }
  `};

  ${media.desktop`
    &:first-of-type {
      padding: 3rem 1rem 3rem 0;
    }

    &:last-of-type {
      padding: 3rem 0 3rem 1rem;
    }
  `};

  ${media.desktop`
    &:first-of-type {
      padding: 4rem 1rem 4rem 0;
    }

    &:last-of-type {
      padding: 4rem 0 4rem 1rem;
    }
  `};
`

const Text = styled.p`
  margin: 1rem 0 0 0;

  color: ${colors.darkGrey};
  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  ${media.desktop`
    font-size: 1.1rem;
  `};

  ${media.widescreen`
    font-size: 1.2rem;
  `};
`

const DetailsInfo = (props, context) => (
  <Wrapper>
    <Box>
      <Icon
        glyph="address"
        size={2.5}
        tabletSize={3}
        desktopSize={3.5}
        widescreenSize={4}
        color={colors.secondary}
      />
      <Text>{props.address}</Text>
    </Box>

    <Box>
      <Icon
        glyph="calendar"
        size={2.5}
        tabletSize={3}
        desktopSize={3.5}
        widescreenSize={4}
        color={colors.secondary}
      />
      <Text>
        {context.intl.formatMessage(messages.calendarDates, {
          startDate: new Date(props.startDate),
          endDate: new Date(props.endDate)
        })}
      </Text>
    </Box>
  </Wrapper>
)

DetailsInfo.propTypes = {
  address: string.isRequired,
  startDate: string,
  endDate: string
}

DetailsInfo.contextTypes = {
  intl: intlShape
}

export default DetailsInfo
