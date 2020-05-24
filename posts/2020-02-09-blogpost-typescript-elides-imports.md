---
layout: post.njk
title: Typescript Can Surprisingly Elide Imports
date: 2020-02-09
---

In [dendriform](TODO) I had the problem that my custom elements were not being registered in the registry and I was getting runtime errors because of it.

The necessary `customElements.define()` calls were all present, so there was something else going on. Turns out that Typescript can elide imports if it determines that it is not being used by anything. This can happen when your custom element resides completely in its own module and you import it on the usage side but then only use it inside of your templates declaratively. Typescript has no way of identifiying this usage (since it will be inside of some template string or JSX) and it will silently drop the import because it is “unused”. This behaviour is [documented in the FAQ](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-imports-being-elided-in-my-emit).

Even if my file is not directly “used”, it does contain an import side effect: it registers the custom element in the registry. The workaround is to explicitly import the module file and only the module file. In this case Typescript will not elide it.

This is not optimal and I would be interested in any better approaches to this.