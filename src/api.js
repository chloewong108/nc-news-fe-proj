import axios from "axios";

export const getAllArticles = () => {
  return fetch("https://bc-news-example.herokuapp.com/api/articles").then(
    (res) => {
      return res.json();
    }
  );
};
