import PropTypes from 'prop-types'
import React, { useEffect, useSyncExternalStore } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { ButtonGroup } from 'reactstrap'
import Button from '../Button'
import Dialog from '../Dialog'
import Icon from '../Icon'
import SelectBox from '../SelectBox'
import CustomButtonGroup from '../CustomButtonGroup'
import { colors, fonts, fontWeight, fontSize, media } from '../../styles'

import messages from './messages'

const Header = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  height: 4rem;
  padding: 15px 20px;
  background-color: ${colors.white};
`

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
`

const Content = styled.div`
  display: flex;
  overflow-y: auto;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: 15px 20px;
`

const ButtonGroupWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
`
const Label = styled.label`
  display: block;
  margin-bottom: 1.25rem;
  width: 100%;
  color: ${colors.textColor} !important;
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  font-family: ${fonts.primary};
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  justify-content: space-between;
  height: 84px;
  padding: 20px 26px;
  background-color: ${colors.white};
`

const FiltersDialog = ({ filters, sendingRequest, hide, clear, apply }) => {
  const { formatMessage } = useIntl();
  const [numberOfReviews, setNumberOfReviews] = useSyncExternalStore(filters.numberOfReviews);
  const [date, setDate] = useState(filters.date);
  const [geolocation, setGeolocation] = useState(filters.geolocation);
  const [hideZeroReviews, setHideZeroReviews] = useState(filters.hideZeroReviews);
  const [hideInactiveMapathons, setHideInactiveMapathons] = useState(filters.hideInactiveMapathons);
  const [gettingGeolocation, setGettingGeolocation] = useState(false);

  useEffect(() => {
    setNumberOfReviews(filters.numberOfReviews);
    setDate(filters.date);
    setGeolocation(filters.geolocation);
    setHideZeroReviews(filters.hideZeroReviews);
    setHideInactiveMapathons(filters.hideInactiveMapathons);
  }, [filters]);

  const updateGeolocation = (event) => {
    const radius = parseInt(event.target.value);
    setGettingGeolocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setGeolocation({ radius, lat, long });
        setGettingGeolocation(false);
      },
      () => {
        alert('Unable to retrieve your location. Make sure you have allowed AXS Map to retrieve your location');
        setGeolocation({ radius: 0, lat: 0, long: 0 });
        setGettingGeolocation(false);
      }
    );
  };

  const options = [
    { value: '0', label: 'All' },
    { value: '10', label: '10 Miles' },
    { value: '25', label: '25 Miles' },
    { value: '50', label: '50 Miles' },
  ];

  const booleanOptions = [
    { value: 1, label: formatMessage(messages.hideZeroReviews) },
  ];

  const inactiveBooleanOptions = [
    { value: 1, label: formatMessage(messages.hideInactiveMapathons) },
  ];

  return (
    <Dialog hide={hide}>
      <Header>
        <Button
          $backgroundColor={colors.backgroundColor}
          color={colors.darkestGrey}
          disabled={sendingRequest}
          onClickHandler={hide}
          style={{ padding: '0rem' }}
        >
          <Icon
            glyph="cross"
            size={1}
            $backgroundColor={colors.backgroundColor}
            disabled={sendingRequest}
            onClickHandler={hide}
            color={colors.darkestGrey}
          />
        </Button>
        <Title>{formatMessage(messages.filtersTitle)}</Title>
      </Header>

      <Content>
        <ButtonGroupWrapper style={{ marginBottom: '1.5rem' }}>
          <Label>Number of Reviews</Label>
          <ButtonGroup size="sm">
            <Button
              disabled={sendingRequest}
              onClick={() => setNumberOfReviews(0)}
              className={`${numberOfReviews === 0 ? 'btn-secondary is-active' : 'btn-secondary'}`}
            >
              Any
            </Button>
            <Button
              disabled={sendingRequest}
              onClick={() => setNumberOfReviews(1)}
              className={`${numberOfReviews === 1 ? 'btn-secondary is-active' : 'btn-secondary'}`}
            >
              Ascending
            </Button>
            <Button
              disabled={sendingRequest}
              onClick={() => setNumberOfReviews(-1)}
              className={`${numberOfReviews === -1 ? 'btn-secondary is-active' : 'btn-secondary'}`}
            >
              Descending
            </Button>
          </ButtonGroup>
        </ButtonGroupWrapper>
        <ButtonGroupWrapper style={{ marginBottom: '1.5rem' }}>
          <Label>Date</Label>
          <ButtonGroup size="sm">
            <Button
              disabled={sendingRequest}
              onClick={() => setDate(0)}
              className={`${date === 0 ? 'btn-secondary is-active' : 'btn-secondary'}`}
            >
              Any
            </Button>
            <Button
              disabled={sendingRequest}
              onClick={() => setDate(1)}
              className={`${date === 1 ? 'btn-secondary is-active' : 'btn-secondary'}`}
            >
              Ascending
            </Button>
            <Button
              disabled={sendingRequest}
              onClick={() => setDate(-1)}
              className={`${date === -1 ? 'btn-secondary is-active' : 'btn-secondary'}`}
            >
              Descending
            </Button>
          </ButtonGroup>
        </ButtonGroupWrapper>
        <Label>Location</Label>
        <SelectBox
          id="radius"
          value={geolocation.radius}
          options={options}
          style={{ marginBottom: '1.5rem' }}
          handleValueChange={updateGeolocation}
          ariaLabel="Filter by Type"
        />

        <CustomButtonGroup
          id="hideZeroReviews"
          value={hideZeroReviews}
          options={booleanOptions}
          style={{ marginBottom: '1.5rem' }}
          size="lg"
          handleValueChange={() => setHideZeroReviews(hideZeroReviews <= 0 ? 1 : -1)}
        />

        <CustomButtonGroup
          id="hideInactiveMapathons"
          value={hideInactiveMapathons}
          options={inactiveBooleanOptions}
          style={{ marginBottom: '1.5rem' }}
          size="lg"
          handleValueChange={() => setHideInactiveMapathons(hideInactiveMapathons <= 0 ? 1 : -1)}
        />
      </Content>

      <Footer>
        <Button
          $backgroundColor={colors.gray500}
          color={colors.white}
          className="gray-btn btn--medium shadow-outer"
          disabled={sendingRequest}
          onClickHandler={clear}
        >
          Clear
        </Button>
        <Button
          $backgroundColor={colors.gray500}
          color={colors.white}
          className="gray-btn btn--medium shadow-outer"
          disabled={sendingRequest || gettingGeolocation}
          onClickHandler={() =>
            apply({
              numberOfReviews,
              date,
              geolocation,
              hideZeroReviews,
              hideInactiveMapathons
            })}
        >
          Apply
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
};

export default FiltersDialog;