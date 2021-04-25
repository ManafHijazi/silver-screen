import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const PermissionsComponent = ({ permissionsList, children }) => {
  const [allowed, setAllowed] = useState(false);
  const loginResponse = useSelector((state) => state.login.loginResponse);
  useEffect(() => {
    setAllowed(
      permissionsList.some(
        (permission) =>
          loginResponse &&
          loginResponse.permissions &&
          loginResponse.permissions.includes(permission)
      )
    );
  }, [loginResponse, permissionsList]);
  return (allowed && children) || null;
};

PermissionsComponent.propTypes = {
  permissionsList: PropTypes.instanceOf(Array),
};
PermissionsComponent.defaultProps = {
  permissionsList: [],
};
