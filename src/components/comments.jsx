import { useEffect, useState } from "react";
import { getAllComments } from "../api";
import { useParams } from "react-router-dom";
import PostComment from "./postComment";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllComments(article_id).then((res) => {
      setIsLoading(false);
      setComments(res);
    });
  }, [article_id]);

  if (isLoading)
    return (
      <p>
        <span role="img" aria-hidden={true} />
        🐢
        <span /> Loading...
        <span role="img" aria-hidden={true}>
          🐢
        </span>
      </p>
    );

  return (
    <>
      <div id="comment-card">
        <h4 id="comment-title">Comments:</h4>
        <ul id="comment-list">
          {comments.map((comment) => {
            const date = new Date(comment.created_at);

            return (
              <li id="each-comment" key={comment.comment_id}>
                <p>{comment.author}:</p>
                <p>{comment.body}</p>
                <p>Votes: {comment.votes}</p>
                <p>
                  Date:{" "}
                  {`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}
                </p>
              </li>
            );
          })}
        </ul>
        <PostComment setComments={setComments} />
      </div>
    </>
  );
};

export default Comments;
