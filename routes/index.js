const dependencies = require('./dependencies')
const minimumSecure = require('./minimum-secure')

module.exports = (app) => {
  app.use('/dependencies', dependencies)
  app.use('/minimum-secure', minimumSecure)
}
