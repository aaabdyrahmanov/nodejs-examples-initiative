const dependencies = require('./dependencies')
const minimumSecure = require('./minimum-secure')
const latestReleases = require('./latest-releases')

module.exports = (app) => {
  app.use('/dependencies', dependencies)
  app.use('/minimum-secure', minimumSecure)
  app.use('/latest-releases', latestReleases)
}
