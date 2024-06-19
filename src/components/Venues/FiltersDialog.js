import { camelCase, upperFirst } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";

import { ButtonGroup } from "reactstrap";
import Button from "../Button";
import { venuesCategories } from "../../constants";
import Dialog from "../Dialog";
import Icon from "../Icon";
import topBarMessages from "../TopBar/messages";
import SelectBox from "../SelectBox";
import CustomButtonGroup from "../CustomButtonGroup";
import { colors, fonts, fontWeight, fontSize, media } from "../../styles";

import messages from "./messages";

import { initialState } from "../../containers/VenuesPage/reducer";

const Header = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  height: 4rem;
  padding: 15px 20px;
  background-color: ${colors.white};
`;

const Title = styled.h2`
  overflow: hidden;
  text-align: center;
  margin: 0;
  color: ${colors.textColor};
  font-family: ${fonts.primary} !important;
  font-weight: ${fontWeight.semibold} !important;
  font-size: ${fontSize.xl2};
  color: ${colors.textColor};
  text-align: center;
  display: block;
  position: relative;
  width: 100%;

  ${media.desktop`
    font-size: ${fontSize.xl};
  `};
`;

const Content = styled.div`
  display: flex;
  overflow-y: auto;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: 15px 20px;
`;

const ButtonGroupWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 1.25rem;
  width: 100%;
  color: ${colors.textColor} !important;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  font-family: ${fonts.primary};
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  height: 84px;
  padding: 20px 26px;
  background-color: ${colors.white};
`;

