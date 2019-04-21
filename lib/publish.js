const fs = require('fs');
const { exec } = require('child_process');
const { dirEmpty, dirCopy, transformES5 } = require('./utils');

module.exports = async function (path) {
    let ok = true;

    const tmpDir = `${__dirname}/../tmp`;
    const sourceDir = path || process.cwd();
    const npmPublishDir = `${sourceDir}/.npm_publish`;

    await dirEmpty(npmPublishDir);
    await dirEmpty(tmpDir);
    await dirCopy(sourceDir, tmpDir, ['node_modules', '.git', '.npm_publish']);

    function doBabel (path) {
        const sourceDir = path;
        const itemList = fs.readdirSync(sourceDir);

        itemList.forEach(item => {
            ok = false;

            const entryPath = `${sourceDir}/${item}`;
            const outPath = entryPath;
            const isDirectory = fs.statSync(entryPath).isDirectory();
    
            if (isDirectory && !(['node_modules', '.npm_publish'].includes(item))) {
                doBabel(entryPath);
                return;
            }
    
            if (/\.js$/.test(item)) {
                const fileContent = fs.readFileSync(entryPath);
                const { code } = transformES5(fileContent);
        
                fs.writeFileSync(outPath, code);
                ok = true;
            }
        })

        if (ok) {
            dirCopy(tmpDir + '/', npmPublishDir, ['node_modules', '.git', '.npm_publish']);

            exec(`cd ${npmPublishDir} && npm publish`, (err, stdout, stderr) => {
                if (err) {
                    console.log(stderr);
                } else {
                    console.log(stdout, ' 🍌 published.');
                }
            });
        }
    }

    doBabel(tmpDir);
}