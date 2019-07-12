let glob = require('glob')
let util = require('./util')
let path = require('path')

let git = {
    commands: {},
    cwd: process.cwd(),
    rootPath: util.getWorkingDir(),
    register(mod) {
        this.commands[mod.name] = mod.action
    }
}

let commandsPath = path.resolve(__dirname, './commands/')
let files = glob.sync(commandsPath + '/*.js')

files.forEach(v => {
    let mod = require(v)
    git.register(mod)
})

module.exports = git
