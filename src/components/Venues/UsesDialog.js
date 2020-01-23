import { bool, func, object } from "prop-types";
import React from "react";
import { intlShape } from "react-intl";
import styled from "styled-components";
import Grid from "styled-components-grid";

import Button from "../Button";
import Dialog from "../Dialog";
import Icon from "../Icon";
import ReviewIllustration from '../../images/review.png'
import RatedIllustration from '../../images/rated.png'
import { colors, fonts, fontWeight, fontSize, media } from "../../styles";

import messages from "./messages";

const Header = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  height: 50px;
  padding: 15px 10px;
  background-color: ${colors.textColor};
  color: ${colors.white};
`;

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
`;

const Content = styled.div`
  display: block;
  position: relative;
  background-color: ${colors.white};
  padding: 20px 40px;
  text-align: left;
  font-family: ${fonts.tertiary} !important;
  font-size: ${fontSize.sm};
  line-height: 1.5;
`;

const Steps = styled.div`
  display: block;
  position: relative;
  text-align: left;
  font-family: ${fonts.tertiary} !important;
  font-size: ${fontSize.sm};
  line-height: 1.5;
`;

const Step = styled.div`
  display: block;
  position: relative;
  text-align: left;
  font-family: ${fonts.tertiary} !important;
  font-size: ${fontSize.sm};
  line-height: 1.5;
`;

const SubTitle = styled.div`
  display: block;
  position: relative;
  text-align: center;
  font-size: ${fontSize.base};
  font-family: ${fonts.primary} !important;
  font-weight: ${fontWeight.bold} !important;
  color: ${colors.textColor};
  margin: 0 auto 5px auto;
  text-transform: uppercase;
`;

const Message = styled.div`
    display: block;
    position: relative;
    text-align: left
    font-family: ${fonts.tertiary};
    font-size: ${fontSize.sm};
`;

const AccentSection = styled.div`
  display: block;
  position: relative;
  background: #f0f0f0;
  padding: 0;
  margin: 10px auto;
  border-radius: 5px;
`;

const AccentHeader = styled.div`
  display: block;
  text-transform: uppercase;
  font-size: ${fontSize.sm};
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.semibold};
  padding: 5px 0;
  text-align: center;
  margin: 0 auto;
  background: #e6e6e6;

  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const AccentContent = styled.div`
  display: block;
  padding: 20px 25px;
  text-align: center;
`;

const ScoreIcon = styled.div`
  display: block;
  position: relative;
  text-align: center;
  border: 1px solid #e3e1e0;
  background-color: ${colors.white};
  color: ${colors.black};
  width: 49px;
  height: 49px;
  margin: 0 auto;
`;

const ScoreHeader = styled.div`
  display: block;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  font-size: ${fontSize.xxs};
  font-family: ${fonts.primary};
  font-weight: ${fontWeight.semibold};
  margin-top: 5px;
`;

const IllustrationIcon = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  width: auto;
  height: auto;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  height: 84px;
  padding: 0px 26px 20px 26px;
  background-color: ${colors.white};
  text-align: center;
`;

class UsesDialog extends React.Component {
  static propTypes = {
    uses: object.isRequired,
    sendingRequest: bool.isRequired,
    hide: func.isRequired,
    apply: func.isRequired
  };

  static contextTypes = {
    intl: intlShape
  };

  state = {
    activeStep: 0
  };

  handleStateChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    return (
      <Dialog hide={this.props.hide}>
        <Header>
          {this.state.activeStep === 1 ? (
                <Title>{this.context.intl.formatMessage(messages.whyTitle)}</Title>
            ) : (
                <Title>{this.context.intl.formatMessage(messages.usesTitle)}</Title>
            )}

            <Button
            backgroundColor={colors.textColor}
            color={colors.white}
            disabled={this.props.sendingRequest}
            onClickHandler={this.props.hide}
            style={{ padding: "0rem" }}
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
            {this.state.activeStep === 1 ? (
              <Step>
                <SubTitle />
                <Message>
                  {this.context.intl.formatMessage(messages.whyDescription)}
                </Message>
                <AccentSection>
                    <AccentContent>
                        <IllustrationIcon>
                        <figure>
                            <img src={ReviewIllustration} alt="Review Illustration" aria-hidden="true" />
                        </figure>
                        </IllustrationIcon>
                    </AccentContent>
                </AccentSection>
                <SubTitle style={{
                    marginTop: "35px"
                  }}>
                  {this.context.intl.formatMessage(messages.whyHeader1)}
                </SubTitle>
                <Message className="text-xl"  style={{
                    marginBottom: "20px"
                  }}>
                  {this.context.intl.formatMessage(messages.whyDescription1)}
                </Message>
                <Button className="btn-primary is-full text-xxs" style={{
                    marginBottom: "20px"
                  }}  onClickHandler={this.props.hide}>
                  {this.context.intl.formatMessage(messages.getStartedLabel)}
                </Button>
              </Step>
            ) : (
              <Step>
                <SubTitle>
                  {this.context.intl.formatMessage(messages.usesDescription)}
                </SubTitle>
                <Message>
                  {this.context.intl.formatMessage(messages.usesMessage1)}
                </Message>
                <AccentSection>
                  <AccentHeader>
                    {this.context.intl.formatMessage(messages.usesHeader1)}
                  </AccentHeader>
                  <AccentContent>
                    <Grid className="is-full">
                      <Grid.Unit
                        size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                      >
                        <ScoreIcon>
                          <Icon
                            glyph="entrylg"
                            size={1.5}
                            className="fill-current text-black"
                            color={colors.black}
                            alt="Entrance"
                            style={{
                              marginTop: "7px"
                            }}
                          />
                        </ScoreIcon>
                        <ScoreHeader>
                          {this.context.intl.formatMessage(messages.entrance)}
                        </ScoreHeader>
                      </Grid.Unit>
                      <Grid.Unit
                        size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                      >
                        <ScoreIcon>
                          <Icon
                            glyph="interior"
                            size={2}
                            className="fill-current text-black"
                            color={colors.black}
                            alt="Interior"
                            style={{
                              marginTop: "7px"
                            }}
                          />
                        </ScoreIcon>
                        <ScoreHeader>
                          {this.context.intl.formatMessage(messages.interior)}
                        </ScoreHeader>
                      </Grid.Unit>
                      <Grid.Unit
                        size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                      >
                        <ScoreIcon>
                          <Icon
                            glyph="restroom"
                            size={1.5}
                            className="fill-current text-black"
                            color={colors.black}
                            alt="Restroom"
                            style={{
                              marginTop: "7px"
                            }}
                          />
                        </ScoreIcon>
                        <ScoreHeader>
                          {this.context.intl.formatMessage(messages.restroom)}
                        </ScoreHeader>
                      </Grid.Unit>
                    </Grid>
                  </AccentContent>
                  <AccentHeader>
                    {this.context.intl.formatMessage(messages.usesHeader2)}
                  </AccentHeader>
                  <AccentContent>
                    <Grid className="is-full">
                      <Grid.Unit
                        size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                      >
                        <ScoreIcon className="bg-accessible" />
                        <ScoreHeader>
                          {this.context.intl.formatMessage(
                            messages.accessibleLabel
                          )}
                        </ScoreHeader>
                      </Grid.Unit>
                      <Grid.Unit
                        size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                      >
                        <ScoreIcon className="bg-caution" />
                        <ScoreHeader>
                          {this.context.intl.formatMessage(
                            messages.cautionLabel
                          )}
                        </ScoreHeader>
                      </Grid.Unit>
                      <Grid.Unit
                        size={{ mobile: 1 / 3, tablet: 1 / 3, desktop: 1 / 3 }}
                      >
                        <ScoreIcon className="bg-alert" />
                        <ScoreHeader>
                          {this.context.intl.formatMessage(messages.alertLabel)}
                        </ScoreHeader>
                      </Grid.Unit>
                    </Grid>
                  </AccentContent>
                </AccentSection>
                <SubTitle
                  style={{
                    marginTop: "25px",
                    marginBottom: "10px"
                  }}
                >
                  {this.context.intl.formatMessage(messages.ratesLabel)}
                </SubTitle>
                <AccentSection>
                    <AccentContent>
                        <IllustrationIcon>
                        <figure>
                            <img src={RatedIllustration} alt="Rated Illustration" aria-hidden="true" />
                        </figure>
                        </IllustrationIcon>
                    </AccentContent>
                </AccentSection>
              </Step>
            )}
          </Steps>
        </Content>

        <Footer>

        {this.state.activeStep === 1 ? (
          <Button
            backgroundColor={colors.gray500}
            color={colors.white}
            className="gray-btn btn--round--small shadow-outer mx-auto"
            disabled={this.props.sendingRequest}
            onClickHandler={() =>
              this.setState({
                activeStep: 0
              })
            }
          >
          <Icon glyph="chevronLeft" size={1} alt="Click to go to page 0" style={{
            marginTop: "2px",
            marginRight: "3px"
          }}/>
          </Button>
          ) : (
          <Button
            backgroundColor={colors.gray500}
            color={colors.white}
            className="gray-btn btn--round--small shadow-outer mx-auto"
            disabled={this.props.sendingRequest}
            onClickHandler={() =>
              this.setState({
                activeStep: 1
              })
            }
          >
          <Icon glyph="chevronRight" size={1} alt="Click to go to page 1" style={{
            marginTop: "2px",
            marginLeft: "3px"
          }}/>
          </Button>
          )}
        </Footer>
      </Dialog>
    );
  }
}

export default UsesDialog;
