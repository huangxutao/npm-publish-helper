const { exec } = require('child_process');
const fs = require('fs');
const ora = require('ora');
const babel = require('@babel/core');
const babelEnv = require('@babel/preset-env');
const babelRuntime = require('@babel/plugin-transform-runtime');
const bableProposalDecorators = require('@babel/plugin-proposal-decorators');
const bableProposalClassProperties = require('@babel/plugin-proposal-class-properties');

/**
 * 目录创建
 * @param {String} path
 * @param {String} dirName
 */
exports.dirCreate = function (path, dirName) {
    return new Promise((resolve, reject) => {
        const spinner = ora('Create...').start();
        const child = exec(`cd ${path} && mkdir ${dirName}`);

        child.on('close', (code) => {
            spinner.stop();
            resolve('success');
        });
    });
}

/**
 * 目录删除
 * @param {Array} dir 
 */
exports.dirRemove = function (dir) {
    dir = typeof dir === 'string' ? dir : dir.join(' ');
    
    return new Promise((resolve, reject) => {
        const spinner = ora('remove...').start();
        const child = exec(`rm -R ${dir}`);

        child.on('close', (code) => {
            spinner.stop();
            resolve('success');
        });
    });
}

/**
 * 目录删除
 * @param {Array} dir
 */
exports.dirEmpty= function (dir) {
    function deleteDir (sourceDir) {
        const itemList = fs.readdirSync(sourceDir);

        itemList.forEach(item => {
            const entryPath = `${sourceDir}/${item}`;
            const isDirectory = fs.statSync(entryPath).isDirectory();

            if (isDirectory) {
                deleteDir(entryPath);
                return;
            }

            fs.unlinkSync(entryPath);
        });
    }

    if (fs.existsSync(dir)) {
        deleteDir(dir);
    } else {
        fs.mkdirSync(dir);
    }
}

/**
 * 目录拷贝
 * @param {String} dir 
 * @param {String} targetDir 
 * @param {Array} excludeDir
 */
exports.dirCopy = function (dir, targetDir, excludeDir) {
    return new Promise((resolve, reject) => {
        const spinner = ora('Copy files...').start();
        const itemList = fs.readdirSync(dir);
        const copyCommands = [];

        itemList.forEach(item => {
            if (excludeDir.includes(item)) return;
            copyCommands.push(`cp -R ${dir}/${item} ${targetDir}/`)
        });

        let child = exec(copyCommands.join(' && '));

        child.on('close', (code) => {
            spinner.stop();
            resolve('success');
        });

    });
}

/**
 * transform JSX to standard of es5
 * @param {String|Buffer} code 
 */
exports.transformES5 = function (code) {
    return babel.transform(code, {
        babelrc: false,
        comments: false,
        presets: [babelEnv],
        plugins: [
            [bableProposalDecorators, { legacy: true }],
            [bableProposalClassProperties, { loose: true }],
            babelRuntime
        ]
    });
}

/**
 * babel 转译
 * @param {String} entryDir 
 * @param {String} outDir 
 */
exports.doBabel = function (entryDir, outDir) {
    
}

