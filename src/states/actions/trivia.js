import { FETCH_TRIVIA, FETCH_GAMES, FETCH_LEADERBOARD, FETCH_WINNINGS } from '../type';

import { TriviaService } from '../../services';
import { notify, loading } from './response';

export const fetchTrivia = () => async dispatch => {
  dispatch(loading({ loading: true }));

  try {
    const res = await TriviaService.retrieveAllTrivia();

    dispatch(notify({ loading: false }));

    dispatch({
      type: FETCH_TRIVIA,
      payload: res?.data?.data,
    });

    return Promise.resolve(res?.data?.data);
  } catch (err) {
    dispatch(notify({ loading: false }));

    dispatch({
      type: FETCH_TRIVIA,
      payload: [],
    });

    return Promise.reject(err);
  }
};

export const fetchGames = () => async dispatch => {
  dispatch(loading({ loading: true }));

  try {
    const res = await TriviaService.retrieveAllGames();

    dispatch(notify({ loading: false }));

    dispatch({
      type: FETCH_GAMES,
      payload: res?.data?.data,
    });

    return Promise.resolve(res?.data?.data);
  } catch (err) {
    dispatch(notify({ loading: false }));

    dispatch({
      type: FETCH_GAMES,
      payload: [],
    });

    return Promise.reject(err);
  }
};

export const submitTrivia = (data) => async dispatch => {

  dispatch(loading({ loading: true }));

  try {
    const res = await TriviaService.submitTrivia(data);

    dispatch(notify({ title: "", message: 'Good job!', type: 'success', loading: false }));

    return Promise.resolve(res?.data);
  } catch (err) {
    dispatch(notify({ title: "", message: err.response?.data?.message || err.message, type: 'error', loading: false }));

    return Promise.reject(err);
  }
};

export const saveHash = (hash) => async () => {
  try {
    const res = await TriviaService.saveHash(hash);
    return Promise.resolve(res?.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchLeaderboard = (from, to) => async dispatch => {
  dispatch(loading({ loading: true }));

  try {
    const res = await TriviaService.retrieveLeaderboard(from, to);

    dispatch(notify({ loading: false }));

    dispatch({
      type: FETCH_LEADERBOARD,
      payload: res?.data?.data,
    });

    return Promise.resolve(res?.data?.data);
  } catch (err) {
    dispatch(notify({ loading: false }));

    dispatch({
      type: FETCH_LEADERBOARD,
      payload: [],
    });

    return Promise.reject(err);
  }
};

export const fetchWinnings = (from, to) => async dispatch => {
  dispatch(loading({ loading: true }));

  try {
    const res = await TriviaService.retrieveWinnings(from, to);

    dispatch(notify({ loading: false }));

    dispatch({
      type: FETCH_WINNINGS,
      payload: res?.data?.data,
    });

    return Promise.resolve(res?.data?.data);
  } catch (err) {
    dispatch(notify({ loading: false }));

    dispatch({
      type: FETCH_WINNINGS,
      payload: [],
    });

    return Promise.reject(err);
  }
};

const TriviaActions = {
  fetchTrivia,
  fetchGames,
  submitTrivia,
  saveHash,
  fetchLeaderboard,
  fetchWinnings,
};

export default TriviaActions;
