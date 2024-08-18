import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { getMimeInfo } from '../main.js'


export function infoCli(
    argv?: string[]
): void {
    const {mime, help} = commandLineArgs(
        [
            { 
                name: 'mime', 
                defaultOption: true 
            },
            {
                name: 'help',
                alias: 'h',
                type: Boolean,
                defaultValue: false,
            }
        ], 
        {
            argv: argv
        }
    ) as {
        mime?: string,
        help: boolean
    }

    if(help) {
        console.log(commandLineUsage([
            {
                header: 'mime info',
                content: 'Provides detailed information about MIME',        
            },
            {
                header: 'Synopsis',
                content: [
                    '$ mime info [{bold --mime}] {underline mime-string}',
                    '$ mime info --help',
                ]
            },
            {
                header: 'Options',
                optionList: [
                    {
                        name: 'mime',
                        defaultOption: true,
                        description: 'MIME name e.g. text/plain',
                    },
                    {
                        name: 'help',
                        alias: 'h',
                        defaultValue: false,
                        type: Boolean,
                        description: 'Displays help for this command and exits',
                    }
                ],
            },
        ]))
    }
    else if(mime) {
        console.log(getMimeInfo(mime) ?? 'Not found!')
    }
    else {
        console.log('Something went wrong!')
    }

}