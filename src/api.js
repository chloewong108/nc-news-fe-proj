import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://bc-news-example.herokuapp.com/api",
});

export const getAllArticles = (sort_by = "created_at", order = "DESC") => {
  return axios
    .get("https://bc-news-example.herokuapp.com/api/articles", {
      params: { sort_by, order },
    })
    .then((res) => {
      return res.data;
    });
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
export const getAllComments = (article_id) => {
  return axios
    .get(
      `https://bc-news-example.herokuapp.com/api/articles/${article_id}/comments`
    )
    .then((res) => {
      return res.data.comments;
    });
};

export const postComment = (article_id, author, body) => {
  console.log({ article_id, author, body });
  return axios
    .post(
      `https://bc-news-example.herokuapp.com/api/articles/${article_id}/comments`,
      { username: author, body: body }
    )
    .then((res) => {
      console.log(res);
      return res.data.comment;
    });
};

export const getAllUsers = () => {
  return fetch(`https://bc-news-example.herokuapp.com/api/users`).then(
    (res) => {
      return res.json();
    }
  );
};

export const deleteComment = (comment_id) => {
  return axios.delete(
    `https://bc-news-example.herokuapp.com/api/comments/${comment_id}`
  );
};
