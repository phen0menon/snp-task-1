import React from 'react';
import { useRouteMatch } from 'react-router-dom';

const constructSceneUrl = match => url => `${match}/${url}`;

const withSceneUrl = Component => props => {
  const { url } = useRouteMatch();
  const sceneUrl = constructSceneUrl(url);
  return <Component {...props} sceneUrl={sceneUrl} />;
};

export default withSceneUrl;
