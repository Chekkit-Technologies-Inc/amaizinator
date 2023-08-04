import { FETCH_TRIVIA, FETCH_GAMES, FETCH_LEADERBOARD, FETCH_WINNINGS } from '../type';
// import {games} from '../../util'

const initialState = {};

const triviaReducer = (trivia = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_TRIVIA:
      let data = ''
      if (payload) {
        data = []
        if (payload.length > 0) {
          data = payload.map(d => {
            d.bg_color = '#D2F0FF'
            d.dataType = 'trivia trivias'
            return d
          })
        }
      }
      return {...trivia, triviaList: data};
    case FETCH_GAMES:
      let data2 = ''
      if (payload) {
        data2 = []
        if (payload.length > 0) {
          data2 = payload.filter(d => !d?.title?.toLowerCase()?.includes('tic')).map(d => {
            if (d?.title?.toLowerCase()?.includes('game-')) {
              d.title = d?.title?.split('game-')[1]?.replaceAll('-', ' ')
            }
            d.bg_color = '#FFF2D9'
            d.isGame = true
            d.dataType = 'game games'
            return d
          })
        }
      }
      return {...trivia, games: data2};
    case FETCH_LEADERBOARD:
      return {...trivia, leaderboard: payload};
    case FETCH_WINNINGS:
      return {...trivia, winnings: payload};
    default:
      return trivia;
  }
};

export default triviaReducer;
