let fs = require('fs')
let fse = require('fs-extra')
let path = require('path')
let zlib = require('zlib')

exports.createObject = function createObject(git, id, content) {
    let objectsPath = path.resolve(git.rootPath, './objects')
    let dir = path.resolve(objectsPath, id.substring(0, 2))
    let fileName = id.substring(2)

    fse.ensureDirSync(dir)

    zlib.deflate(content, (err, buffer) => {
        if (!err) {
            fse.outputFileSync(path.resolve(dir, fileName), buffer)
        }
    })
}

exports.getObject = function(git, id) {
    let dir = id.substring(0, 2)
    let name = id.substring(2)
    let filePath = path.resolve(git.rootPath, 'objects', dir, name)

    zlib.unzip(fs.readFileSync(filePath), (err, buffer) => {
        if (!err) {
            let content = buffer.toString()
            let arr = content.split('\0')
            console.log(arr[1])
        }
    })
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
