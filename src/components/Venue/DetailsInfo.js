import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

import { colors, media, fontSize } from '../../styles'

const Box = styled.div`
  display: flex;
  margin: 27px 15px;
  align-items: left;
  flex-direction: column;
  justify-content: left;
  vertical-align: text-top;
  width: 100%;
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
const Info = props => (
  <Grid container spacing={3}>
    <Grid item xs={6} sm={6}>
      <Box>
        {props.website ? (
          <h1>
            <Link href={props.website} target="_blank">
              {props.name}
            </Link>
          </h1>
        ) : (
          <h1>{props.name}</h1>
        )}
      </Box>
    </Grid>
    <Grid item xs={6} sm={6}>
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
  </Grid>
)

Info.propTypes = {
  address: string.isRequired,
  formattedPhone: string,
  internationalPhone: string,
  website: string,
  name: string.isRequired
}

export default Info
