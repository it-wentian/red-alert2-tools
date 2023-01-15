const fs = require('fs')
let files = fs.readdirSync('./地图')
let path = require('path')
let pathName = path.join(__dirname, '地图')
let treeReg = /\w+=TREE\w+/
let fileName = '各地图树木数量统计.txt'
let fileExists = fs.existsSync(fileName);
if (fileExists) {
    fs.writeFile(fileName, '', function () {
        console.log('done')
    })

}

files.forEach(el => {
    fs.readFile(path.join(pathName, el), 'utf-8', (err, data) => {
        if (err != null) {
            console.log(err);
            return;
        }
        data = data.split('\n')
        data = data.filter(v => {
            if (treeReg.test(v)) {
                return v
            }
        })
        let res = `${el}===>地图中的树木的数量是${data.length}颗`
        fs.appendFile(fileName, res + '\n', (err) => {
            if (err != null) {
                console.log(err);
                return
            }
            console.log('写入成功');

        })
    })
})