import Req from './request';

export const fetchCreateAnswer = ({ questionId, text }) =>
  Req.POST({
    url: `/questions/${questionId}/answers`,
    data: { text },
  });
