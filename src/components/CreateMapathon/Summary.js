import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { colors, fonts, fontWeight, fontSize, media } from "../../styles";
import pinIcon from "../../images/icons/pin.png";
import Icon from "../Icon";

const Wrapper = styled.div`
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 70%;
  max-width: 75rem;
  max-height: 20rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  box-shadow: 3px 3px 10px ${colors.lightGrey};
  ${media.desktop`
    flex-direction: row;
  `};
`;
const Content = styled.div`
  width: 100%;
  height: 50%;
  background-color: ${colors.lightGrey};
  overflow: hidden;

  ${media.desktop`
      height: 100%
      width: 50%;
    `};
  ${(props) =>
    props.image &&
    css`
      background-color: ${colors.lightGrey};
    `};
  ${(props) =>
    props.details &&
    css`
      padding: 1rem 1rem;
      background-color: ${colors.lightestGrey};
      overflow-y: scroll;
    `};
`;

const Address = styled.div`
  color: ${colors.black};
  font-family: ${fonts.primary};
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.semibold};
`;

const FocusAreas = styled.div`
  color: ${colors.black};
  display: flex;
`;

const Title = styled.div`
  color: ${colors.black};
  font-family: ${fonts.primary};
  font-size: ${fontSize.xxl};
  font-weight: ${fontWeight.bold};
`;

const Description = styled.div`
  color: ${colors.black};
  font-family: ${fonts.primary};
  font-size: ${fontSize.sm};
`;

const Icon2 = styled.img`
  height: 1.5rem;
  padding-right: 0.25rem;
  padding-bottom: 0.25rem;
  text-decoration: none;
  @media screen and (max-width: 475px) and (min-width: 414px) {
    padding-right: 0;
  }
`;

const Line = styled.hr`
  border: 1px solid ${colors.primary};
`;

const Summary = ({ title, address, focusAreas, description, image }) => {
  return (
    <Wrapper>
      <Content image>
        <img srcSet={image} alt="mapathon" style={{ width: "100%" }} />
      </Content>
      <Content details>
        {address && (
          <Address>
            <Icon2 srcSet={pinIcon} />
            {address}
            {focusAreas && (
              <FocusAreas>
                {focusAreas[0] && (
                  <Icon
                    glyph="entrylg"
                    size={2}
                    color={colors.darkestGrey}
                    alt="Entrance"
                    style={{ margin: "auto 5px auto 0px" }}
                  />
                )}
                {focusAreas[1] && (
                  <Icon
                    glyph="interior"
                    size={2.5}
                    color={colors.darkestGrey}
                    alt="Interior"
                    style={{ margin: "auto 5px auto 0px" }}
                  />
                )}
                {focusAreas[2] && (
                  <Icon
                    glyph="restroom"
                    size={2}
                    color={colors.darkestGrey}
                    alt="Restroom"
                    style={{ margin: "auto 5px auto 0px" }}
                  />
                )}
              </FocusAreas>
            )}
          </Address>
        )}
        <Title>{title}</Title>
        {description && (
          <Description>
            <Line />
            {description}
          </Description>
        )}
      </Content>
    </Wrapper>
  );
};

Summary.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  focusAreas: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Summary;
