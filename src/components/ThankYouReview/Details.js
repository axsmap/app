import { object, number, string } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'
import Grid from 'styled-components-grid'

import { fonts, fontSize, colors, fontWeight } from '../../styles'
import Icon from '../Icon'
import DetailsInfo from './DetailsInfo'
import DetailsMap from './DetailsMap'
import DetailsPhotos from './DetailsPhotos'
import LinkButton from '../LinkButton'
import messages from './messages'

const Name = styled.div`
  color: ${colors.white};
  text-transform: uppercase;
  text-align: center;
  font-family: ${fonts.primary};
  text-transform: uppercase;
  font-weight: ${fontWeight.semibold};
  font-size: ${fontSize.base};
  line-height: 1.5;
`

const DarkHeader = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${colors.textColor};
  color: ${colors.white};
  text-transform: uppercase;
  text-align: center;
  padding: 7px 8px 9px 13px;
  height: 46px;
`

const Content = styled.div`
  display: block;
  position: relative;
  background-color: ${colors.white};
  padding: 40px 0 45px 0;
`

const Title = styled.div`
  display: block;
  position: relative;
  text-align: center;
  font-size: ${fontSize.xl1};
  font-family: ${fonts.tertiary};
  padding: 25px 0px 15px 0px;
  margin: 0 auto;
  color: ${colors.textColorLight};
`

const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  width: 100%;
`

const LinkContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

export default class Details extends React.Component {
  static propTypes = {
    reviewsRatioWeight: number.isRequired,
    generalType: string.isRequired,
    venue: object.isRequired,
    reviewFieldsAmount: number.isRequired,
    reviewsAmount: number.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  componentWillMount() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  render() {
    const { formatMessage } = this.context.intl
    const { detailsPageTitle } = messages
    const { locationsPlaceholder } = messages
    const { itemsPlaceholder } = messages
    const { ratingsHeader } = messages
    const tyDescription = messages.detailsPageDescription

    return (
      <Grid className="is-full">
        <Grid.Unit
          size={{ tablet: 1 / 2, desktop: 1 / 2 }}
          className="bg-gray-300"
        >
          <Grid>
            <Grid.Unit
              size={{ mobile: 1 / 1, tablet: 1 / 1, desktop: 8 / 12 }}
              className="bg-white mx-auto my-7 overflow-hidden shadow-outer"
            >
              <DarkHeader>
                <LinkButton
                  to={`/venues/${this.props.venue.placeId}`}
                  backgroundColor={colors.textColor}
                  style={{
                    padding: '0rem',
                    position: 'absolute',
                    top: '-3px',
                    left: '13px'
                  }}
                  disabled={false}
                >
                  <LinkContent>
                    <Icon
                      glyph="cross"
                      size={1}
                      backgroundColor={colors.textColor}
                      disabled={false}
                      color={colors.white}
                    />
                  </LinkContent>
                </LinkButton>

                <Name>{formatMessage(messages.detailsHeader)}</Name>
              </DarkHeader>
              <Content>
                <DetailsPhotos photos={this.props.venue.photos} />
                <Title>{formatMessage(detailsPageTitle)}</Title>
                <DetailsInfo
                  name={this.props.venue.name}
                  description={formatMessage(tyDescription)}
                  locationPlaceholder={formatMessage(locationsPlaceholder)}
                  itemPlaceholder={formatMessage(itemsPlaceholder)}
                  ratingsHeader={formatMessage(ratingsHeader)}
                  reviewFieldsAmount={this.props.reviewFieldsAmount}
                  reviewsAmount={this.props.reviewsAmount}
                />
                <LinksWrapper>
                  <LinkButton
                    to={`/venues/${this.props.venue.placeId}`}
                    backgroundColor={colors.primary}
                    style={{ margin: '5px auto 0px auto' }}
                    disabled={false}
                    className="primary-btn__sm"
                  >
                    <LinkContent>{formatMessage(messages.close)}</LinkContent>
                  </LinkButton>
                </LinksWrapper>
              </Content>
            </Grid.Unit>
          </Grid>
        </Grid.Unit>
        <Grid.Unit size={{ tablet: 1 / 2, desktop: 1 / 2 }}>
          <DetailsMap
            reviewsRatioWeight={this.props.reviewsRatioWeight}
            generalType={this.props.generalType}
            location={this.props.venue.location}
          />
        </Grid.Unit>
      </Grid>
    )
  }
}
