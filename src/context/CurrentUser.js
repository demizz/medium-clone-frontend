import React, { createContext, useReducer } from 'react';
const initialState = {
  loading: false,
  loggedIn: null,
  currentUser: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'SET_AUTHORIZED':
      return {
        ...state,
        loggedIn: true,
        loading: false,
        currentUser: action.payload,
      };
    case 'SET_UNAUTHORIZED':
      return { ...state, loggedIn: false, currentUser: null };

    default:
      return state;
  }
};
export const CurrentUserContext = createContext();
export const CurrentUserProvider = (props) => {
  const value = useReducer(reducer, initialState);
  // const [state, setState] = useState({
  //   loading: false,
  //   loggedIn: null,
  //   currentUser: null,
  // });
  return (
    <CurrentUserContext.Provider value={value}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};
