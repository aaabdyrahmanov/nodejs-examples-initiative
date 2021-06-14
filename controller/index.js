const fetchDependencies = require("../helpers/fetchDependencies");
const fetchVersions = require("../helpers/fetchVersions");

function getDependencyList(req, res) {
  try {
    const fetchedDependencies = fetchDependencies();

    return res.status(200).render("home", { packages: fetchedDependencies });
  } catch (error) {
    res.status(400).send({
      code: 400,
      error,
    });
    throw new Error(error);
  }
}

async function handleVersionSecurity(req, res) {
  try {
    const secureVersions = await fetchVersions("secure");

    return res.status(200).send(secureVersions);
  } catch (error) {
    res.status(400).send({
      code: 400,
      error,
    });
    throw new Error(error);
  }
}

async function handleLatestReleases(req, res) {
  try {
    const secureVersions = await fetchVersions();

    return res.status(200).send(secureVersions);
  } catch (error) {
    res.status(400).send({
      code: 400,
      error,
    });
    throw new Error(error);
  }
}
module.exports = {
  getDependencyList,
  handleVersionSecurity,
  handleLatestReleases,
};
