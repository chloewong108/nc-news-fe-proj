import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchVotes } from "../api";
import Comments from "./comments";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    getArticleById(article_id)
      .then((article) => {
        setIsLoading(true);
        setCurrArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsValid(false);
      });
  }, [article_id]);

  if (!isValid) {
    return <p>❌ 404: NOT FOUND ❌</p>;
  }
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

  const handleClick = (num) => {
    setVotes((currVotes) => (currVotes += num));
    patchVotes(article_id, num)
      .then(() => {
        <p>Voted!</p>;
      })
      .catch((err) => {
        setVotes((currVotes) => (currVotes -= num));
      });
  };

  const hideComments = () => {
    const comments = document.getElementById("hide-comments");
    if (comments.hidden) {
      comments.style.display = "none";
      comments.hidden = false;
    } else {
      comments.style.display = "block";
      comments.hidden = true;
    }
  };

  return (
    <div id="article-card">
      <h1 id="article-card-title">{currArticle.title}</h1>
      <p>Author: {currArticle.author}</p>
      <p>Date: {currArticle.created_at}</p>
      <p id="body">{currArticle.body}</p>
      <p>Votes: {currArticle.votes + votes}</p>

      <button disabled={votes ? true : false} onClick={() => handleClick(1)}>
        <span role="img" aria-label="thumbs-up">
          {" "}
          👍
        </span>
      </button>
      <button disabled={votes ? true : false} onClick={() => handleClick(-1)}>
        <span role="img" aria-label="thumbs-down">
          👎
        </span>
      </button>
      {votes ? <p>Thanks for voting!</p> : null}
      <br />
      <button onClick={hideComments}>View comments</button>
      <section hidden id="hide-comments">
        <Comments />
      </section>
    </div>
  );
};

export default ArticlePage;
