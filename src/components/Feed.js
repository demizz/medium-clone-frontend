import React from 'react';
import { Link } from 'react-router-dom';
import TagList from './TagList';
import AddFavorites from './AddFavorites';

const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => {
        return (
          <div className="article-preview" key={index}>
            <div className="article-meta">
              <Link to={`/profiles/${article.author.username}`}>
                <img src={article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${article.author.username}`}
                  className="author"
                >
                  {article.author.username}
                </Link>
                <span className="date">{article.createdAt}</span>
              </div>
              <div className="pull-xs-right">
                <AddFavorites
                  isFavorited={article.favorited}
                  favoritesCount={article.favoritesCount}
                  articleSlug={article.slug}
                />
              </div>
            </div>
            <Link to={`/articles/${article.slug}`} className="preview-link">
              <h1>{article.title}</h1>
              <p>{article.descritpion}</p>
              <span>Read more ....</span>

              <TagList tags={article.tagList} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
