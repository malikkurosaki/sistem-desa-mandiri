const root = process.cwd();
const yargs = require('yargs');
const readdirp = require('readdirp');
const path = require('path');
const _ = require('lodash');
const prettier = require('prettier');
const fs = require('fs')
    ; (() => {

        yargs
            .command(
                'api-division',
                'generate division api',
                (yargs) => yargs,
                generateDivisionApi
            )
            .demandCommand(1)
            .recommendCommands()
            .help()
            .argv
    })()


async function generateDivisionApi(argv) {
    const dir = path.join(root, 'src', 'module', 'division', 'api')
    const results = [];
    const listImport = []
    for await (const entry of readdirp(dir, { fileFilter: ['*.ts', '!api_division.ts', '!api_index.ts'], })) {
        const fileName = path.basename(entry.path, '.ts');
        const method = entry.path.split('/')[0].toUpperCase();
        const importPath = entry.path.replace('.ts', '')

        const text = `
        {
            "path": "${_.kebabCase(fileName)}",
            "method": "${method}",
            "bin": ${fileName}
        }
        `
        results.push(text);
        listImport.push(`import {${fileName}} from "./${importPath}"`)
    }

    const text = `
    ${listImport.join('\n')}
    export const API_INDEX = [${results.join(',')}]
    `
    const formatted = await prettier.format(text, { parser: 'typescript' })
    fs.writeFileSync(path.join(dir, 'api_index.ts'), formatted)
    console.log("success")
}

