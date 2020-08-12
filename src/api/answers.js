import Req from './request';

export const fetchCreateAnswer = ({ questionId, text }) =>
  Req.POST({
    url: `/questions/${questionId}/answers`,
    data: { text },
  });

export const fetchDeleteAnswer = ({ id }) =>
  Req.DELETE({
    url: `/answers/${id}`,
  });

export const fetchUpdateAnswer = ({ id, data }) =>
  Req.PATCH({
    url: `/answers/${id}`,
    data,
  });
