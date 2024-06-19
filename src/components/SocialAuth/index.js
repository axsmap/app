import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import Spinner from '../Spinner'


const SocialAuth = ({ isAuthenticated, authFailed, handleSocialAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleSocialAuth(location);
  }, [handleSocialAuth, location]);

  if (location.search.includes('code=') && !authFailed && !isAuthenticated) {
    return <Spinner />;
  } else if (isAuthenticated) {
    navigate('/');
    return null;
  }

  navigate('/sign-in');
  return null;
};

SocialAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authFailed: PropTypes.bool.isRequired,
  handleSocialAuth: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }),
};

export default SocialAuth;
