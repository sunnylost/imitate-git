let fs = require('fs')
let fse = require('fs-extra')
let path = require('path')
let dirs = ['hooks', 'info', 'objects', 'refs']
let files = ['config', 'description', 'HEAD']

module.exports = {
    name: 'init',
    action(git) {
        let hasError = false
        let rootDir = path.resolve(git.cwd, '.git')

        try {
            fse.ensureDirSync(rootDir)

            for (let i = 0; i < dirs.length; i++) {
                fse.ensureDirSync(path.resolve(rootDir, dirs[i]))
            }

            for (let i = 0; i < files.length; i++) {
                fse.outputFileSync(path.resolve(rootDir, files[i]), '')
            }
        } catch (e) {
            //TODO
            hasError = true
        }

        if (!hasError) {
            console.log('Initialized empty Git repository in ' + rootDir)
        }
    }
}
