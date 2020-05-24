---
layout: post.njk
title: You Can Reach the Child Elements of a Custom Element Even Inside Shadow DOM
date: 2020-02-28
---

You can reach the child elements inside a custom element using shadow DOM by getting the respective `slot` element and then calling `asssignedNodes()` on it.
