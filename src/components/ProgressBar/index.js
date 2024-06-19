import React, { PureComponent, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { colors } from '../../styles'

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 101;
  visibility: visible;

  height: 0.2rem;
  width: 100%;

  background-color: transparent;
`

const Bar = styled.div`
  height: inherit;
  width: ${props =>
    props.percent > 0 && props.percent < 100 ? props.percent : 0}%;

  background-color: ${colors.primary};

  transition: width 0.3s ease-in-out;
  will-change: width;

  &.fade {
    opacity: 0;
  }
`

const ProgressBar = ({
  percent,
  intervalTime = 100,
  setPercent,
}) => {
  useEffect(() => {
    let interval;

    const increment = () => {
      let newPercent = percent;
      newPercent += Math.random() + 2 - Math.random();
      newPercent = newPercent < 99 ? newPercent : 99;
      setPercent(newPercent);
    };

    const handleProps = () => {
      if (percent >= 0 && percent < 99) {
        interval = setInterval(increment, intervalTime);
      }

      if (percent >= 100) {
        setPercent(99.9);
        setTimeout(() => {
          setPercent(-1);
        }, 400);
      } else {
        setPercent(percent);
      }
    };

    handleProps();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [percent, intervalTime, setPercent]);

  const className = percent < 0 || percent >= 100 ? 'fade' : '';
  return (
    <Wrapper>
      <Bar percent={percent} className={className} />
    </Wrapper>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
  intervalTime: PropTypes.number,
  setPercent: PropTypes.func.isRequired
}

export default ProgressBar
