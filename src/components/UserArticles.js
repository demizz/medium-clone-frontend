import React, { useEffect } from 'react';
import { stringify } from 'query-string';
import { getPaginator, limit } from '../utils/utils';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import Pagination from './Pagination';
import useFetch from '../hooks/useFetch';
import Feed from './Feed';
const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? {
        limit,
        offset,
        favorites: username,
      }
    : { limit, offset, author: username };
  return `/articles?${stringify(params)}`;
};
const UserArticles = ({ url, location, username }) => {
  const isFavorites = location.pathname.includes('favorites');
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, loading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites, currentPage]);

  return (
    <div>
      {loading && <Loading />}
      {error && <ErrorMessage />}
      {!loading && response && (
        <React.Fragment>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default UserArticles;
