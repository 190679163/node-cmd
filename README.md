# Node CMD

`node-cmd` is a utility module for Node.js designed to simplify the process of running system commands or scripts. Whether you're executing a Python script, a shell command, or any other executable, `node-cmd` provides an easy-to-use API to handle command execution asynchronously.

## Features

- Supports running commands with both local file paths and URLs as arguments.
- Handles asynchronous operations seamlessly.
- Manages input and output streams efficiently.
- Provides error handling for command execution.

## Installation

```bash
npm install node-cmd
```

## Usage

### Importing the Module

```javascript
import { runCommand } from 'node-cmd';
```

### Example Usage

Here’s an example of how to use `node-cmd` to run a Python script:

```javascript
const command = "python3";
const scriptPath = "/app/python-scripts/ngram_analysis.py";
const args = ["4", "/app/tmp/train_set.txt", "/path/to/test_set.txt"];

try {
  const result = await runCommand(command, scriptPath, args);
  console.log("Python script output:", result);
} catch (error) {
  console.error("Error running Python script:", error);
}
```

### API

#### `runCommand(command: string, src: string, args: string | string[]): Promise<string | boolean>`

- **command**: The command to execute (e.g., `python3`, `node`, `bash`).
- **src**: The source file path or URL.
- **args**: Arguments to pass to the command. Can be a string or an array of strings.

**Returns**: A Promise that resolves to the command output (as a string) or `true` if there is no output. The Promise rejects with an error if the command execution fails.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

### Contact

For any issues or questions, please open an issue on GitHub.
