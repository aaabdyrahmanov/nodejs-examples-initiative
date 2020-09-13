const router = require('express').Router()
const { handleLatestReleases: latestReleases } = require('../controller')


/**
 * GET /latest-release 
 */

router.get('/', latestReleases)

module.exports = router
