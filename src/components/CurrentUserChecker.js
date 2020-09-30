import React, { useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { CurrentUserContext } from '../context/CurrentUser';

const CurrentUserChecker = ({ children }) => {
  const [, dispatch] = useContext(CurrentUserContext);
  const [{ response }, doFetch] = useFetch('/user');
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      dispatch({ type: 'SET_UNAUTHORIZED' });
      return;
    }
    doFetch();
    dispatch({ type: 'LOADING' });
  }, [token, dispatch, doFetch]);
  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
  }, [response, dispatch]);
  return <div>{children}</div>;
};

export default CurrentUserChecker;
