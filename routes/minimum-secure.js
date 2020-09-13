const router = require("express").Router();
const { handleVersionSecurity: securityHandler } = require("../controller");

/**
 * GET /minimum-secure
 */

router.get("/", securityHandler);

module.exports = router;
