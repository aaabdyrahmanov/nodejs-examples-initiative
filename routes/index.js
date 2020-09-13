const dependencies = require('./dependencies')

module.exports = (app) => {
  app.use('/dependencies', dependencies)
}
