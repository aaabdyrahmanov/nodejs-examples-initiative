const { dependencies } = require("../package.json");

module.exports = function fetchDependencies () {
    const dependencyList = [];
    // parse and turn the dependency list on usable data
    Object.entries(dependencies).forEach(([key, value], index) => {
      const item = {};
      item.index = index + 1;
      item.name = key;
      item.version = value;
      dependencyList.push(item);
    });
    Promise.all(dependencyList);
    console.info("Imported dependency list successfully");
  
    return dependencyList
  }
