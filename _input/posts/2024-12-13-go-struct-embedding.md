---
layout: post.njk
title: Go Struct Embedding
date: 2024-12-13
description: For programmers coming from an object-oriented language like Java the concept of struct embedding might be a surprise.
---

Today I learned that Go has something called struct embedding. I come from a mostly Java background and an AI code assistant suggested a struct that had a field in it that had no type. It looked a bit like this:

```go
type Base struct {
    Name string
}

type Derived struct {
    Base
    Age int
}
```

In this example, the `Derived` struct inherits the `Name` property from the `Base` struct.

I had assumed that this notation was just a shorthand for a field of type `Base` with the name `Base`. But it's not.

This construct is called struct embedding. It causes the `Derived` struct to have all the fields of the `Base` struct.

Even though this was a concept introduced by an AI code assistant I must admit that it was the same assistant that helped me debug the issue.