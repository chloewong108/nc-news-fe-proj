import { useEffect, useState } from "react";
import { getAllArticles } from "../api";
import { Link, useParams, useSearchParams } from "react-router-dom";

const Home = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("DESC");
  const { topic_name } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const currentParams = Object.fromEntries([...searchParams]);
    if (!topic_name) {
      getAllArticles(currentParams.sort_by, currentParams.order).then(
        ({ articles }) => {
          setAllArticles(articles);
          setIsLoading(false);
        }
      );
    } else {
      getAllArticles(topic_name).then((topic) => {
        setAllArticles(topic.articles);
      });
    }
    setSearchParams({
      sort_by: currentParams.sort_by,
      order: currentParams.order,
    });
  }, [topic_name, searchParams]);

  if (isLoading)
    return (
      <p>
        <span role="img" aria-hidden={true}>
          🐢
        </span>{" "}
        Loading...
        <span role="img" aria-hidden={true}>
          🐢
        </span>
      </p>
    );
  return (
    <div>
      <section>
        <span>Sort Bar:</span>
        <br />
        <button
          onClick={() => {
            setSearchParams({ sort_by: "created_at", order: order });
            setSortBy("created_at");
          }}
        >
          Date
        </button>
        <button
          onClick={() => {
            setSearchParams({ sort_by: "comment_count", order: order });
            setSortBy("comment_count");
          }}
        >
          Comment Count
        </button>
        <button
          onClick={() => {
            setSearchParams({ sort_by: "votes", order: order });
            setSortBy("votes");
          }}
          value="votes"
        >
          Votes
        </button>
        <button
          onClick={() => {
            if (order === "DESC") {
              setSearchParams({ sort_by: sortBy, order: "ASC" });
              setOrder("ASC");
            } else if (order === "ASC") {
              setSearchParams({ sort_by: sortBy, order: "DESC" });
              setOrder("DESC");
            }
          }}
        >
          Ascending / Descending
        </button>
      </section>

      <section>
        {allArticles.map((article) => {
          return (
            <li key={article.article_id} id="articles">
              <Link to={`/articles/${article.article_id}`}>
                {" "}
                <h4>{article.title}</h4>{" "}
              </Link>
              <p>Topic: {article.topic}</p>
              <p>Author: {article.author}</p>
              <p>votes: {article.votes}</p>
              <p>Comments: {article.comment_count}</p>
            </li>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
