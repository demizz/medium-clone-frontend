import React, { useEffect, useState, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import TagList from '../../components/TagList';
import { CurrentUserContext } from '../../context/CurrentUser';
const Article = (props) => {
  const slug = props.match.params.slug;
  console.log('slug', slug);
  const apiUrl = `articles/${slug}`;
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(
    apiUrl
  );

  const [successfullDelete, SetSuccessfullDelete] = useState(false);
  const [
    {
      response: fetchArticleResponse,
      loading: fetchArticleLoading,
      error: fetchArticleError,
    },
    doFetch,
  ] = useFetch(apiUrl);
  console.log({ fetchArticleResponse, fetchArticleLoading, fetchArticleError });
  const [currentUserState] = useContext(CurrentUserContext);
  const isAuthor = () => {
    if (currentUserState.loggedIn === false || !fetchArticleResponse) {
      return false;
    }
    return (
      currentUserState.currentUser.username ===
      fetchArticleResponse.article.author.username
    );
  };
  console.log({ isAuthor: isAuthor() });
  useEffect(() => {
    doFetch();
  }, [doFetch]);
  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete',
    });
  };
  useEffect(() => {
    if (!deleteArticleResponse) {
      return;
    }
    SetSuccessfullDelete(true);
  }, [deleteArticleResponse]);
  if (successfullDelete) {
    return <Redirect to="/" />;
  }
  return (
    <div className="artcile-page">
      <div className="banner">
        {!fetchArticleLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img
                  src={fetchArticleResponse.article.author.image}
                  alt={fetchArticleResponse.article.author}
                />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="data">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <React.Fragment>
                  <span>
                    <Link
                      to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                      className="btn btn -outline"
                    >
                      <i className="ion-edit">Edit Article</i>
                    </Link>
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    <i className="ion-trash-a">deleteArtcle</i>
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleLoading && <Loading />}
        {fetchArticleError && !fetchArticleLoading && <ErrorMessage />}
        {!fetchArticleLoading && !fetchArticleError && fetchArticleResponse && (
          <div className="row artilce-content">
            <div>
              <p>{fetchArticleResponse.article.body}</p>
            </div>
            <TagList tags={fetchArticleResponse.article.tagList} />
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Article);
