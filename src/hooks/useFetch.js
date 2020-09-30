import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState({});
  const [error, setError] = useState(false);
  const token = localStorage.getItem('token');
  const doFetch = useCallback((config = {}) => {
    setLoading(true);
    setOptions(config);
  }, []);
  useEffect(() => {
    let skipGetReponse = false;
    if (!loading) {
      return;
    }
    const requestOptions = {
      ...options,
      headers: { authorization: token ? `Token ${token}` : '' },
    };
    axios(`${baseUrl}/${url}`, requestOptions)
      .then((res) => {
        if (!skipGetReponse) {
          setResponse(res.data);
          setLoading(false);
          console.log(response);
        }
      })
      .catch((err) => {
        if (!skipGetReponse) {
          setError(err);
          setLoading(false);
          console.log(err);
        }
      });
    return () => {
      skipGetReponse = true;
    };
  }, [loading, options, url, response, token]);

  return [{ loading, response, error }, doFetch];
};
