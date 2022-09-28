import { useEffect, useState } from "react";
import { getAllTopics, selectArticlesByTopics } from "../api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ArticleList from "./articleList";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const { topic_name } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getAllTopics().then((topics) => {
      setTopics(topics.topics);
    });

    selectArticlesByTopics(topic_name).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic_name]);
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <section>
        <h2 id="topic-title">Topics</h2>
        <nav>
          {topics.map((topic) => {
            return (
              <li id="categories" key={topic.slug}>
                <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
              </li>
            );
          })}
        </nav>
      </section>
      <section>
        <ArticleList allArticles={articles} />
      </section>
    </>
  );
};
export default Topics;
