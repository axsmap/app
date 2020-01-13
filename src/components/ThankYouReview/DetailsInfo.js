import { string } from "prop-types";
import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

import { colors, fontSize, fonts, fontWeight } from "../../styles";

const Title = styled.p`
  font-size: ${fontSize.sm};
  text-align: center;
  display: block;
  position: relative;
  margin: 20px auto 0 auto;
  text-transform: uppercase;
`;


const Description =  styled.div`
  display: block;
  position: relative;
  margin: 10px auto 0 auto;
  text-align: center;
  font-size: ${fontSize.sm};
  font-family: ${fonts.tertiary};
  line-height: 1.5;
  padding: 0 12%;
`;

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
`;

const Text = styled.p`
  color: ${colors.darkestGrey};
  font-size: ${fontSize.sm};
  text-align: center;
  display: block;
  position: relative;
  margin: 10px auto 0 auto;
  font-weight: ${fontWeight.semibold};
  text-transform: uppercase;
`;

const Info = props => (
  <Grid
    container
    spacing={3}
    justify="space-evenly"
    direction="row"
    className="bg-white"
  >
    <Grid item xs={12} sm={12}>
      <Description>{props.description}</Description>
    </Grid>
    <Grid item xs={12} sm={12}>
      <Title>{props.ratingsHeader}</Title>
    </Grid>
    <Grid item xs={6} sm={6}>
      <Box>
        21
        <Text>{props.itemPlaceholder}</Text>
      </Box>
    </Grid>
    <Grid item xs={6} sm={6}>
      <Box>
        1
        <Text>{props.locationPlaceholder}</Text>
      </Box>
    </Grid>
  </Grid>
);

Info.propTypes = {
  name: string.isRequired,
  description: string.isRequired,
  ratingsHeader: string.isRequired,
  locationPlaceholder: string.isRequired,
  itemPlaceholder: string.isRequired,
  description: string.isRequired
};

export default Info;
