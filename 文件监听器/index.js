const fs = require('fs')
const events = require('events')
const path = require('path')

// 拓展events类
class Watcher extends events {
    constructor(watchDir, processDir) {
        super()
        console.log(watchDir);
        this.watchDir = watchDir
        this.processDir = processDir
    }

    watch() {
        fs.readdir(this.watchDir, (err, files) => {
            if (err) throw err;
            for (let file in files) {
                this.emit('process', files[file])
                console.log(files[file]);
            }
        })
    }

    start() {
        fs.watchFile(this.watchDir, () => {
            this.watch()
        })
    }
}

const watchPath = path.resolve(__dirname, '../public/')
const processPath = __dirname

// 监听public目录下的文件迁移到当前文件夹
const watch = new Watcher(watchPath, processPath)

watch.on('process', (file) => {
    const watchName = `${watchPath}/${file}`
    const processDirName = `${ processPath}/${file}`
    fs.rename(watchName, processDirName, (err) => {
        if (err) throw err;
    })
})

watch.start()