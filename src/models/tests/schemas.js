import { schema } from 'normalizr';

export const answerSchema = new schema.Entity('answers');

export const questionSchema = new schema.Entity('questions', {
  answers: [answerSchema],
});

export const quizSchema = new schema.Entity('quizzes', {
  questions: [questionSchema],
});
