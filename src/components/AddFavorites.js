import React from 'react';
import classNames from 'classnames';
import useFetch from '../hooks/useFetch';
const AddFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const isFavoritedWithResponse = response
    ? response.article.favorited
    : isFavorited;
  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;
  console.log(response);
  console.log({ isFavorited, favoritesCount, articleSlug });
  const buttonClasses = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': isFavoritedWithResponse,
    'btn-outline-primary': !isFavoritedWithResponse,
  });
  const handleLike = (event) => {
    event.preventDefault();
    doFetch({
      method: isFavoritedWithResponse ? 'delete' : 'post',
    });
  };

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className="ion-heart">
        <span>&nbsp; {favoritesCountWithResponse}</span>
      </i>
    </button>
  );
};

export default AddFavorites;
