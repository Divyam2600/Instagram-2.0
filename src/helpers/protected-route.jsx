import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

function ProtectedRoutes({ user, children }) {
  if (user) {
    return children;
  } else if (!user) {
    return (
      <Navigate
        to={{
          pathname: ROUTES.LOGIN,
          state: { from: location }
        }}
      />
    );
  }
  return null;
}

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired
};
