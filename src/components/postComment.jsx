import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../api";
import { UserContext } from "../context/user";

const PostComment = () => {
  const [newBody, setNewBody] = useState("");
  const { article_id } = useParams();
  const { currentUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(article_id, currentUser.username, newBody).then(() => {});
  };

  const handleClick = () => {
    const button = document.getElementById("btn");
    button.textContent = "Comment posted!";
  };

  return (
    <div>
      <section>
        <form method="post" onSubmit={handleSubmit}>
          <h3>Add a comment:</h3>
          <input
            value={newBody}
            onChange={(event) => {
              setNewBody(event.target.value);
            }}
            type="text"
            id="commentbody"
            name="commentbody"
            minLengh="2"
            maxLength="5000"
            required
          />
          <br />
          <button id="btn" onClick={handleClick}>
            Post comment
          </button>
        </form>
      </section>
    </div>
  );
};

export default PostComment;
