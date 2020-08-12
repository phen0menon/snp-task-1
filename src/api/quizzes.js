import Req from './request';

export const fetchQuizzes = () =>
  Req.GET({
    url: '/tests',
  });

export const fetchQuiz = id =>
  Req.GET({
    url: `/tests/${id}`,
  });

export const createQuiz = data =>
  Req.POST({
    url: `/tests`,
    data,
  });
