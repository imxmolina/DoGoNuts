// REQUIRED CONTROLLERS
const router = require("express").Router();
var axios = require("axios");
const boxController = require("../../controllers/boxControllers");
const donutController = require("../../controllers/donutControllers");
const userController = require("../../controllers/userControllers");

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
function isUserAuth (req, res, next) {
  var token = getToken(req.headers);
  console.log(token)
  if (token) {
    next()
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}  

// DONUT GET
router.route("/api/donuts", passport.authenticate('jwt', { session: false }), isUserAuth)
  .get(donutController.findAll)

// BOXES GET AND POST
router.route("/api/box", passport.authenticate('jwt', { session: false }), isUserAuth)
  .get(boxController.findAll)
  .post(boxController.create)
  .put(boxController.update)
  // .delete(boxController.remove)

// SINGLE BOX GET, PUT, DELETE
router.route("/api/box/:id")
  .get(boxController.findById)
  .put(boxController.update)
  .get(donutController.findAll)
  .delete(boxController.remove)

router.get("/api/users", passport.authenticate('jwt', { session: false }), isUserAuth, (req, res) => {
  res.json({message: "Success."})
})
  
module.exports = router;







