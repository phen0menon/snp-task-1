import React from 'react';
import withSceneUrl from 'hocs/withSceneUrl';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditQuiz from './EditQuiz';

const B = () => 'f';

const Quiz = ({ sceneUrl }) => {
  const {
    params: { id },
  } = useRouteMatch();

  return (
    <Switch>
      <Route
        path={sceneUrl('edit')}
        render={props => <EditQuiz {...props} id={id} />}
      />
      <Route path={sceneUrl('')} component={B} />
    </Switch>
  );
};

Quiz.propTypes = {
  sceneUrl: PropTypes.func.isRequired,
};

export default withSceneUrl(Quiz);
