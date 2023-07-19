import { FETCH_TRIVIA, FETCH_LEADERBOARD, FETCH_WINNINGS } from '../type';
import {games} from '../../util'

const initialState = {games};

const triviaReducer = (trivia = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_TRIVIA:
      return {...trivia, triviaList: payload};
    case FETCH_LEADERBOARD:
      return {...trivia, leaderboard: payload};
    case FETCH_WINNINGS:
      return {...trivia, winnings: payload};
    default:
      return trivia;
  }
};

export default triviaReducer;
