# NodeJS an overview

JavaScript runtime environment, based on google chromes v8 engine. which takes JavaScript out of the browser and converts into machine code for faster execution.

## Why Node.js?

- **Asynchronous & Non-blocking**: Handles many connections without waiting for one to finish.

- **Single-threaded event loop**: Uses one main thread, but delegates tasks (e.g., file read, DB calls) using internal APIs and callbacks/promises.

- **Fast & lightweight**: for I/O-heavy tasks like API servers or file processing.

## Concepts

| Concept                        | Description                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| **Event Loop**                 | Handles async tasks like timers, file I/O, network requests using callbacks or promises.   |
| **Non-blocking I/O**           | Node can do other work while waiting for slow tasks (e.g., reading a file) to finish.      |
| **Modules**                    | Node splits functionality into built-in modules (`http`, `fs`, `path`) and custom modules. |
| **npm (Node Package Manager)** | Used to install and manage third-party libraries (e.g., Express, Mongoose).                |
| **CommonJS (require/export)**  | Node’s module system (before ES modules became standard).                                  |

# Versioning

```json
{
  "name": "explore-express",
  "version": "1.0.0",
  "description": "exploring express js",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "charukirti",
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  }
}
```
current version of express
^5.1.0


third part (0) => Minor fixes
^ means compatible with