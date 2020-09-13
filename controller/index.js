const semver = require("semver");
const bent = require("bent");
const { NODEJS_VERSIONS_API } = require("../config");

const getJSON = bent("json");

async function handleVersionSecurity(req, res) {
  const versionList = [];
  try {
    const fetchedVersions = await getJSON(NODEJS_VERSIONS_API);
    fetchedVersions
      .filter((version) => version.security === true)
      .forEach((element) => {
        const item = {};
        item.major = semver.major(element.version);
        item.version = semver.clean(element.version);
        versionList.push(item);
      });
    await Promise.all(versionList);
    console.info("Filtered the only secure versions!");

    const sortedVersions = versionList.sort((a, b) => a.major - b.major);
    const filteredList = sortedVersions.reduce((list, current) => {
      const x = list.find((item) => item.major === current.major);
      if (!x) {
        return list.concat([current]);
      }
      return list;
    }, []);
    res.status(200).send(filteredList);
  } catch (error) {
    res.status(400).send({
      code: 400,
      error,
    });
    throw new Error(error);
  }
}

async function handleLatestReleases(req, res) {
  const versionList = [];
  try {
    const fetchedVersions = await getJSON(NODEJS_VERSIONS_API);
    fetchedVersions.forEach((element) => {
      const item = {};
      item.major = semver.major(element.version);
      item.version = semver.clean(element.version);
      versionList.push(item);
    });
    await Promise.all(versionList);
    console.info("Filtered the only secure versions!");

    const sortedVersions = versionList.sort((a, b) => a.major - b.major);

    const filteredList = sortedVersions.reduce((list, current) => {
      const x = list.find((item) => item.major === current.major);
      if (!x) {
        return list.concat([current]);
      }
      return list;
    }, []);
    res.status(200).send(filteredList);
  } catch (error) {
    res.status(400).send({
      code: 400,
      error,
    });
    throw new Error(error);
  }
}
module.exports = {
  handleVersionSecurity,
  handleLatestReleases,
};
