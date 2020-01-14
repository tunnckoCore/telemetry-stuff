const isDockerFunction = require('is-docker');
const isWslBoolean = require('is-wsl');
const os = require('os');

const ciEnvironment = require('./ci-info');

// type AnonymousMeta = {
//   systemPlatform: NodeJS.Platform
//   systemRelease: string
//   systemArchitecture: string
//   cpuCount: number
//   cpuModel: string | null
//   cpuSpeed: number | null
//   memoryInMb: number
//   isDocker: boolean
//   isNowDev: boolean
//   isWsl: boolean
//   isCI: boolean
//   ciName: string | null
// }

let traits = null;

module.exports = function getAnonymousMeta() {
  if (traits) {
    return traits
  }

  const cpus = os.cpus() || []
  const { NOW_REGION } = process.env

  traits = {
    system: {
      // Software information
      platform: os.platform(),
      release: os.release(),
      arch: os.arch(),
      // Machine information
      cpuCount: cpus.length,
      cpuModel: cpus.length ? cpus[0].model.replace(/\s+/g, ' ') : null,
      cpuSpeed: cpus.length ? cpus[0].speed : null,
      memory: Math.trunc(os.totalmem() / Math.pow(1024, 2)),
    },
    // Environment information
    env: {
      isDocker: isDockerFunction(),
      isNowDev: NOW_REGION === 'dev1',
      isWsl: isWslBoolean,
      isCI: ciEnvironment.isCI,
      ciName: (ciEnvironment.isCI && ciEnvironment.name) || null,
    }
  }

  return traits
}
