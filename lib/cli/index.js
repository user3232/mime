// src/cli/info.ts
import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import { getMimeInfo } from "@user3232/mime/db.js";
function infoCli(argv) {
  const { mime, help } = commandLineArgs(
    [
      {
        name: "mime",
        defaultOption: true
      },
      {
        name: "help",
        alias: "h",
        type: Boolean,
        defaultValue: false
      }
    ],
    {
      argv
    }
  );
  if (help) {
    console.log(commandLineUsage([
      {
        header: "mime info",
        content: "Provides detailed information about MIME"
      },
      {
        header: "Synopsis",
        content: [
          "$ mime info [{bold --mime}] {underline mime-string}",
          "$ mime info --help"
        ]
      },
      {
        header: "Options",
        optionList: [
          {
            name: "mime",
            defaultOption: true,
            description: "MIME name e.g. text/plain"
          },
          {
            name: "help",
            alias: "h",
            defaultValue: false,
            type: Boolean,
            description: "Displays help for this command and exits"
          }
        ]
      }
    ]));
  } else if (mime) {
    console.log(getMimeInfo(mime) ?? "Not found!");
  } else {
    console.log("Something went wrong!");
  }
}

// src/cli/file.ts
import commandLineArgs2 from "command-line-args";
import commandLineUsage2 from "command-line-usage";
import { findMimeForFile, findMimesForFile } from "@user3232/mime/db.js";
function fileCli(argv) {
  const { file, all, help } = commandLineArgs2(
    [
      {
        name: "file",
        defaultOption: true
      },
      {
        name: "help",
        alias: "h",
        type: Boolean,
        defaultValue: false
      },
      {
        name: "all",
        alias: "a",
        type: Boolean,
        defaultValue: false
      }
    ],
    {
      argv
    }
  );
  if (help) {
    console.log(commandLineUsage2([
      {
        header: "mime file",
        content: "Finds MIME in MIME database based on file path extension"
      },
      {
        header: "Synopsis",
        content: [
          "$ mime file [{bold --file}] {underline file-path} [{bold --all}]",
          "$ mime file --help"
        ]
      },
      {
        header: "Options",
        optionList: [
          {
            name: "file",
            defaultOption: true,
            description: "File name or path, e.g. `index.html` or `src/index.js`"
          },
          {
            name: "help",
            alias: "h",
            defaultValue: false,
            type: Boolean,
            description: "Displays help for this command and exits"
          },
          {
            name: "all",
            alias: "a",
            defaultValue: false,
            type: Boolean,
            description: "Lists all MIMEs matching extension"
          }
        ]
      }
    ]));
  } else if (file) {
    if (all) {
      console.log(findMimesForFile(file) ?? "Not found!");
    } else {
      console.log(findMimeForFile(file) ?? "Not found!");
    }
  } else {
    console.log("Something went wrong!");
  }
}

// src/cli/find-ext.ts
import commandLineArgs3 from "command-line-args";
import commandLineUsage3 from "command-line-usage";
import { getMimeHeavingExtension, listMimesByExtension } from "@user3232/mime/db.js";
function findExtCli(argv) {
  const { ext, first, help } = commandLineArgs3(
    [
      {
        name: "ext",
        defaultOption: true
      },
      {
        name: "help",
        alias: "h",
        type: Boolean,
        defaultValue: false
      },
      {
        name: "first",
        alias: "f",
        type: Boolean,
        defaultValue: false
      }
    ],
    {
      argv
    }
  );
  if (help) {
    console.log(commandLineUsage3([
      {
        header: "mime find-ext",
        content: "Finds MIME in MIME database based on file path extension"
      },
      {
        header: "Synopsis",
        content: [
          "$ mime find-ext [{bold --ext}] {underline file-extension} [{bold --first}]",
          "$ mime find-ext --help"
        ]
      },
      {
        header: "Options",
        optionList: [
          {
            name: "ext",
            defaultOption: true,
            description: "File extension, e.g. html."
          },
          {
            name: "help",
            alias: "h",
            defaultValue: false,
            type: Boolean,
            description: "Displays help for this command and exits"
          },
          {
            name: "first",
            alias: "f",
            defaultValue: false,
            type: Boolean,
            description: "Lists first MIME matching extension"
          }
        ]
      }
    ]));
  } else if (ext) {
    if (first) {
      console.log(getMimeHeavingExtension(ext) ?? "Not found!");
    } else {
      console.log(listMimesByExtension(ext) ?? "Not found!");
    }
  } else {
    console.log("Something went wrong!");
  }
}

