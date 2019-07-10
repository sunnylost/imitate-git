let git = {
    commands: {},
    register(mod) {
        this.commands[mod.name] = mod.action
    }
}

let commands = ['hashObject']

commands.forEach(v => {
    let mod = require('./commands/' + v)
    git.register(mod)
})
/*
process.stdin.on('readable', () => {
    const chunk = process.stdin.read()

    if (chunk !== null) {
        git.stdin = chunk
    }
})*/

module.exports = git
