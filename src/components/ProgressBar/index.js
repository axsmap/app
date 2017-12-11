import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { colors } from '../../styles'

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 101;
  visibility: visible;

  height: 0.3rem;
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

class ProgressBar extends PureComponent {
  componentDidMount() {
    this.handleProps(this.props)
  }

  componentWillReceiveProps = nextProps => {
    if (this.interval) {
      clearInterval(this.interval)
    }

    // can't jump from -1 to 100 without start from 0
    if (!(this.props.percent === -1 && nextProps.percent === 100)) {
      this.handleProps(nextProps)
    }
  }

  componentWillUnmount = () => {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  increment = () => {
    let { percent } = this.props
    percent += Math.random() + 2 - Math.random()
    percent = percent < 99 ? percent : 99
    this.props.setPercent(percent)
  }

  handleProps = props => {
    const { percent, intervalTime } = props

    if (percent >= 0 && percent < 99) {
      this.interval = setInterval(this.increment, intervalTime)
    }

    if (percent >= 100) {
      this.props.setPercent(99.9)
      setTimeout(() => {
        this.props.setPercent(-1)
      }, 400)
    } else {
      this.props.setPercent(percent)
    }
  }

  render() {
    const { percent } = this.props
    const className = percent < 0 || percent >= 100 ? 'fade' : ''
    return (
      <Wrapper>
        <Bar percent={percent} className={className} />
      </Wrapper>
    )
  }
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
  intervalTime: PropTypes.number,
  setPercent: PropTypes.func.isRequired
}

ProgressBar.defaultProps = {
  intervalTime: 100
}

export default ProgressBar
