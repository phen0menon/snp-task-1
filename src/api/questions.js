import Req from './request';

export const fetchCreateQuestion = ({ quizId, data }) =>
  Req.POST({
    url: `/tests/${quizId}/questions`,
    data,
  });

export const fetchDeleteQuestion = ({ questionId }) =>
  Req.DELETE({
    url: `/questions/${questionId}`,
  });

export const fetchUpdateQuestion = ({ id, questionData }) =>
  Req.PATCH({
    url: `/questions/${id}`,
    data: questionData,
  });
