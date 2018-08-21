import { createStore } from 'redux';

const initialState = {

}

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SOME_ACTION':
      return state;
    default:
      return state;
  }
}

const store = createStore(myReducer);

export default store;
