---
layout: post.njk
title: Reducing Dependencies With an Absolutely Minimal Testing Framework
date: 2020-02-09
---

Inspired by [Baretest](https://github.com/volument/baretest/blob/master/baretest.js) I wanted to move my testing setup from jest to something similarly minimal. Baretest is less than 100 lines of very understandable JavaScript code and a bunch of that is even concerned with color highlighting! 

We use jest at work and it works fine, but it is an enormous framework with many dependencies. In my personal project it was the last thing holding me back from removing babel as a dependency. Baretest's incredible simplicity motivated me to try to replace jest with something similar.

I transformed Baretest into TypeScript and added it to my project. Since I still need some form of assertions in my tests I decided to use [Ceylon](https://github.com/dylanparry/ceylon) (a TypeScript assertion library) as a more or less drop in replacement for the jest assertions.

Since we no longer have jest doing all kinds of magic we can't just have tests sprinkled over the workspace and automatically gathered and executed. Instead we now have a manual test suite that gathers the individual test files and runs them:

```javascript
// Set up a fake dom environment for tests since we are not in the browser (see https://github.com/rstacruz/jsdom-global)
import 'jsdom-global/register'

import { trun } from './tizzytest'

// All the tests
import './vectorclock.test'
import './domain-search.test'
import './keyboardshortcut.test'
import './logoot-sequence-wrapper.test'
import './markup.test'
import './util.test'

// Run tests async since the trun is async
;(async () => await trun('All Tests'))()
``` 

Tizzytest is my TypeScript conversion of Baretest. I run this file with `npx ts-node test/runtests.ts`.

Doing this conversion I stumbled on a few interesting issues.

`ts-node` spat out "navigator is undefined" as an error message. This was TypeScript complaining about code that was using browser APIs and in a nodejs environment those are not available. Presumably jest provides all this out of the box. Some googling made clear that the typical solution is to use `jsdom` as a headless dom implementation and more specifically `jsdom-global` has a register module that sets up a basic browser environment for exactly these cases.

This explains the top line in the `runtests.ts` file:

```javascript
import 'jsdom-global/register'
```

The second issue was ts-node having trouble loading pure JavaScript files and treating them as es6 modules. This is a known issue with node. You can work around it by renaming the file to `.mjs` which makes node see it as an ES6 module, but TypeScript doesn't currently support this file extension for loading dependencies.

My fix for this was to simply rename the file to  `.ts` and treat it as a TypeScript file. This is always an option since TypeScript is just a superset of JavaScript.

In this particular case I think running the tests with my own simple runner is absolutely worth it. This does not mean that using something like jest is a bad idea. At work we use it and it makes sense. As soon as you need more of the many features it provides and you have a team of people working with the technology that has support, issues and documentation then it may well be worth to depend on something that is a bit more heavy weight.

This is the same trade-off one has with all libraries and frameworks: when does it make sense for me to use it and when should I maybe try to do something myself? There is no one size fits all answer to this question. But it is always worth asking these questions and discussing them.