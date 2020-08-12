import { normalize } from 'normalizr';
import { quizSchema } from '../schemas';

export const normalizeQuizzes = data => normalize(data, [quizSchema]);
