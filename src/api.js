import axios from "axios";

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
      console.log(res.data);
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
