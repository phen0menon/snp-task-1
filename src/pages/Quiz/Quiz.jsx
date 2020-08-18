import React from 'react';
import withSceneUrl from 'hocs/withSceneUrl';
import { Route, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditQuiz from './EditQuiz';
// TODO: move it to another module
import { createRoutePage } from '../../routes';
import PassQuiz from './PassQuiz';

const Quiz = ({ sceneUrl }) => {
  const { id } = useParams();

  return (
    <>
      <Route
        path={sceneUrl('edit')}
        render={createRoutePage(EditQuiz, `Edit ${id} quiz`, { id })}
        exact
      />
      <Route
        path={sceneUrl('')}
        render={createRoutePage(PassQuiz, 'Pass quiz', { id })}
        exact
      />
    </>
  );
};

Quiz.propTypes = {
  sceneUrl: PropTypes.func.isRequired,
};

export default withSceneUrl(Quiz);
