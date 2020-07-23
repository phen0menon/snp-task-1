import { normalize, schema } from 'normalizr';

export const normalizeQuizzes = data => {
  const answer = new schema.Entity('answers');
  const question = new schema.Entity('questions', {
    answers: [answer],
  });
  const quiz = new schema.Entity('quizzes', {
    questions: [question],
  });
  return normalize(data, [quiz]);
};
