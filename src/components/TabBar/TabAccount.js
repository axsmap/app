import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import RouterLink from "../RouterLink";
import { colors } from "../../styles";

import messages from "./messages";
import { useLocation } from "react-router-dom";

const Wrapper = styled(({ isActive, ...rest }) => <RouterLink {...rest} />)`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: inherit;

  cursor: pointer;

  color: ${(props) => (props.isActive ? colors.primary : colors.lightestGrey)};
  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.primary};
  }

  &.active {
    color: ${colors.primary};
  }
`;

const Image = styled.img`
  border-radius: 100%;
  height: 1.2rem;
  margin-bottom: 0.2rem;
  width: inherit;
`;

const Label = styled.p`
  margin: 0;
  width: 100%;

  font-size: 0.7rem;
  text-align: center;
`;

const TabAccount = (props) => {
  const intl = useIntl();
  const location = useLocation();

  const isActive = location.pathname === `/users/${props.userData.id}`;

  return (
    <Wrapper isActive={isActive} to={`/users/${props.userData.id}`}>
      <Image src={props.userData.avatar} alt="Your account avatar" />
      <Label>{intl.formatMessage(messages.tabAccount)}</Label>
    </Wrapper>
  );
};

TabAccount.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default TabAccount;
