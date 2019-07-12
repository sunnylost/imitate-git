let { getObject } = require('../util')

module.exports = {
    name: 'cat-file',
    action: (git, args) => {
        getObject(git, args[0])
    }
}
