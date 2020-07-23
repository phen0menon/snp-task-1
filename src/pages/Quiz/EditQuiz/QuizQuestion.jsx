import React from 'react';
import PropTypes from 'prop-types';
import useSelector from 'hooks/useSelector';
import { getQuestionByIdSelector } from 'models/questions/selectors';

const QuizQuestion = ({ id }) => {
  const question = useSelector(getQuestionByIdSelector, id);

  return question.title;
};

QuizQuestion.propTypes = {
  id: PropTypes.number.isRequired,
};

export default React.memo(QuizQuestion);
