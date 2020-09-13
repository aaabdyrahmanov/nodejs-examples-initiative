const router = require("express").Router();
const { dependencies } = require("../package.json");

/**
 * GET /dependencies
 */

router.get("/", async (req, res) => {
  const dependencyList = [];
  // parse and turn the dependency list on usable data
  Object.entries(dependencies).forEach(([key, value], index) => {
    const item = {};
    item.index = index + 1;
    item.name = key;
    item.version = value;
    dependencyList.push(item);
  });
  await Promise.all(dependencyList);
  console.info("Imported dependency list successfully");

  res.render("main", { packages: dependencyList });
});

module.exports = router;
