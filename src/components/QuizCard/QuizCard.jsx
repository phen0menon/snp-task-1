import React from 'react';
import PropTypes from 'prop-types';

const QuizCard = ({ title }) => {
  return <div>{title}</div>;
};

QuizCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default React.memo(QuizCard);
