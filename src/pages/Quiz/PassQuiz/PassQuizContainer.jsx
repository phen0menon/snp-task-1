import React from 'react';
import PropTypes from 'prop-types';
import QuizContainer from '../components/QuizContainer/QuizContainer';
import PassQuiz from './PassQuiz';

const PassQuizContainer = ({ id }) => (
  <QuizContainer id={id} component={PassQuiz} />
);

PassQuizContainer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default PassQuizContainer;
