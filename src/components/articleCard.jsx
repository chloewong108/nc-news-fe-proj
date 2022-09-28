import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, incrementVotes, reduceVotes } from "../api";

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
    return <p>404 NOT FOUND</p>;
  }
  if (isLoading) return <p>Loading...</p>;
  return (
    <div id="article-card">
      <h1 id="article-card-title">{currArticle.title}</h1>
      <p>Author: {currArticle.author}</p>
      <p>Date: {currArticle.created_at}</p>
      <p id="body">{currArticle.body}</p>
      <p>Votes: {currArticle.votes + votes}</p>

      <button
        disabled={votes ? true : false}
        onClick={(e) => {
          incrementVotes(article_id).catch(() => {
            setVotes((currVotes) => {
              return currVotes - 1;
            });
          });
          setVotes((currVotes) => {
            return currVotes + 1;
          });
        }}
      >
        👍
      </button>
      <button
        disabled={votes ? true : false}
        onClick={(e) => {
          reduceVotes(article_id).catch(() => {
            setVotes((currVotes) => {
              return currVotes + 1;
            });
          });
          setVotes((currVotes) => {
            return currVotes - 1;
          });
        }}
      >
        👎
      </button>
    </div>
  );
};

export default ArticlePage;
