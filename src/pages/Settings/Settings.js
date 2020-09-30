import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUser';
import useFetch from '../../hooks/useFetch';
import BackendErrorMessages from '../../components/BackendErrorMessages';

const Settings = () => {
  const apiUrl = '/user';
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successLogout, setSuccessLogout] = useState(false);
  const [bio, setBio] = useState('');

  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const [{ response, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    if (!currentUserState.currentUser) {
      return;
    }
    setName(currentUserState.currentUser.username);
    setImage(currentUserState.currentUser.image);
    setBio(currentUserState.currentUser.bio);
    setEmail(currentUserState.currentUser.email);
  }, [currentUserState.currentUser]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
  }, [response, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit', image, name, email, password, bio);
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          username: name,
          email,
          bio,
          password,
        },
      },
    });
  };
  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    dispatch({ type: 'SET_UNAUTHORIZED' });
    setSuccessLogout(true);
  };
  if (successLogout) {
    return <Redirect to="/" />;
  }
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center"> your Settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Url fo profile picture"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="UserName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Bio"
                    value={bio}
                    rows={8}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="email"
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
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Setting
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
