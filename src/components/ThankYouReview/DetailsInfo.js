import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Grid from 'styled-components-grid'

import { colors, fontSize, fonts, fontWeight, media } from '../../styles'

const Title = styled.p`
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold};
  text-align: center;
  display: block;
  position: relative;
  margin: 20px auto 0 auto;
  text-transform: uppercase;
  padding-top: 20px;
`

const Description = styled.div`
  display: block;
  position: relative;
  margin: 10px auto 0 auto;
  text-align: center;
  font-size: ${fontSize.sm};
  font-family: ${fonts.tertiary};
  line-height: 1.5;
  padding: 0 12%;
`

const Box = styled.div`
  display: block;
  position: relative;
  margin: 0 auto 10px auto;
  align-items: left;
  flex-direction: column;
  justify-content: left;
  vertical-align: text-top;
  text-align: center;
  font-size: ${fontSize.mega};
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.bold};

  ${media.desktop`
    padding-bottom: 14%;
  `};
`

const Text = styled.p`
  color: ${colors.darkestGrey};
  font-size: ${fontSize.sm};
  text-align: center;
  display: block;
  position: relative;
  margin: -10px 0 0 0;
  font-weight: ${fontWeight.semibold};
  text-transform: uppercase;
`

const Info = props => (
  <Grid className="is-full">
    <Grid.Unit size={{ tablet: 1 / 1, desktop: 1 / 1 }}>
      <Description>{props.description}</Description>
    </Grid.Unit>
    <Grid.Unit size={{ tablet: 1 / 1, desktop: 1 / 1 }}>
      <Title>{props.ratingsHeader}</Title>
    </Grid.Unit>
    <Grid className="is-full">
      <Grid.Unit
        size={{ mobile: 1 / 2, tablet: 1 / 2, desktop: 4 / 12 }}
        className="my-15"
      >
        <Box className="yellow-divider">
          19
          <Text>{props.itemPlaceholder}</Text>
        </Box>
      </Grid.Unit>
      <Grid.Unit size={{ mobile: 1 / 2, tablet: 1 / 2, desktop: 4 / 12 }}>
        <Box>
          1
          <Text>{props.locationPlaceholder}</Text>
        </Box>
      </Grid.Unit>
    </Grid>
  </Grid>
)

Info.propTypes = {
  description: string.isRequired,
  ratingsHeader: string.isRequired,
  locationPlaceholder: string.isRequired,
  itemPlaceholder: string.isRequired
}

export default Info
