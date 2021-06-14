const semver = require("semver");
const bent = require("bent");
const getJSON = bent("json");

const { NODE_VERSIONS_API } = require("../config");

module.exports = async function fetchVersions (type) {
    let fetchedVersions = await getJSON(NODE_VERSIONS_API),
      versionList = [],
      data = [];
    
    // filter versions by their security
    if(type == "secure") {
      fetchedVersions = fetchedVersions.filter((version) => version.security)
    }

    fetchedVersions.forEach((element) => {
      const item = {};
      item.major = semver.major(element.version);
      item.version = semver.clean(element.version);
      versionList.push(item);
    });
    await Promise.all(versionList);
    console.info("Fetched list of necessary versions successfully!");

    // sort version list in ascending order
    versionList.sort((a, b) => a.major - b.major);
    
    const filteredList = versionList.reduce((list, current) => {
      const x = list.find((item) => item.major === current.major);
      if (!x) {
        return list.concat([current]);
      }
      return list;
    }, []);

    filteredList.forEach((e) => {
      fetchedVersions.map((v) => {
        return e.version === semver.clean(v.version) ? data.push(v) : null;
      });
    });

    return data;
  }
  

