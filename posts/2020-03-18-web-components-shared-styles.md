---
layout: post.njk
title: Shared Styles for Web Components Are Unsolved
date: 2020-03-18
---

It seems like common shared styles for web components are not completely solved yet. There is a cavalcade of sort of maybe options with [a good overview on Smashing Magazine](https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/).

The two "best" options at the moment seem to be the inclusion of a `<link>` element before the inline styles for the web component that points to a shared stylesheet or to actually inline all the shared styles together with the specific styles.

I have currently opted for the latter by having one function return all the common styles and calling it from each component, but I will try the former solution as well.
