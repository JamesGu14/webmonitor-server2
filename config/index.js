const Confidence = require('confidence')
const Pkg = require('../package.json')

/**
 * Criteria is passed to the document and can be used to select the correct
 * value from the options. See: https://github.com/hapijs/confidence#filters
 * @type {Object}
 */
const criteria = {
  env: process.env.NODE_ENV
}

const config = {
  $meta: 'This document contains application level configuration.',
  projectName: Pkg.name,
  version: Pkg.version,
  secret: {
    $filter: 'env',
    $default: 'webmonitor2',
    dev: 'webmonitor2',
    stage: 'webmonitor2',
    prod: '2S#s9!1x'
  },
  database: {
    $filter: 'env',
    $default: {
      mongo: {
        url: 'mongodb://localhost/webmonitor'
      }
    },
    dev: {
      mongo: {
        url: 'mongodb://localhost/webmonitor'
      }
    }
  }
}

const store = new Confidence.Store(config)

/**
 * External method for fetching an item from the document. Combines
 * the request with our criteria document.
 * @param  {string} key Item being requested
 */
exports.get = function(key) {

  return store.get(key, criteria)
}

/**
 * Retrieves meta information where document contains. Combines the request
 * with our predefined criteria.
 * @param  {string} key Item being requested
 */
exports.meta = function(key) {

  return store.meta(key, criteria)
}

