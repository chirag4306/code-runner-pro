export interface Language {
  id: string;
  name: string;
  judge0Id: number;
  monacoLang: string;
  defaultCode: string;
}

export const LANGUAGES: Language[] = [
  {
    id: "python",
    name: "Python",
    judge0Id: 71,
    monacoLang: "python",
    defaultCode: `# Python 3\nprint("Hello, World!")`,
  },
  {
    id: "javascript",
    name: "JavaScript",
    judge0Id: 63,
    monacoLang: "javascript",
    defaultCode: `// JavaScript (Node.js)\nconsole.log("Hello, World!");`,
  },
  {
    id: "bash",
    name: "Bash",
    judge0Id: 46,
    monacoLang: "shell",
    defaultCode: `#!/bin/bash\necho "Hello, World!"`,
  },
  {
    id: "java",
    name: "Java",
    judge0Id: 62,
    monacoLang: "java",
    defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  },
  {
    id: "cpp",
    name: "C++",
    judge0Id: 54,
    monacoLang: "cpp",
    defaultCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  },
];
