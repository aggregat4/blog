---
layout: post.njk
title: Capturing Go Run Output in Bash Environment Variables
date: 2024-09-04
description: go run outputs to stdout and stderr. How to capture this output in bash environment variables?
---

When creating test scripts for Go applications, it is often necessary to capture the output of `go run` in bash environment variables. This is particularly useful when the output contains information that needs to be used in subsequent commands or when the output is a success or error message that needs to be checked.

Doing a simple

```bash
FOO=$(go run main.go)
```

Did not work for me, the output got written to the terminal instead of being captured in the environment variable.

The program itself did the following:

```go
package main

func main() {
	println("Hello, World!")
}
```

This `println` builtin writes to `stderr`, which is why the output was not captured in the environment variable.

So instead we need to do the following:

```bash
FOO=$(go run main.go 2>&1)
```

The `2>&1` redirects the `stderr` to `stdout`.
