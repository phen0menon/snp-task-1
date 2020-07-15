import Req from './request';

export const fetchUsers = () =>
  Req.GET({
    url: '/users',
  });

export const fetchUser = () => {
  return Promise.reject(new Error('Not found'));
};
