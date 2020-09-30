import React, { useState, useEffect } from 'react';
import BackendErrorMessages from './BackendErrorMessages';
const ArticleForm = ({ onSubmit, errors, initialValues }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagList, setTagList] = useState('');
  useEffect(() => {
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setBody(initialValues.body);
    setTagList('');
  }, [initialValues]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const article = {
      title,
      description,
      body,
      tagList: tagList.split(' '),
    };
    onSubmit(article);
  };
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <BackendErrorMessages backendErrors={errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Article Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Article description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <textarea
                  rows="8"
                  placeholder="write your article in markdown"
                  className="form-control "
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Tags"
                  value={tagList}
                  onChange={(e) => setTagList(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <button
                  type="submit"
                  className="btn btn-lg pull-xs-right btn-primary"
                >
                  submit
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
