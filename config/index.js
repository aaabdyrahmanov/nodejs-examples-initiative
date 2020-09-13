// import environment variables
require("dotenv").config();

const { NODE_ENV } = process.env;
const { HOST } = process.env;
const { PORT } = process.env;
const { NODE_VERSIONS_API } = process.env;

module.exports = {
  NODE_ENV,
  HOST,
  PORT,
  NODE_VERSIONS_API,
};
