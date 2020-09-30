import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CurrentUserContext } from '../../context/CurrentUser';
import BackendErrorMessages from '../../components/BackendErrorMessages';
const Authentication = (props) => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  console.log(currentUserState);
  const isLogin = props.path === '/login';
  const [, setToken] = useLocalStorage('token');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const apiUrl = isLogin ? 'users/login' : 'users';
  const [password, setPassword] = useState('');
  const [{ loading, response, error }, doFetch] = useFetch(apiUrl);
  const [success, setSuccess] = useState(false);
  const pageTitle = isLogin ? 'login' : 'register';
  const descriptionText = isLogin ? 'Need an account ?' : 'have an account';
  const descriptionLink = isLogin ? '/register' : '/login ';

  const submitHandler = (e) => {
    e.preventDefault();
    const user = isLogin
      ? { email, password }
      : { username: name, email, password };

    doFetch({
      method: 'POST',
      data: {
        user,
      },
    });
  };
  useEffect(() => {
    if (!response) {
      return;
    }
    setToken(response.user.token);
    // localStorage.setItem('token', response.user.token);
    setSuccess(true);
    // setCurrentUserState((state) => ({
    //   ...state,
    //   loggedIn: true,
    //   loading: false,
    //   currentUser: response.user,
    // }));
    dispatch({
      type: 'SET_AUTHERIZED',
      payload: response.user,
    });
  }, [response, setToken, dispatch]);
  if (success) {
    return <Redirect to="/" />;
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form action="" onSubmit={submitHandler}>
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      autoFocus
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="UserName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    type="Email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  disabled={loading}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  {' '}
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
