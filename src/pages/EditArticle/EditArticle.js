import React, { useState, useEffect, useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import ArticleForm from '../../components/ArticleForm';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../context/CurrentUser';

const EditArticle = ({ match }) => {
  const slug = match.params.slug;
  console.log(slug);
  const apiUrl = `/articles/${slug}`;
  const [currentUserState] = useContext(CurrentUserContext);

  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl);
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  console.log(fetchArticleResponse);

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }
    if (!initialValues) {
      return;
    }
    console.log(fetchArticleResponse);
    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      taglist: fetchArticleResponse.article.tagList.join(' '),
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }
    setIsSuccessfullSubmit(true);
  }, [updateArticleResponse]);
  if (currentUserState === null) {
    return null;
  }
  if (isSuccessfullSubmit || currentUserState.loggedIn === false) {
    return <Redirect to="/" />;
  }

  const onSubmit = (article) => {
    doUpdateArticle({
      method: 'put',
      data: {
        article,
      },
    });
  };
  return (
    <div>
      <ArticleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        errors={(updateArticleError && updateArticleError.errors) || []}
      />
    </div>
  );
};

export default withRouter(EditArticle);
