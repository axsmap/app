import { bool, func, string } from "prop-types";
import React from "react";
import ReactGA from "react-ga";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";

import Notification from "../Notification";
import PrivateRoute from "../PrivateRoute";
import ProgressBar from "../ProgressBar";
import notificationSelector from "../Notification/selector";
import Spinner from "../../components/Spinner";

import { getProfile } from "./actions";
import * as components from "./components";
import appSelector from "./selector";
import GlobalStyles from '../../styles'

const Wrapper = styled.div`
  display: flex;
  min-height: inherit;
  width: 100%;
`;

class App extends React.Component {
  static propTypes = {
    isAuthenticating: bool.isRequired,
    notificationMessage: string,
    getProfile: func.isRequired,
  };

  UNSAFE_componentWillMount() {
    ReactGA.initialize("UA-12719646-3");
    this.props.getProfile();
  }

  render() {
    if (this.props.isAuthenticating) {
      return <Spinner />;
    }

    return (
      <Wrapper>
        <GlobalStyles />
        <ProgressBar />

        {this.props.notificationMessage ? <Notification /> : null}

        <BrowserRouter>
          <Routes>
            {/* Authentication pages */}
            <Route path="/sign-in" element={<components.SignInPage />} />
            <Route path="/auth/facebook" element={components.SocialAuthPage} />
            <Route
              path="/auth/google"
              element={<components.SocialAuthPage />}
            />
            <Route path="/sign-up" element={<components.SignUpPage />} />
            <Route
              path="/forgotten-password"
              element={<components.ForgottenPasswordPage />}
            />
            <Route
              path="/reset-password"
              element={<components.ResetPasswordPage />}
            />

            {/* Venues pages */}
            <Route exact path="/" element={<components.VenuesPage />} />

            {/* <PrivateRoute
              path="/venues/:placeId/review"
              element={components.CreateReviewPage}
            /> */}

            <Route
              path="/venues/:placeId/thank-you"
              element={<components.ThankYouReviewPage />}
            />

            <Route path="/venues/:placeId" element={<components.VenuePage />} />

            {/* Mapathons pages */}
            <Route
              exact
              path="/mapathons"
              element={<components.MapathonsPage />}
            />
            {/* <PrivateRoute
              exact
              path="/mapathons/create"
              element={components.CreateMapathonPage}
            /> */}
            <Route
              path="/mapathons/:mapathonId"
              element={<components.MapathonPage />}
            />

            {/* Teams pages */}
            <Route exact path="/teams" element={<components.TeamsPage />} />
            {/* <PrivateRoute
              exact
              path="/teams/create"
              element={components.CreateTeamPage}
            /> */}
            <Route path="/teams/:teamId" element={<components.TeamPage />} />

            {/* User page */}
            <Route path="/users/:userId" element={<components.UserPage />} />

            {/* Contact page */}
            <Route exact path="/contact" element={<components.ContactPage />} />

            {/* FAQ page */}
            <Route exact path="/faq" element={<components.FaqPage />} />

            {/* Terms & Conditions page */}
            <Route
              exact
              path="/terms-conditions"
              element={<components.TacPage />}
            />

            {/* Donate */}
            <Route exact path="/donate" element={<components.DonatePage />} />

            {/* Not found page */}
            <Route element={<components.NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticating: appSelector("isAuthenticating"),
  notificationMessage: notificationSelector("message"),
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => {
    dispatch(getProfile());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
