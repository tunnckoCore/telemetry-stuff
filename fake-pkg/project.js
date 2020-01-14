const path = require('path')
const childProcess = require('child_process')

function getProjectId() {
  try {
    const originBuffer = childProcess.execSync(
      `git config --local --get remote.origin.url`,
      {
        timeout: 1000,
        stdio: `pipe`,
      }
    )

    return String(originBuffer).trim()
  } catch (_) {
    return null
  }
}

function getProjectPackageMeta() {
  try {
    const packageJsonPath = path.resolve(__dirname, '..', 'package.json')
    console.log(packageJsonPath)
    const { name, version, repository, homepage } = require(packageJsonPath)
    return { name, version, repository, homepage, packageJsonPath }
  } catch (_) {
    return {}
  }
}

module.exports = () => {
  const manifest = getProjectPackageMeta()
  let projectId = getProjectId()

  if (!projectId) {
    projectId = typeof manifest.repository === 'string'
      ? manifest.repository
      : manifest.repository && manifest.repository.url
  }

  const parentDirname = path.basename(path.dirname(manifest.packageJsonPath))

  return { 
    ...manifest, 
    projectId: projectId || manifest.homepage || parentDirname 
  }
}
