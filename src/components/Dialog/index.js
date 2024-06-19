import { rgba } from "polished";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import styled from "styled-components";
import FocusTrap from "focus-trap-react";

import { colors, media } from "../../styles";

const Overlay = styled.div`
  left: 0;
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  opacity: 1;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  border: none;
  height: 100%;
  width: 100%;
  background-color: ${rgba(colors.darkestGrey, 0.5)};
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 3px 3px 0 ${rgba(colors.darkestGrey, 0.2)},
    1px 3px 15px 2px ${rgba(colors.darkestGrey, 0.2)};
  height: 100%;
  min-height: 0;
  width: 100%;

  background-color: ${colors.lightestGrey};

  ${media.tablet`
    border-radius: 3px;
    height: auto;
    max-height: 80%;
    width: 27rem;
  `};
`;

const Dialog = ({ children, hide }) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <Overlay onClick={hide}>
      <FocusTrap>
        <Box
          onClick={(event) => event.stopPropagation()}
          aria-live="polite"
          aria-atomic="true"
          role="dialog"
          tabIndex="-1"
          aria-modal="true"
        >
          {children}
        </Box>
      </FocusTrap>
    </Overlay>
  );
};

Dialog.propTypes = {
  children: PropTypes.any,
  hide: PropTypes.func.isRequired,
};

export default Dialog;
