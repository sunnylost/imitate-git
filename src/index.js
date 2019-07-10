let git = require('./init')
let args = require('yargs').argv._
let commandName = args[0]

if (git.commands[commandName]) {
    console.log(git.commands[commandName](git, args.splice(1)))
}
