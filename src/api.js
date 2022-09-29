import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://bc-news-example.herokuapp.com/api",
});

export const getAllArticles = () => {
  return fetch("https://bc-news-example.herokuapp.com/api/articles").then(
    (res) => {
      return res.json();
    }
  );
};
export const selectArticlesByTopics = (topic_name = "") => {
  return axios
    .get(`https://bc-news-example.herokuapp.com/api/articles`, {
      params: { topic: topic_name },
    })
    .then((res) => {
      return res.data;
    });
};

export const getAllTopics = () => {
  return fetch(`https://bc-news-example.herokuapp.com/api/topics`).then(
    (res) => {
      return res.json();
    }
  );
};
export const getArticleById = (article_id) => {
  return axios
    .get(`https://bc-news-example.herokuapp.com/api/articles/${article_id}`)
    .then((res) => {
      return res.data.article;
    });
};
export const patchVotes = (article_id, vote) => {
  return newsApi
    .patch(`/articles/${article_id}`, { inc_vote: vote })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
