import { stat, Stats } from "fs"
import { spawn, ChildProcessWithoutNullStreams } from "child_process"
import { promisify } from "util"

const statAsync = promisify(stat)

const isURL = (src: string): boolean => /^(https?|ftp):\/\//i.test(src)

/**
 * Example Usage:
 *
 * const command = "python3"
 * const scriptPath = "/app/python-scripts/ngram_analysis.py"
 * const args: string[] = ["4", "/app/tmp/train_set.txt", "/path/to/test_set.txt"]
 * try {
 *   const result = await runCommand(command, scriptPath, args)
 *   console.log("Python script output:", result)
 * } catch (error) {
 *   console.error("Error running Python script:", error)
 * }
 */

export const runCommand = async (
  command: string,
  src: string,
  args: string | string[]
): Promise<string | boolean> => {
  let result = ""
  const isSrcURL = isURL(src)

  let stats: Stats | undefined
  if (src) {
    try {
      stats = await statAsync(src)
    } catch (err) {
      // If error occurs, stats remains undefined
    }
  }

  let argsArray: string[]
  if (typeof args === "string") {
    argsArray = args.split(" ")
  } else {
    argsArray = args
  }

  if (src && ((stats && stats.isFile()) || isSrcURL)) {
    argsArray.unshift(src)
  }

  return new Promise((resolve, reject) => {
    const childProcess: ChildProcessWithoutNullStreams = spawn(
      command,
      argsArray
    )

    if (src && typeof stats === "undefined" && !isSrcURL) {
      childProcess.stdin.end(src, "utf-8")
    }

    childProcess.stdout.on("data", (data: Buffer) => {
      result += data.toString()
    })

    childProcess.stdout.on("end", () => {
      resolve(result || true)
    })

    childProcess.stderr.on("data", (err: Buffer) => {
      reject(new Error(err.toString()))
    })
  })
}
