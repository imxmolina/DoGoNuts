const router = require("express").Router();
const donutRoutes = require("./apiRoutes.js");

// Donut routes
router.use("/", donutRoutes);

module.exports = router;
