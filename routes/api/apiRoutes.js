// REQUIRED CONTROLLERS
const router = require("express").Router();
const boxController = require("../../controllers/boxControllers");
const donutController = require("../../controllers/donutControllers");

// PASSPORT
var passport = require('passport');
require('../../config/passport')(passport);

// GETS TOKEN FOR AUTHORIZATION
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// GETS ALL DONUTS
router.get("/api/donuts", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    donutController.findAll
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});


// BOX C.R.U.D.
router.route("/api/box", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  console.log(token);
  if (token) {
    axios.get(boxController.findAll)
      .post(boxController.create)
      .put(boxController.update)
      .delete(boxController.remove)
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});


// Route for selected box to view orders inside, add order
router.route("/api/box/:id")
  .get(boxController.findById)
  .put(boxController.update)



module.exports = router;







