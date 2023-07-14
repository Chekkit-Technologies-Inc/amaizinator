import { combineReducers } from 'redux';
import response from './response';
import user from './user';
import trivia from './trivia';

export default combineReducers({
  response,
  user,
  trivia,
});
