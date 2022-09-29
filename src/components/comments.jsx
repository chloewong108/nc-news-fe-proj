import { useEffect, useState } from "react";
import { getAllComments } from "../api";
import { useParams } from "react-router-dom";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getAllComments(article_id).then((res) => {
      setComments(res);
    });
  }, [article_id]);

  return (
    <>
      <div id="comment-card">
        <h4 id="comment-title">Comments:</h4>
        <ul id="comment-list">
          {comments.map((comment) => {
            console.log(comment);
            return (
              <li id="each-comment" key={comment.comment_id}>
                <p>{comment.author}:</p>
                <p>{comment.body}</p>
                <p>Votes: {comment.votes}</p>
                <p>Date: {comment.created_at}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Comments;
