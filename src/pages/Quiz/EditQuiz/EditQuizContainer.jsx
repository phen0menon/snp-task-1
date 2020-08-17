import React from 'react';
import PropTypes from 'prop-types';
import EditQuiz from './EditQuiz';
import QuizContainer from '../components/QuizContainer/QuizContainer';
import withAuthentication, {
  AuthenticationStatus,
} from 'hocs/withAuthentication';

const EditQuizContainer = ({ id }) => (
  <QuizContainer id={id} component={EditQuiz} />
);

EditQuizContainer.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default withAuthentication(AuthenticationStatus.AUTHENTICATED)(
  EditQuizContainer
);
