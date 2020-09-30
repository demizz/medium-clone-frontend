import React, { useEffect } from 'react';
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
const TagFeed = ({ location, match }) => {
  const tagName = match.params.slug;
  console.log(tagName);
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName,
  });
  const apiUrl = `/articles?${stringifiedParams}`;
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
            <FeedToggler tagName={tagName} />
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

export default withRouter(TagFeed);
