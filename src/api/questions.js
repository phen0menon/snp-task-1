import Req from './request';

export const fetchCreateQuestion = ({ quizId, data }) =>
  Req.POST({
    url: `/tests/${quizId}/questions`,
    data,
  });
