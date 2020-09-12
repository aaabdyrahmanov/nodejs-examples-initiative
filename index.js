const server = require('./server')
const { HOST, PORT} = require('./config')


server.listen(PORT, HOST, (err) => {
  if(err) console.error(err)
  console.info(`REST API started on http://${HOST}:${PORT}`)
})