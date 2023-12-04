---
layout: post.njk
title: Automatically Formatting Comments With Prettier is Really Nice
date: 2022-02-16
---

Many IDEs and editors still do not attempt to format multi-line comments. Possibly due to fear of messing up hand-crafted formatting or because it is just really hard to do right.

I've always found this frustrating in my own projects, specifically in the mostly TypeScript codebase of [Dendriform](https://github.com/aggregat4/dendriform) that I have been working on lately.

After actually googling for this I found the [prettier-plugin-jsdoc](https://github.com/hosseinmd/prettier-plugin-jsdoc) plugin. I configured it to use an 80 column width for JSDoc comments in `prettierrc.js`.

This plugin can automatically format jsdoc comments and it specifically supports wrapping multi-line comments. It conserves existing newlines. It seems good enough and the benefit of having automated formatting clearly outweighs any hand crafting I had to do before.

Recommended.

My `prettierrc.js` looks like this:

```javascript
module.exports = {
  jsdocPrintWidth: 80,
  "plugins": ["prettier-plugin-jsdoc"],
}
```
_Note: other settings have been omitted for brevity._

To enable autoformatting in Visual Studio Code I set the following in my user `settings.json`:

```json
{
  "[typescript]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
}
```
_Note: other settings have been omitted for brevity._
