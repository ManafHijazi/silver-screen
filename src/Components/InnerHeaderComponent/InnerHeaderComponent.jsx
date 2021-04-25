import React from 'react';
import { PropTypes } from 'prop-types';

export const InnerHeaderComponent = ({ component }) => (
  <div className='inner-header-view-wrapper'>
    <div className='inner-header-view-item'>{component || undefined}</div>
  </div>
);
InnerHeaderComponent.propTypes = {
  component: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func, PropTypes.node]),
};
InnerHeaderComponent.defaultProps = {
  component: undefined,
};
