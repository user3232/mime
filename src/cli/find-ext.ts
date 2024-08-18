import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { getMimeHeavingExtension, listMimesByExtension } from '../main.js'


export function findExtCli(
    argv?: string[]
): void {
    const {ext, first, help} = commandLineArgs(
        [
            { 
                name: 'ext', 
                defaultOption: true
            },
            {
                name: 'help',
                alias: 'h',
                type: Boolean,
                defaultValue: false,
            },
            {
                name: 'first',
                alias: 'f',
                type: Boolean,
                defaultValue: false,
            }
        ], 
        {
            argv
        }
    ) as {
        ext?: string,
        first: boolean,
        help: boolean,
    }

    if(help) {
        console.log(commandLineUsage([
            {
                header: 'mime find-ext',
                content: 'Finds MIME in MIME database based on file path extension',        
            },
            {
                header: 'Synopsis',
                content: [
                    '$ mime find-ext [{bold --ext}] {underline file-extension} [{bold --first}]',
                    '$ mime find-ext --help',
                ]
            },
            {
                header: 'Options',
                optionList: [
                    {
                        name: 'ext',
                        defaultOption: true,
                        description: 'File extension, e.g. html.',
                    },
                    {
                        name: 'help',
                        alias: 'h',
                        defaultValue: false,
                        type: Boolean,
                        description: 'Displays help for this command and exits',
                    },
                    {
                        name: 'first',
                        alias: 'f',
                        defaultValue: false,
                        type: Boolean,
                        description: 'Lists first MIME matching extension',
                    }
                ],
            },
        ]))
    }
    else if(ext) {
        if(first) {
            console.log(getMimeHeavingExtension(ext) ?? 'Not found!')
        }
        else {
            console.log(listMimesByExtension(ext) ?? 'Not found!')
        }
    }
    else {
        console.log('Something went wrong!')
    }
}