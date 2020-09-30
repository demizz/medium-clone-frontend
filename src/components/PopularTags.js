import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
const PopularTags = () => {
  const [{ response, loading, error }, doFetch] = useFetch('/tags');
  console.log({ response, loading, error });
  useEffect(() => {
    doFetch();
  }, [doFetch]);
  if (loading && !response && !error) {
    return <Loading />;
  }
  if (!loading && error) {
    return <ErrorMessage />;
  }
  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {response &&
          response.tags.map((tag, index) => (
            <Link
              key={index}
              to={`/tags/${tag}`}
              className="tag-default tag-pill"
            >
              {tag}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PopularTags;
