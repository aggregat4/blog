---
layout: post.njk
title: You Can Use Promises Inside lit-html Templates
date: 2020-02-26
---

It is possible to use Promises inside lit-html templates: there are a few constructs to deal with them, the most basic is [the `until` function](https://lit-html.polymer-project.org/guide/template-reference#until) that will replace a default placeholder content piece with the real content when it resolves. Nice.
