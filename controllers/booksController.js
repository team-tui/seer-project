const Book = require('../models/Books');

module.exports = {
    findAll: function (req, res) {
        const title = req.query.title;
        const author = req.query.author;
        const dateFrom = req.query.dateFrom;
        const dateTo = req.query.dateTo;
        var condition = title ? {
            title: { $regex: new RegExp(title), $options: "i" },
            author: { $regex: new RegExp(author), $options: "i" },
            $and: [{ date: { $lte: dateTo } }, { date: { $gte: dateFrom } }]
        }
            : {};
        //Book.find(title ? {title: title+"/i"} : {}) //Couldn't get to work
        Book.find(condition)//.find({author: author})
            //Book.find(req.query) //Original
            .then(books => res.json(books))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        Book.findById(req.params.id)
            .then(book => res.json(book))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        Book.create(req.body)
            .then(newBook => res.json(newBook))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        Book.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(book => res.json(book))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        Book.findById({ _id: req.params.id })
            .then(book => book.remove())
            .then(allbooks => res.json(allbooks))
            .catch(err => res.status(422).json(err));
    },
    /* userDefinedSearch: function (req, res) {
        const type = req.query.nameOfField;
        const value = req.query.value;
        const dateFrom = req.query.dateFrom;
        const dateTo = req.query.dateTo;
        var condition = title ? {
            nameOfField: { $regex: new RegExp(nameOfField), $options: "i" },
            value: { $regex: new RegExp(author), $options: "i" },
            $and: [{ date: { $lte: dateTo } }, { date: { $gte: dateFrom } }]
        }
            : {};
    } */
};