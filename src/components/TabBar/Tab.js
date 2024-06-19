import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import RouterLink from '../RouterLink'
import { colors } from '../../styles'
import { useLocation } from 'react-router-dom'

const Wrapper = styled(RouterLink)`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: inherit;

  cursor: pointer;

  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.primary};
  }
`

const WrapperAbsolute = styled.a`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: inherit;

  cursor: pointer;

  text-decoration: none;

  &:active,
  &:focus {
    outline: 2px solid ${colors.primary};
  }
`

const Label = styled.p`
  margin: 0.2rem 0 0 0;
  width: 100%;

  color: ${props => (props.active ? colors.primary : 'white')};
  font-size: 0.5rem;
  text-align: center;
`

const Tab = ({
  isAbsolute = false,
  to,
  activeIcon,
  icon,
  label,
}) => {
  const location = useLocation();
  const active = location.pathname === to;

  if (isAbsolute) {
    return (
      <WrapperAbsolute href={to} target="_blank">
        {active ? activeIcon : icon}
        <Label active={active}>{label}</Label>
      </WrapperAbsolute>
    );
  }

  return (
    <Wrapper to={to}>
      {active ? activeIcon : icon}
      <Label active={active}>{label}</Label>
    </Wrapper>
  );
};

Tab.propTypes = {
  isAbsolute: PropTypes.bool,
  to: PropTypes.string.isRequired,
  activeIcon: PropTypes.element,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired
}

export default Tab
