import { useEffect, useState } from "react";
import { deleteComment, getAllComments } from "../api";
import { useParams } from "react-router-dom";
import PostComment from "./postComment";
import { useContext } from "react";
import { UserContext } from "../context/user";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllComments(article_id).then((res) => {
      setIsLoading(false);
      setComments(res);
    });
  }, [article_id]);

  const removeComment = (comment_id) => {
    deleteComment(comment_id, currentUser.username).then(() => {
      setComments((currentComments) => {
        const filteredComments = [...currentComments];
        return filteredComments.filter((comment) => {
          return comment.comment_id !== comment_id;
        });
      });
    });
  };

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
                <button
                  id="deleteButton"
                  hidden={
                    currentUser.username !== comment.author ? true : false
                  }
                  onClick={() => {
                    removeComment(comment.comment_id);
                  }}
                >
                  Delete
                </button>
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
