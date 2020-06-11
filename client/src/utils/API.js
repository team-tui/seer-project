import axios from "axios";

export default {
  // Gets all articles
  getArticles: function () {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function (id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function (articleData) {
    return axios.post("/api/articles", articleData);
  },

  // Deletes all articles
  deleteAllArticles: function (id) {
    return axios.delete("/api/articles/");
  },

  findByTitle(title) {
    return axios
      .create({ headers: { "Content-type": "application/json" } })
      .get(`/api/articles?title=${title}`);
  },

  findByTitle2: function (title, dateFrom, dateTo) {
    return axios.get("/api/articles", {
      params: {
        title: title,
        /* author: author, */ dateFrom: dateFrom,
        dateTo: dateTo,
      },
    });
  },

  create(data) {
    return axios.post("/api/articles", data);
  },
};
