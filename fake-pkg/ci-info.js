const ciEnvironment = require('ci-info');

const { isCI: _isCI, name: _name } = ciEnvironment

const isZeitNow = !!process.env.NOW_BUILDER

const isCI = isZeitNow || _isCI
const name = isZeitNow ? 'ZEIT Now' : _name

exports.name = name
exports.isCI = isCI

module.exports = exports
