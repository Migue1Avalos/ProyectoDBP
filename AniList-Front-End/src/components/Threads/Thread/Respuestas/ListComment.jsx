// ListComment.jsx
import React from 'react';
import { Comment } from './Comment';

const ListComment = ({ listcomments, depth = 0}) => {

  return (
    <>
      {listcomments.map((comment, index) => (
        <div key={comment.id} className={`comment-wrap depth-${depth} ${depth % 2 === 0 ? 'even' : 'odd' } ${depth>0 ? 'child':''}` }>
          <div className='collapse'>
            <div className='collapse_bar'></div>
          </div>
          <div className='grow'>
            <Comment comment={comment} depth={depth}/>
          </div>
        </div>
      ))}
    </>
  );
}

export default ListComment;
