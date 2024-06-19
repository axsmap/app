import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Icon from '../Icon'
import { colors, media } from '../../styles'

import messages from './messages'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 2rem;
  padding: 0 1rem;
  width: 100%;

  ${media.tablet`
    align-items: flex-start;
    flex-direction: row;
    padding: 0;
  `};

  ${media.desktop`
    margin-bottom: 3rem;
  `};

  ${media.widescreen`
    margin-bottom: 4rem;
  `};
`

const Box = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 2rem;
  width: 75%;

  &:last-of-type {
    margin-bottom: 0;
  }

  ${media.tablet`
    margin-bottom: 0;
    width: 50%;
  `};
`

const Text = styled.p`
  margin: 1rem 0 0 0;

  color: ${colors.darkestGrey};
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
  intl: useIntl()
}

export default DetailsInfo
