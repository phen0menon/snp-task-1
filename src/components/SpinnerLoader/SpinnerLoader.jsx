import React from 'react';
import PropTypes from 'prop-types';
import spinnerAnimated from 'images/spinner-animated.svg';
import Loading from 'components/Loading/Loading';

const SpinnerLoader = ({ loading, size, children }) => {
  const loader = React.useCallback(
    () => <img src={spinnerAnimated} width={size} alt="sending..." />,
    [size]
  );

  return (
    <Loading active={loading} disabled={!loading} loader={loader}>
      {children}
    </Loading>
  );
};

SpinnerLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default React.memo(SpinnerLoader);
