import { bool, func } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import Dialog from '../Dialog'
import Icon from '../Icon'

import { colors, fonts, fontWeight, fontSize, media } from '../../styles'

import images from './ImageImport.js'
import messages from './messages'

const Header = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  height: 50px;
  padding: 15px 10px;
  background-color: ${colors.textColor};
  color: ${colors.white};
`

const Title = styled.h2`
  overflow: hidden;
  text-align: center;
  margin: 0;
  color: ${colors.white};
  font-family: ${fonts.primary} !important;
  font-weight: ${fontWeight.semibold} !important;
  font-size: ${fontSize.base};
  text-align: center;
  display: block;
  position: relative;
  width: 100%;
  text-transform: uppercase;
`

const Content = styled.div`
  display: block;
  position: relative;
  background-color: ${colors.white};
  padding: 20px 40px 0 40px;
  text-align: left;
  font-family: ${fonts.tertiary} !important;
  font-size: ${fontSize.sm};
  line-height: 1.5;
  overflow-y: auto;

  ${media.desktop`
    padding: 20px 40px;
  `};
`

const Steps = styled.div`
  display: block;
  position: relative;
  text-align: left;
  font-family: ${fonts.tertiary} !important;
  font-size: ${fontSize.sm};
  line-height: 1.5;
`

const Step = styled.div`
  display: block;
  position: relative;
  text-align: left;
  font-family: ${fonts.tertiary} !important;
  font-size: ${fontSize.sm};
  line-height: 1.5;
`

const SubTitle = styled.div`
  display: block;
  position: relative;
  text-align: center;
  font-size: ${fontSize.base};
  font-family: ${fonts.tertiary};
  color: ${colors.textColor};
  margin: 0 auto 10px auto;
  text-transform: uppercase;
  background-color: ${colors.primary};
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border-radius: 50%;
  line-height: 1.75;
`

const Message = styled.div`
    display: block;
    position: relative;
    text-align: left
    font-family: ${fonts.tertiary};
    font-size: ${fontSize.sm};
    margin-bottom: 20px;
    margin-top: 10px;
`

const IllustrationIcon = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  width: auto;
  height: auto;
`

class RateDetailsDialog extends React.Component {
  static propTypes = {
    sendingRequest: bool.isRequired,
    hide: func.isRequired
  }

  static contextTypes = {
    intl: intlShape
  }

  handleStateChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    return (
      <Dialog hide={this.props.hide}>
        <Header>
          <Title>
            {this.context.intl.formatMessage(messages.howToRateTitle)}
          </Title>

          <Button
            backgroundColor={colors.textColor}
            color={colors.white}
            disabled={this.props.sendingRequest}
            onClickHandler={this.props.hide}
            style={{ padding: '0rem' }}
          >
            <Icon
              glyph="cross"
              size={1}
              backgroundColor={colors.textColor}
              disabled={this.props.sendingRequest}
              onClickHandler={this.props.hide}
              color={colors.white}
            />
          </Button>
        </Header>

        <Content>
          <Steps>
            <Step>
              <SubTitle>1</SubTitle>
              <Message>
                {this.context.intl.formatMessage(
                  messages.ratingsDetailMessage1
                )}
              </Message>
              <SubTitle>2</SubTitle>
              <Message>
                {this.context.intl.formatMessage(
                  messages.ratingsDetailMessage2
                )}
              </Message>
              <IllustrationIcon>
                <figure>
                  <img
                    src={
                      images[
                        this.context.intl.formatMessage(
                          messages.exitReviewButton
                        )
                      ]
                    }
                    alt="Rated Controls Illustration"
                    aria-hidden="true"
                    className="block mx-auto"
                  />
                </figure>
              </IllustrationIcon>
              <SubTitle>3</SubTitle>
              <Message>
                {this.context.intl.formatMessage(
                  messages.ratingsDetailMessage3
                )}
              </Message>
              <IllustrationIcon>
                <figure>
                  <img
                    src={
                      images[
                        this.context.intl.formatMessage(
                          messages.reviewSelectionButton
                        )
                      ]
                    }
                    alt="Exit Rated Controls Illustration"
                    aria-hidden="true"
                    className="block mx-auto"
                  />
                </figure>
              </IllustrationIcon>
            </Step>
          </Steps>
        </Content>
      </Dialog>
    )
  }
}

export default RateDetailsDialog
