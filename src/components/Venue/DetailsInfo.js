import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

import { colors, media, fontSize, fontWeight } from '../../styles'

import LinkButton from '../LinkButton'

const Title = styled.div`
  display: block;
  position: relative;
  margin: 27px 15px 0 15px;
  align-items: left;
  flex-direction: column;
  justify-content: left;
  vertical-align: text-top;

  &:last-child {
    margin-right: 35px;
  }
`

const Box = styled.div`
  display: block;
  position: relative;
  margin: 27px 0px 17px 15px;
  align-items: left;
  flex-direction: column;
  justify-content: left;
  vertical-align: text-top;

  ${media.desktop`
    margin: 27px 0px 17px 15px;
  `};
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

const LinkButtonWrapper = styled(LinkButton)`
  display: block;
  position: relative;
  margin: 27px 5% 10px 5%;
  padding: 10px;
  background-color: ${colors.black};
  color: ${colors.white};
  text-transform: uppercase;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold};
  text-align: center;
  line-height: 2;
  height: auto !important;

  ${media.desktop`
    min-width: 150px;
    margin: 27px 5% 10px 5%;
  `};
`

const Info = props => (
  <Grid container>
    <Grid
      container
      spacing={3}
      justify="space-evenly"
      direction="row"
      className="bg-white"
    >
      <Grid item xs={12} sm={12}>
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
      </Grid>
    </Grid>
    <Grid
      container
      spacing={3}
      justify="space-evenly"
      direction="row"
      className="bg-white"
    >
      <Grid item xs={6} sm={8}>
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
      </Grid>
      <Grid item xs={6} sm={4}>
        <LinkButtonWrapper
          to={`/venues/${props.venueId}/review`}
          disabled={false}
          float
        >
          {props.formattedAddReview}
        </LinkButtonWrapper>
      </Grid>
    </Grid>
  </Grid>
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
