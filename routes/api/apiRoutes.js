// Required controllers 
const router = require("express").Router();
const boxController = require("../../controllers/boxControllers");
const donutController = require("../../controllers/donutControllers");
const userController = require("../../controllers/userControllers");

router.route("/api/donuts")
  .get(donutController.findAll)
  
// Route for selecting either an existing box or create a new box
router.route("/api/box")
  .get(boxController.findAll)
  .post(boxController.create)
  .put(boxController.update)
  .delete(boxController.remove)

// Route for selected box to view orders inside, add order
router.route("/api/box/:id")  
  .get(boxController.findById)
  .put(boxController.update)

module.exports = router;




