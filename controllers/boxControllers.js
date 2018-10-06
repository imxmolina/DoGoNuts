const db = require("../models");
var cheerio = require("cheerio");

module.exports = {
  findAll: function (req, res) {
    db.Box
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Box
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Box
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Box
      .findOneAndUpdate({ _id: req.params.id }, { $push: { donutcount: req.body._id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    console.log("Box ID "+req.params.id);
    console.log("Donut ID "+req.body.donut);
    db.Box
      .findById(req.params.id).then(
        (mybox) => {
          console.log("DonutArray:  ",mybox);
          var removeIndex = mybox.donutcount.indexOf(req.body.donut)
          console.log("Index   :  ",removeIndex);
          var newdonut = mybox.donutcount.slice(0, removeIndex).concat(mybox.donutcount.slice(removeIndex + 1));
          console.log("newArray    ",newdonut);
          db.Box.updateOne({ _id: req.params.id }, { donutcount: newdonut })
            .then(
              dbModel => {
                console.log(dbModel);
                return res.json(dbModel);
              }
            ).catch(
              err => res.status(422).json(err)
            );
        }
      )
  }
};