import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [currArticle, setCurrArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
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
      <p>{currArticle.author}</p>
      <p>{currArticle.created_at}</p>
      <p id="body">{currArticle.body}</p>
      <p>{currArticle.votes}</p>
    </div>
  );
};

export default ArticlePage;
