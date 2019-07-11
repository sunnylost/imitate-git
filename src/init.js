let util = require('./util')

let git = {
    commands: {},
    cwd: process.cwd(),
    rootPath: util.getWorkingDir(),
    register(mod) {
        this.commands[mod.name] = mod.action
    }
}

let commands = ['hashObject', 'init']

commands.forEach(v => {
    let mod = require('./commands/' + v)
    git.register(mod)
})

module.exports = git
