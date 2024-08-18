import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import { infoCli } from './info.js';
import { fileCli } from './file.js';
import { findExtCli } from './find-ext.js';
import { findTextCli } from './find-text.js';
export function mimeCli(argv) {
    const { _unknown, command, help } = commandLineArgs([
        {
            name: 'command',
            defaultOption: true
        },
        {
            name: 'help',
            alias: 'h',
            type: Boolean,
            defaultValue: false,
        }
    ], {
        stopAtFirstUnknown: true,
        argv,
    });
    if (!command && help) {
        console.log(commandLineUsage([
            {
                header: 'MIME database',
                content: 'Provides operations for working with MIME database',
            },
            {
                header: 'Synopsis',
                content: [
                    '$ mime {bold --help}',
                    '$ mime {bold <command>} {bold <command-args>}',
                    '$ mime {bold <command>} {bold --help}',
                ]
            },
            {
                header: 'Options',
                optionList: [
                    {
                        name: 'help',
                        alias: 'h',
                        defaultValue: false,
                        type: Boolean,
                        description: 'Displays help and exit, for command help use $ mime <command> --help',
                    }
                ],
            },
            {
                header: 'Commands',
                content: [
                    {
                        command: 'info',
                        summary: 'Info about provided MIME.'
                    },
                    {
                        command: 'file',
                        summary: 'MIME associated with file path.'
                    },
                    {
                        command: 'find-ext',
                        summary: 'Searches MIME DB for MIMEs heaving extension.'
                    },
                    {
                        command: 'find-text',
                        summary: 'Searches MIME DB for MIMEs heaving text.'
                    },
                ]
            },
        ]));
    }
    else if (command) {
        const argv = _unknown ?? [];
        if (help) {
            argv.push('--help');
        }
        if (command === 'info') {
            infoCli(argv);
        }
        else if (command === 'file') {
            fileCli(argv);
        }
        else if (command === 'find-ext') {
            findExtCli(argv);
        }
        else if (command === 'find-text') {
            findTextCli(argv);
        }
        else {
            console.log('Bad command!');
        }
    }
    else {
        console.log('Something went wrong!');
    }
}
//# sourceMappingURL=mime.js.map