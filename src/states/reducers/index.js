import { combineReducers } from 'redux';
import response from './response';
import user from './user';
import rewards from './rewards';

export default combineReducers({
  response,
  user,
  rewards,
});
