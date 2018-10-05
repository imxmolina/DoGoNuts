// Required controllers 
const router = require("express").Router();
const boxController = require("../../controllers/boxControllers");
const donutController = require("../../controllers/donutControllers");
const userController = require("../../controllers/userControllers");
var passport = require('passport');
require('../../config/passport')(passport);

router.get("/", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    router.route("/api/donuts").get(donutController.findAll)
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});


// Route for selecting either an existing box or create a new box
router.route("/api/box", passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    get(boxController.findAll)
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

module.exports = router;







