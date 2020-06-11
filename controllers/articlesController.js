const article = require("../models/Articles");

module.exports = {
  findAll: function (req, res) {
    const title = req.query.title;
    //const author =  req.query.author;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    var condition = title
      ? {
          title: { $regex: new RegExp(title), $options: "i" },
          /* author: {$regex: new RegExp(author), $options: "i"}, */
          $and: [{ date: { $lte: dateTo } }, { date: { $gte: dateFrom } }],
        }
      : {};
    //article.find(title ? {title: title+"/i"} : {}) //Couldn't get to work
    article
      .find(condition)
      //article.find(req.query) //Original
      .then((articles) => res.json(articles))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    article
      .findById(req.params.id)
      .then((article) => res.json(article))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    article
      .create(req.body)
      .then((newarticle) => res.json(newarticle))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((article) => res.json(article))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    article
      .findById({ _id: req.params.id })
      .then((article) => article.remove())
      .then((allarticles) => res.json(allarticles))
      .catch((err) => res.status(422).json(err));
  },
};
