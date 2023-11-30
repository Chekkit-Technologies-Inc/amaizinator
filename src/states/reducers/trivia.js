import { FETCH_TRIVIA, FETCH_GAMES, FETCH_LEADERBOARD, FETCH_WINNINGS } from '../type';

const initialState = {};

const dates = ['2023-11-25', '2023-12-29', '2023-12-02', '2023-12-10', '2023-12-16', '2023-12-26']

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
            d.availableDate = dates[Math.floor(Math.random() * (4 - 0 + 1) + 0)]
            d.isAvailable = Date.now() > new Date(d?.availableDate).getTime()
            return d
          })
        }
      }
      return { ...trivia, triviaList: data };
    case FETCH_GAMES:
      let data2 = ''
      if (payload) {
        data2 = []
        if (payload.length > 0) {
          data2 = payload.filter(d => !d?.title?.toLowerCase()?.includes('tic tac')).map(d => {
            if (d?.title?.toLowerCase()?.includes('game-')) {
              d.title = d?.title?.split('game-')[1]?.replaceAll('-', ' ')
            }
            if (d?.title?.toLowerCase()?.includes('speed chop')) {
              d.insta = true
            }
            d.bg_color = '#FFF2D9'
            d.isGame = true
            d.dataType = 'game games'
            d.availableDate = dates[Math.floor(Math.random() * (4 - 0 + 1) + 0)]
            d.isAvailable = Date.now() > new Date(d?.availableDate).getTime()
            return d
          })

        }
      }
      return { ...trivia, games: data2 };
    case FETCH_LEADERBOARD:
      return { ...trivia, leaderboard: payload };
    case FETCH_WINNINGS:
      return { ...trivia, winnings: payload };
    default:
      return trivia;
  }
};

export default triviaReducer;
