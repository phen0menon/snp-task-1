import Req from './request';

export const fetchQuizzes = () =>
  Req.GET({
    url: '/tests',
  });
