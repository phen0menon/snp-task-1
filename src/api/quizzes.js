import Req from './request';

export const fetchQuizzes = () =>
  Req.GET({
    url: '/tests',
  });

export const fetchQuiz = id =>
  Req.GET({
    url: `/tests/${id}`,
  });
