import PropTypes from "prop-types";
import React from "react";
import { intlShape, useIntl } from "react-intl";
import styled from "styled-components";
import Grid from "styled-components-grid";

import { colors, fonts, fontSize, fontWeight } from "../../styles";
import messages from "./messages";

import userIcon from "../../images/icons/users.png";
import mapathonIcon from "../../images/icons/mapathon.png";
import worldIcon from "../../images/icons/world.png";

const IconWrapper = styled.div`
  display: block;
  position: relative;
  text-align: center;
`;

const Counter = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  text-align: center;
  font-weight: ${fontWeight.semibold};
  font-family: ${fonts.primary};
  font-size: 45px;
  line-height: 1.25;

  &:before {
    content: "";
    position: relative;
    display: block;
    height: 7px;
    background-color: ${colors.primary};
    width: 90px;
    margin: 15px auto;
  }
`;

const Caption = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  text-align: center;
  font-weight: ${fontWeight.bold};
  font-family: ${fonts.primary};
  font-size: ${fontSize.sm};
  padding-bottom: 60px;
`;

const Callout = ({ history }) => {
  const { formatMessage } = useIntl();

  return (
    <Grid className="is-full bg-white">
      <Grid.Unit
        size={{ tablet: 10 / 12, desktop: 1 / 2 }}
        className="bg-white mx-auto"
      >
        <Grid>
          <Grid.Unit
            size={{ tablet: 1 / 3, desktop: 1 / 3 }}
            className="bg-white mx-auto"
          >
            <IconWrapper>
              <figure>
                <img src={userIcon} aria-hidden="true" alt="users" />
              </figure>
            </IconWrapper>
            <Counter>
              12
              <span className="text-xl2">K+</span>
            </Counter>
            <Caption>{formatMessage(messages.registeredUsers)}</Caption>
          </Grid.Unit>
          <Grid.Unit
            size={{ tablet: 1 / 3, desktop: 1 / 3 }}
            className="bg-white mx-auto"
          >
            <IconWrapper>
              <figure>
                <img src={mapathonIcon} aria-hidden="true" alt="mapathon" />
              </figure>
            </IconWrapper>
            <Counter>
              300
              <span className="text-xl2">+</span>
            </Counter>
            <Caption>{formatMessage(messages.registeredMapatons)}</Caption>
          </Grid.Unit>
          <Grid.Unit
            size={{ tablet: 1 / 3, desktop: 1 / 3 }}
            className="bg-white mx-auto"
          >
            <IconWrapper>
              <figure>
                <img src={worldIcon} aria-hidden="true" alt="countries" />
              </figure>
            </IconWrapper>
            <Counter>
              100
              <span className="text-xl2">+</span>
            </Counter>
            <Caption>{formatMessage(messages.registeredCountries)}</Caption>
          </Grid.Unit>
        </Grid>
      </Grid.Unit>
    </Grid>
  );
};

Callout.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Callout;
