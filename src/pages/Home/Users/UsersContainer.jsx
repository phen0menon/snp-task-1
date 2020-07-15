import React, { useEffect } from 'react';

import { actions } from 'models/users/slice';
import useAction from 'hooks/useAction';
import useSelector from 'hooks/useSelector';

import {
  collectionSelector,
  isFetchingSelector,
  isCollectionFetchedSelector,
} from 'models/users/selectors';

import Users from './Users';

const UsersContainer = () => {
  const onFetchUsers = useAction(actions.fetchUsers);
  const users = useSelector(collectionSelector);
  const fetching = useSelector(isFetchingSelector);
  const collectionFetched = useSelector(isCollectionFetchedSelector);

  useEffect(() => {
    if (!collectionFetched) {
      onFetchUsers();
    }
  }, [onFetchUsers, collectionFetched]);

  return <Users list={users} fetching={fetching} />;
};

export default UsersContainer;
