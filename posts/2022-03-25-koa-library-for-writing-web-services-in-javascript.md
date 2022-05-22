---
layout: post.njk
title: Koa Implements a Nice Pattern For Writing Web Services
date: 2022-03-20
---

For [Dendriform](https://github.com/aggregat4/dendriform) I needed a small library or framework to implement a JavaScript (or TypeScript) test server that I could use for running integration tests against. I needed basic HTTP protocol support, the ability to serve static content, define custom routes based on URL, HTTP method and Accept-Header.

The goto for backend JavaScript has long been [Express](https://expressjs.com/) and it is presumably still a good choice. I noticed some complaints of Express not having out of the box async support. Looking around further it was surprisingly hard to identify a viable and popular candidate that was lightweight enough for my purposes.

After looking at a handful of possibilities I decided to give [Koa](https://koajs.com/) a shot. It is apparently made (or started) by the creator(s) of Express and claims to be a more modern alternative with some of the learnings of working on Express baked in.

Koa builds on the standard node.js HTTP server and offers a small middleware based API. The project is structured as one core library and then many different projects that contribute additional functionality that can be composed using its middleware API.

The imports for my tiny test server look like this:

```javascript
import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-body'
import logger from 'koa-logger'
import mount from 'koa-mount'
import serve from 'koa-static'
```

This is the core Koa import and then additional modules for the functionality I need:
* [Koa Router](https://github.com/koajs/router): adds an API for routing requests to functions based on HTTP method, URL, etc.
* [Koa Body](https://github.com/koajs/koa-body): extends the Koa API with various useful utilities for parsing request bodies in various formats.
* [Koa Logger](https://github.com/koajs/logger): allows you to easily log all requests, responses and status codes to make debugging easier.
* [Koa Mount](https://github.com/koajs/mount): allows mounting _other_ middleware on a certain path inside your application.
* [Koa Static](https://github.com/koajs/static): allows serving static files directly from disk.

Koa Mount is a nice example of the composability of the middleware pattern: I use it to expose the static files provided by Koa Static on a certain URL inside of my own application. Neither of these components need to know about each other.

All in all it was a very pleasant experience to implement a simple web service with Koa and I can recommend it for this use case. You can have a look at the full service implementation here: [tiny-dendriform-server.ts](https://github.com/aggregat4/dendriform/blob/a378143c18a23d215a5734f1952b8f6aa8bb66e3/test/e2e/tiny-dendriform-server.ts).

It feels like the middleware pattern is quasi-optimal for the use case of exposing web services and having the ability to add a bunch of cross-cutting concerns (logging, authentication, authorization, etc) on top of your actual service logic.

I discovered some non critical downsides to Koa during my very limited usage of the library.

It's unclear to me how alive this project is: there are occasional releases being made, but the main development effort was some years ago and there is disturbingly little traffic on the issues or code bases of some of the components. This may also just be a case of me no knowing where the actual community takes place, or perhaps the library is just really mature and works for most people.

Documentation exists but seems thin and somewhat spotty. I had to resort to reading a bunch of the example code and tests in their repository. And it was sometimes hard to figure out the exact recommended way to solve a particular problem. On the up side: there _are_ tests and example code.

Recommended.
