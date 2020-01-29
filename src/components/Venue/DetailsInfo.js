import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Grid from 'styled-components-grid'

import { colors, media, fontSize, fontWeight, fonts } from '../../styles'
import LinkButton from '../LinkButton'

const MainWrapper = styled.div`
  display: block;
  position: relative;
  padding: 25px 15px 30px 15px;

  ${media.desktop`
    padding: 30px 15px 30px 35px;
  `};
`

const Title = styled.div`
  display: block;
  position: relative;
  margin: 0;
  margin-bottom: 15px;
  text-align: left;
  font-weight: ${fontWeight.bold};
  font-family: ${fonts.primary};
  font-size: ${fontSize.lg};
`

const Box = styled.div`
  display: block;
  position: relative;
  margin: 0px;
  align-items: left;
  flex-direction: column;
  justify-content: left;
  vertical-align: text-top;
`

const Text = styled.p`
  color: ${colors.darkestGrey};
  font-size: ${fontSize.sm};
  text-align: left;
  margin: 0;
  font-style: normal;
`

const Link = styled.a`
  overflow: hidden;
  width: 100%;
  color: black;
  font-size: ${fontSize.lg};
  font-weight: bold;
  text-align: left;
  text-overflow: ellipsis;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  ${media.desktop`
    font-size: 1.1rem;
  `};

  ${media.widescreen`
    font-size: 1.2rem;
  `};
`

const LinkButtonWrapper = styled.a`
  display: block;
  position: relative;
  margin: 0;
  padding: 10px;
  text-transform: uppercase;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold};
  text-align: center;
  line-height: 2;
  height: auto !important;
  border-radius: 5px;
  float: right;

  ${media.desktop`
    min-width: 150px !important;
  `};
`

const Info = props => (
  <MainWrapper>
    <Grid className="is-full">
      <Grid.Unit className="is-full">
        <Title>
          {props.website ? (
            <h1>
              <Link href={props.website} target="_blank">
                {props.name}
              </Link>
            </h1>
          ) : (
            <h1>{props.name}</h1>
          )}
        </Title>
      </Grid.Unit>
    </Grid>
    <Grid className="is-full">
      <Grid.Unit size={{ mobile: 1 / 2, tablet: 1 / 2, desktop: 4 / 6 }}>
        <Box>
          <address>
            <Text>{props.address}</Text>
            {props.formattedPhone ? (
              <Link href={`tel:${props.internationalPhone}`}>
                {props.formattedPhone}
              </Link>
            ) : null}
          </address>
        </Box>
      </Grid.Unit>
      <Grid.Unit size={{ mobile: 1 / 2, tablet: 1 / 2, desktop: 2 / 6 }}>
        <LinkButtonWrapper>
          <LinkButton
            to={`/venues/${props.venueId}/review`}
            disabled={false}
            float
            className="primary-btn--alt__sm shadow-none"
          >
            {props.formattedAddReview}
          </LinkButton>
        </LinkButtonWrapper>
      </Grid.Unit>
    </Grid>
  </MainWrapper>
)

Info.propTypes = {
  address: string.isRequired,
  formattedPhone: string,
  internationalPhone: string,
  website: string,
  name: string.isRequired,
  formattedAddReview: string,
  venueId: string.isRequired
}

export default Info
