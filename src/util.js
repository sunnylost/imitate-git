let fs = require('fs')
let path = require('path')

exports.createObject = function createObject(path) {
    console.log(__dirname)
    try {
        fs.mkdirSync(path)
    } catch (e) {
        console.log(e)
    }
}

/**
 * TODO: check head
 * @param cwd
 * @returns {string|null|(string | null | undefined)}
 */
exports.getWorkingDir = function getWorkingDir(cwd) {
    if (!cwd) {
        cwd = process.cwd()
    }

    try {
        let gitHeadPath = path.resolve(cwd, './.git/HEAD')

        fs.statSync(gitHeadPath)
        return path.resolve(gitHeadPath, '../')
    } catch (e) {
        if (cwd === '/') {
            return null
        } else {
            return getWorkingDir(path.resolve(cwd, '../'))
        }
    }
}
