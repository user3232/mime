import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import { firstMimeHeavingString, listMimesHeavingString } from '../main.js';
export function findTextCli(argv) {
    const { text, first, help } = commandLineArgs([
        {
            name: 'text',
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
    ], {
        argv
    });
    if (help) {
        console.log(commandLineUsage([
            {
                header: 'mime find-text',
                content: 'Finds MIME in MIME database based on file path extension',
            },
            {
                header: 'Synopsis',
                content: [
                    '$ mime find-ext [{bold --text}] {underline MIME-text-fragment} [{bold --first}]',
                    '$ mime find-ext --help',
                ]
            },
            {
                header: 'Options',
                optionList: [
                    {
                        name: 'text',
                        defaultOption: true,
                        description: 'Fragment of MIME text, e.g. for MIME `text/plain` fragment may be `plain`.',
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
                        description: 'Lists first matching MIMEs',
                    }
                ],
            },
        ]));
    }
    else if (text) {
        if (first) {
            console.log(firstMimeHeavingString(text) ?? 'Not found!');
        }
        else {
            console.log(listMimesHeavingString(text) ?? 'Not found!');
        }
    }
    else {
        console.log('Something went wrong!');
    }
}
//# sourceMappingURL=find-text.js.map