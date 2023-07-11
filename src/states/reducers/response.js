import { NOTIFY, LOADING } from '../type';

const initialState = {
  title: '',
  message: '',
  type: '',
  loading: false
}

const responseReducer = (response = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NOTIFY:
      return payload;
    case LOADING:
      return { ...initialState, loading: payload };
    default:
      return response;
  }
};

export default responseReducer;
