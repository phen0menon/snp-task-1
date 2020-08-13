import React from 'react';
import withSceneUrl from 'hocs/withSceneUrl';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditQuiz from './EditQuiz';
// TODO: move it to another module
import { createRoutePage } from '../../routes';
import PassQuiz from './PassQuiz';

const Quiz = ({ sceneUrl }) => {
  const {
    params: { id },
  } = useRouteMatch();

  return (
    <>
      <Route
        path={sceneUrl('edit')}
        render={props => <EditQuiz {...props} id={id} />}
      />
      <Route
        path={sceneUrl('')}
        render={createRoutePage(PassQuiz, 'Pass quiz', { id })}
      />
    </>
  );
};

Quiz.propTypes = {
  sceneUrl: PropTypes.func.isRequired,
};

export default withSceneUrl(Quiz);
