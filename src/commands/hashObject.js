let crypto = require('crypto')

module.exports = {
    name: 'hash-object',
    action(git, args) {
        let content = args[0]
        let shasum = crypto.createHash('sha1')

        //TODO: blob, tree
        shasum.update(`blob ${content.length}\0` + content)
        return shasum.digest('hex')
    }
}
