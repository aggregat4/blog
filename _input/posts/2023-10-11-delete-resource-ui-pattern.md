---
layout: post.njk
title: A Useful Inline Delete Confirmation UX Pattern
date: 2023-10-11
---

For my [personal bookmark service](https://github.com/aggregat4/delicious-bookmarks) I had to implement the ability to delete bookmarks. I wanted this operation to be easily accessible directly in the list of bookmarks:

![Screnshot of an example bookmark with a delete button.](/images/screenshot-delicious.png)

When you click on `Delete...` the button is replaced with two more buttons: `Cancel` and `Delete!`:

![Screenshot of an example bookmark with the delete button pressed and the inline confirmation visible.](/images/screenshot-delicious-delete.png)

The mouse cursor -- which has not moved -- is positioned over the cancel operation so accidental clicks are innocuous. Clicking on "Delete!" button then really deletes the bookmark.