const FiltersDialog = (props) => {
  const intl = useIntl();
  const context = useContext(IntlContext);

  const [state, setState] = useState({
    type: props.filters.type,
    entranceScore: props.filters.entranceScore,
    starsOptions: [
      {
        value: "any",
        label: intl.formatMessage(messages.anyLabel),
      },
      {
        value: "3",
        label: intl.formatMessage(messages.yellowBlueLabel),
      },
      {
        value: "5",
        label: intl.formatMessage(messages.accessibleLabel),
      },
    ],
    interiorScore: props.filters.interiorScore,
    restroomScore: props.filters.restroomScore,
    allowsGuideDog: props.filters.allowsGuideDog,
    booleanOptions: [
      {
        value: "1",
        label: intl.formatMessage(messages.allowedLabel),
      },
    ],
    hasParking: props.filters.hasParking,
    steps: props.filters.steps,
    stepsOptions: [
      {
        value: "any",
        label: intl.formatMessage(messages.anyLabel),
      },
      {
        value: "0",
        label: intl.formatMessage(messages.zeroStepsLabel),
      },
      {
        value: "1",
        label: intl.formatMessage(messages.oneStepLabel),
      },
      {
        value: "2",
        label: intl.formatMessage(messages.twoStepsLabel),
      },
      {
        value: "3",
        label: intl.formatMessage(messages.moreThanTwoStepsLabel),
      },
    ],
  });

  const handleStateChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  const toggleAllowsGuideDog = () => {
    setState({
      ...state,
      allowsGuideDog: state.allowsGuideDog !== "1" ? "1" : "any",
    });
  };

  const toggleParking = () => {
    setState({ ...state, hasParking: state.hasParking !== "1" ? "1" : "any" });
  };

  const updateEntryFilter = (value) => {
    setState({ ...state, entranceScore: value });
  };

  const updateInteriorFilter = (value) => {
    setState({ ...state, interiorScore: value });
  };

  const updateRestroomFilter = (value) => {
    setState({ ...state, restroomScore: value });
  };

  const options = [
    {
      value: "establishment",
      label: intl.formatMessage(topBarMessages.filtersAll),
    },
  ];

  const optionsGroups = venuesCategories.map((venueCategory) => {
    const opts = venueCategory.options.map((option) => ({
      value: option,
      label: intl.formatMessage(
        topBarMessages[`filters${upperFirst(camelCase(option))}`]
      ),
    }));

    return {
      value: venueCategory.value,
      label: intl.formatMessage(
        topBarMessages[`filters${upperFirst(venueCategory.value)}`]
      ),
      options: opts,
    };
  });

  return (
    <Dialog hide={props.hide}>
      <Header>
        <Button
          $backgroundColor={colors.backgroundColor}
          color={colors.darkestGrey}
          disabled={props.sendingRequest}
          onClickHandler={props.hide}
          style={{ padding: "0rem" }}
        >
          <Icon
            glyph="cross"
            size={1}
            $backgroundColor={colors.backgroundColor}
            disabled={props.sendingRequest}
            onClickHandler={props.hide}
            color={colors.darkestGrey}
          />
        </Button>

        <Title>{intl.formatMessage(messages.filtersTitle)}</Title>
      </Header>

      <Content>
        <SelectBox
          id="type"
          label={intl.formatMessage(messages.venueTypeLabel)}
          value={state.type}
          options={options}
          optionsGroups={optionsGroups}
          style={{ marginBottom: "1.5rem" }}
          handleValueChange={handleStateChange}
          ariaLabel="Filter by Type"
        />

        <SelectBox
          id="entryScore"
          label={intl.formatMessage(messages.entryScoreLabel)}
          value={state.entranceScore}
          options={state.starsOptions}
          style={{ marginBottom: "1.5rem" }}
          size="sm"
          handleValueChange={handleStateChange}
          className="visually-hidden"
        />

        <ButtonGroupWrapper style={{ marginBottom: "1.5rem" }}>
          <Label>{intl.formatMessage(messages.entryScoreLabel)}</Label>
          <ButtonGroup size="sm">
            <Button
              disabled={props.sendingRequest}
              onClick={() => updateEntryFilter("any")}
              className={`${
                state.entranceScore === "any"
                  ? "btn-secondary is-active"
                  : "btn-secondary"
              }`}
            >
              {intl.formatMessage(messages.anyLabel)}
            </Button>
            <Button
              disabled={props.sendingRequest}
              onClick={() => updateEntryFilter("3")}
              className={`${
                state.entranceScore === "3"
                  ? "btn-secondary is-active"
                  : "btn-secondary"
              }`}
            >
              {intl.formatMessage(messages.yellowBlueLabel)}
            </Button>
            <Button
              disabled={props.sendingRequest}
              onClick={() => updateEntryFilter("5")}
              className={`${
                state.entranceScore === "5"
                  ? "btn-secondary is-active"
                  : "btn-secondary"
              }`}
            >
              {intl.formatMessage(messages.accessibleLabel)}
            </Button>
          </ButtonGroup>
        </ButtonGroupWrapper>

        <SelectBox
          id="interiorScore"
          label={intl.formatMessage(messages.interiorScoreLabel)}
          value={state.interiorScore}
          options={state.starsOptions}
          style={{ marginBottom: "1.5rem" }}
          size="sm"
          handleValueChange={handleStateChange}
          className="visually-hidden"
        />

        <ButtonGroupWrapper style={{ marginBottom: "1.5rem" }}>
          <Label>{intl.formatMessage(messages.interiorScoreLabel)}</Label>
          <ButtonGroup size="sm">
            <Button
              disabled={props.sendingRequest}
              onClick={() => updateInteriorFilter("any")}
              className={`${
                state.interiorScore === "any"
                  ? "btn-secondary is-active"
                  : "btn-secondary"
              }`}
            >
              {intl.formatMessage(messages.anyLabel)}
            </Button>
            <Button
              disabled={props.sendingRequest}
              onClick={() => updateInteriorFilter("3")}
              className={`${
                state.interiorScore === "3"
                  ? "btn-secondary is-active"
                  : "btn-secondary"
              }`}
            >
              {intl.formatMessage(messages.yellowBlueLabel)}
            </Button>
            <Button
              disabled={props.sendingRequest}
              onClick={() => updateInteriorFilter("5")}
              className={`${
                state.interiorScore === "5"
                  ? "btn-secondary is-active"
                  : "btn-secondary"
              }`}
            >
              {intl.formatMessage(messages.accessibleLabel)}
            </Button>
          </ButtonGroup>
        </ButtonGroupWrapper>

        <SelectBox
          id="restroomScore"
          label={intl.formatMessage(messages.bathroomScoreLabel)}
          value={state.restroomScore}
          options={state.starsOptions}
          style={{ marginBottom: "1.5rem" }}
          size="sm"
          displayButtonOpts
          handleValueChange={handleStateChange}
          className="visually-hidden"
        />

        <ButtonGroupWrapper style={{ marginBottom: "1.5rem" }}>
          <Label>{intl.formatMessage(messages.bathroomScoreLabel)}</Label>
          <ButtonGroup size="sm">
            <Button
              disabled={props.sendingRequest}
              onClick={() => updateRestroomFilter("any")}
              className={`${
                state.restroomScore === "any"
                  ? "btn-secondary is-active"
                  : "btn-secondary"
              }`}
            >
              {intl.formatMessage(messages.anyLabel)}
            </Button>
            <Button
              disabled={props.sendingRequest}
              onClick={() => updateRestroomFilter("3")}
              className={`${
                state.restroomScore === "3"
                  ? "btn-secondary is-active"
                  : "btn-secondary"
              }`}
            >
              {intl.formatMessage(messages.yellowBlueLabel)}
            </Button>
            <Button
              disabled={props.sendingRequest}
              onClick={() => updateRestroomFilter("5")}
              className={`${
                state.restroomScore === "5"
                  ? "btn-secondary is-active"
                  : "btn-secondary"
              }`}
            >
              {intl.formatMessage(messages.accessibleLabel)}
            </Button>
          </ButtonGroup>
        </ButtonGroupWrapper>

        <CustomButtonGroup
          id="allowsGuideDog"
          label={intl.formatMessage(messages.allowsGuideDogLabel)}
          value={state.allowsGuideDog}
          options={state.booleanOptions}
          style={{ marginBottom: "1.5rem" }}
          size="lg"
          handleValueChange={toggleAllowsGuideDog}
        />

        <CustomButtonGroup
          id="hasParking"
          label={intl.formatMessage(messages.hasParkingLabel)}
          value={state.hasParking}
          options={state.booleanOptions}
          style={{ marginBottom: "1.5rem" }}
          size="lg"
          handleValueChange={toggleParking}
        />
      </Content>

      <Footer>
        <Button
          $backgroundColor={colors.gray500}
          color={colors.white}
          className="gray-btn btn--medium shadow-outer"
          disabled={props.sendingRequest}
          onClickHandler={() => {
            props.clear({});
            props.filtersAppliedCheck(false);
          }}
        >
          {intl.formatMessage(messages.clearFiltersButton)}
        </Button>
        <Button
          $backgroundColor={colors.gray500}
          color={colors.white}
          className="gray-btn btn--medium shadow-outer"
          disabled={props.sendingRequest}
          onClickHandler={() => {
            props.apply({
              type: state.type,
              entranceScore: state.entranceScore,
              interiorScore: state.interiorScore,
              restroomScore: state.restroomScore,
              allowsGuideDog: state.allowsGuideDog,
              hasParking: state.hasParking,
              hasSecondEntry: state.hasSecondEntry,
              hasWellLit: state.hasWellLit,
              isQuiet: state.isQuiet,
              isSpacious: state.isSpacious,
              steps: state.steps,
            });
            if (
              state.type !== initialState.filters.type ||
              state.entranceScore !== initialState.filters.entranceScore ||
              state.interiorScore !== initialState.filters.interiorScore ||
              state.restroomScore !== initialState.filters.restroomScore ||
              state.allowsGuideDog !== initialState.filters.allowsGuideDog ||
              state.hasParking !== initialState.filters.hasParking ||
              state.hasSecondEntry !== initialState.filters.hasSecondEntry ||
              state.hasWellLit !== initialState.filters.hasWellLit ||
              state.isQuiet !== initialState.filters.isQuiet ||
              state.isSpacious !== initialState.filters.isSpacious ||
              state.steps !== initialState.filters.steps
            ) {
              props.filtersAppliedCheck(true);
            } else {
              props.filtersAppliedCheck(false);
            }
          }}
        >
          {intl.formatMessage(messages.applyFiltersButton)}
        </Button>
      </Footer>
    </Dialog>
  );
};

FiltersDialog.propTypes = {
  filters: PropTypes.object.isRequired,
  sendingRequest: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  apply: PropTypes.func.isRequired,
  filtersAppliedCheck: PropTypes.func.isRequired,
};

export default FiltersDialog;
