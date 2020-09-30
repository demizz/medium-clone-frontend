import React, { useEffect, useContext } from 'react';
import Feed from '../../components/Feed';
import { withRouter } from 'react-router-dom';
import { stringify } from 'query-string';
import useFetch from '../../hooks/useFetch';
import Pagination from '../../components/Pagination';
import { getPaginator, limit } from '../../utils/utils';
import PopularTags from '../../components/PopularTags';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import FeedToggler from '../../components/FeedToggler';
import Banner from '../../components/Banner';
import { CurrentUserContext } from '../../context/CurrentUser';
const YourFeed = ({ location, match }) => {
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
  });
  const apiUrl = `/articles/feed?${stringifiedParams}`;
  const currentUrl = match.url;

  const [{ response, loading, error }, doFetch] = useFetch(apiUrl);
  useEffect(() => {
    doFetch();
  }, [doFetch]);
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {loading && <Loading />}
            {error && !loading && <ErrorMessage />}
            {!loading && response && (
              <React.Fragment>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  currentPage={currentPage}
                  url={currentUrl}
                />
              </React.Fragment>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(YourFeed);
