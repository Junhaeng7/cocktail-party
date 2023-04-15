
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./chonky-icon-fontawesome.cjs.production.min.js')
} else {
  module.exports = require('./chonky-icon-fontawesome.cjs.development.js')
}