// src/cli/find-text.ts
import commandLineArgs4 from "command-line-args";
import commandLineUsage4 from "command-line-usage";
import { firstMimeHeavingString, listMimesHeavingString } from "@user3232/mime/db.js";
function findTextCli(argv) {
  const { text, first, help } = commandLineArgs4(
    [
      {
        name: "text",
        defaultOption: true
      },
      {
        name: "help",
        alias: "h",
        type: Boolean,
        defaultValue: false
      },
      {
        name: "first",
        alias: "f",
        type: Boolean,
        defaultValue: false
      }
    ],
    {
      argv
    }
  );
  if (help) {
    console.log(commandLineUsage4([
      {
        header: "mime find-text",
        content: "Finds MIME in MIME database based on file path extension"
      },
      {
        header: "Synopsis",
        content: [
          "$ mime find-ext [{bold --text}] {underline MIME-text-fragment} [{bold --first}]",
          "$ mime find-ext --help"
        ]
      },
      {
        header: "Options",
        optionList: [
          {
            name: "text",
            defaultOption: true,
            description: "Fragment of MIME text, e.g. for MIME `text/plain` fragment may be `plain`."
          },
          {
            name: "help",
            alias: "h",
            defaultValue: false,
            type: Boolean,
            description: "Displays help for this command and exits"
          },
          {
            name: "first",
            alias: "f",
            defaultValue: false,
            type: Boolean,
            description: "Lists first matching MIMEs"
          }
        ]
      }
    ]));
  } else if (text) {
    if (first) {
      console.log(firstMimeHeavingString(text) ?? "Not found!");
    } else {
      console.log(listMimesHeavingString(text) ?? "Not found!");
    }
  } else {
    console.log("Something went wrong!");
  }
}

// src/cli/mime.ts
import commandLineArgs5 from "command-line-args";
import commandLineUsage5 from "command-line-usage";
function mimeCli(argv) {
  const { _unknown, command, help } = commandLineArgs5(
    [
      {
        name: "command",
        defaultOption: true
      },
      {
        name: "help",
        alias: "h",
        type: Boolean,
        defaultValue: false
      }
    ],
    {
      stopAtFirstUnknown: true,
      argv
    }
  );
  if (!command && help) {
    console.log(commandLineUsage5([
      {
        header: "MIME database",
        content: "Provides operations for working with MIME database"
      },
      {
        header: "Synopsis",
        content: [
          "$ mime {bold --help}",
          "$ mime {bold <command>} {bold <command-args>}",
          "$ mime {bold <command>} {bold --help}"
        ]
      },
      {
        header: "Options",
        optionList: [
          {
            name: "help",
            alias: "h",
            defaultValue: false,
            type: Boolean,
            description: "Displays help and exit, for command help use $ mime <command> --help"
          }
        ]
      },
      {
        header: "Commands",
        content: [
          {
            command: "info",
            summary: "Info about provided MIME."
          },
          {
            command: "file",
            summary: "MIME associated with file path."
          },
          {
            command: "find-ext",
            summary: "Searches MIME DB for MIMEs heaving extension."
          },
          {
            command: "find-text",
            summary: "Searches MIME DB for MIMEs heaving text."
          }
        ]
      }
    ]));
  } else if (command) {
    const argv2 = _unknown ?? [];
    if (help) {
      argv2.push("--help");
    }
    if (command === "info") {
      infoCli(argv2);
    } else if (command === "file") {
      fileCli(argv2);
    } else if (command === "find-ext") {
      findExtCli(argv2);
    } else if (command === "find-text") {
      findTextCli(argv2);
    } else {
      console.log("Bad command!");
    }
  } else {
    console.log("Something went wrong!");
  }
}
export {
  fileCli,
  findExtCli,
  findTextCli,
  infoCli,
  mimeCli
};
