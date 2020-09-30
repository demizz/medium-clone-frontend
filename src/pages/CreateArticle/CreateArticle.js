import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ArticleForm from '../../components/ArticleForm';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../context/CurrentUser';
const CreateArticle = () => {
  const apiUrl = 'articles';
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [{ response, error, loading }, doFetch] = useFetch(apiUrl);
  console.log({ response, error, loading });
  const [currentUserState] = useContext(CurrentUserContext);
  const onSubmit = (article) => {
    doFetch({
      method: 'POST',
      data: {
        article,
      },
    });
  };
  useEffect(() => {
    if (!response) {
      return;
    }
    setIsSuccessfullSubmit(true);
  }, [response]);
  if (currentUserState === null) {
    return null;
  }
  if (isSuccessfullSubmit || currentUserState.loggedIn === false) {
    return <Redirect to="/" />;
  }
  const initialValues = {
    title: '',
    description: '',
    body: '',
    taglist: [],
  };
  const errors = {};
  return (
    <div>
      <ArticleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        errors={(error && error.errors) || []}
      />
    </div>
  );
};

export default CreateArticle;
