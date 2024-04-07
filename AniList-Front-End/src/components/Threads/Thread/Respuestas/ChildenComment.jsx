// ChildenComment.jsx
import React, { useEffect } from 'react';
import axios from 'axios';
import ListComment from './ListComment';
import backendUrl from '../../../../ApiConfig';

export const ChildenComment = ({ comment_id, depth }) => {

  const [listcomments, setListcomments] = React.useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}/respuestas/respuestas-padre/${comment_id}`)
      .then((response) => {
        setListcomments(response.data);
      });
  }, [comment_id]);

  return (
    <ListComment listcomments={listcomments} depth={depth} />
  );
}
