import Req from './request';

export const fetchLogin = ({ userName, password }) =>
  Req.POST({
    url: '/signin',
    body: {
      username: userName,
      password: password,
    },
  });
