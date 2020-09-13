const router = require("express").Router();
const { getDependencyList: getDependencies } = require("../controller");

/**
 * GET /dependencies
 */

router.get("/", getDependencies);

module.exports = router;
