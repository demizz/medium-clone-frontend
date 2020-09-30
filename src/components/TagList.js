import React from 'react'

const TagList = ({tags}) => {
    return (
      <div>
        <ul className="tag-list">
          {tags.map((tag) => (
            <li className="tag-default tag pill tag-outilne">{tag}</li>
          ))}
        </ul>
      </div>
    );
}

export default TagList
