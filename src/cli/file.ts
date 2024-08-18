import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { findMimeForFile, findMimesForFile } from '../main.js'


export function fileCli(
    argv?: string[]
): void {
    const {file, all, help} = commandLineArgs(
        [
            { 
                name: 'file', 
                defaultOption: true
            },
            {
                name: 'help',
                alias: 'h',
                type: Boolean,
                defaultValue: false,
            },
            {
                name: 'all',
                alias: 'a',
                type: Boolean,
                defaultValue: false,
            }
        ], 
        {
            argv
        }
    ) as {
        file?: string,
        all: boolean,
        help: boolean,
    }

    if(help) {
        console.log(commandLineUsage([
            {
                header: 'mime file',
                content: 'Finds MIME in MIME database based on file path extension',        
            },
            {
                header: 'Synopsis',
                content: [
                    '$ mime file [{bold --file}] {underline file-path} [{bold --all}]',
                    '$ mime file --help',
                ]
            },
            {
                header: 'Options',
                optionList: [
                    {
                        name: 'file',
                        defaultOption: true,
                        description: 'File name or path, e.g. `index.html` or `src/index.js`',
                    },
                    {
                        name: 'help',
                        alias: 'h',
                        defaultValue: false,
                        type: Boolean,
                        description: 'Displays help for this command and exits',
                    },
                    {
                        name: 'all',
                        alias: 'a',
                        defaultValue: false,
                        type: Boolean,
                        description: 'Lists all MIMEs matching extension',
                    }
                ],
            },
        ]))
    }
    else if(file) {
        if(all) {
            console.log(findMimesForFile(file) ?? 'Not found!')
        }
        else {
            console.log(findMimeForFile(file) ?? 'Not found!')
        }
    }
    else {
        console.log('Something went wrong!')
    }
}