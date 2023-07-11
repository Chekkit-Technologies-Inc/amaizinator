import { NOTIFY, LOADING } from '../type';

export const loading = data => async dispatch => {
  dispatch({
    type: LOADING,
    payload: data,
  });
};

export const notify = data => async dispatch => {
  dispatch({
    type: NOTIFY,
    payload: data,
  });
};

const ResponseActions = {
  loading,
  notify,
};

export default ResponseActions;
