// Required controllers 
const router = require("express").Router();
const boxController = require("../../controllers/boxControllers");
const donutController = require("../../controllers/donutControllers");
const userController = require("../../controllers/userControllers");

// Route for selecting either an existing box or create a new box
router.route("/box")
  .get(boxController.findAll)
  .post(boxController.create)
  .put(boxController.update)
  .delete(boxController.remove)
  .get(userController.findById)

// Route for selected box to view orders inside, add order
router.route("/box/:id")  
  .get(boxController.findById)
  .put(boxController.update)
  .get(donutController.findAll)

router.route("/")
  .get(donutController.findAll)

module.exports = router;




