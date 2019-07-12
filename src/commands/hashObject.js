let crypto = require('crypto')
let { createObject } = require('../util')

module.exports = {
    name: 'hash-object',
    action(git, args) {
        let content = args[0]
        let shasum = crypto.createHash('sha1')
        let fileContent = `blob ${content.length}\0` + content

        //TODO: blob, tree
        shasum.update(fileContent)
        let id = shasum.digest('hex')
        createObject(git, id, fileContent)

        return id
    }
}
