const anonymousMeta = require('./anonymous-meta')
const projectMeta = require('./project')

function main () {
  return {
    meta: projectMeta(),
    ...anonymousMeta(),
  }
}

console.log(main())

module.exports = main
