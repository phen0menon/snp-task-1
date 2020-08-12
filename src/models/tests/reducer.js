import { combineReducers } from 'redux-starter-kit';
import quizzesReducer from './quizzes/slice';
import answersReducer from './answers/slice';
import questionsReducer from './questions/slice';

export default combineReducers({
  quizzes: quizzesReducer,
  answers: answersReducer,
  questions: questionsReducer,
});
