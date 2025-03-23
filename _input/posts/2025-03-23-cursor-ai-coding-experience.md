---
layout: post.njk
title: Experiences With AI-Assisted Coding
date: 2025-03-23
description: Some of my experiences writing code with the help of the Cursor AI code assistant.
---

I've been using Cursor's AI code assistant for a while now, and I wanted to share my experiences with it. Here are my observations about what works well, what doesn't, and some important considerations when using AI-assisted coding.

## The Good

The AI assistant excels at being a flexible scaffolding generator. For example, when migrating from Vite to esbuild, you can ask it to help convert your build configuration and project structure at any point. It can analyze your existing Vite config, suggest equivalent esbuild settings, update import paths, and restructure your build pipeline - tasks that would be tedious to do manually and impossible with traditional project templates that only work at project creation. This makes it much more versatile than typical scaffolding tools, as it can help restructure and reconfigure your project as your needs evolve.

It's also particularly good at refactoring or making changes in files where you need to replace text in a somewhat regular pattern, but not so regular that a regular expression would suffice. For example, when converting hardcoded colors in CSS to custom properties it not only finds all hardcoded colors but it can also suggest meaningful variable names based on the context. Tweaking these names afterwards is a much easier task than manually finding and extracting the relevant places.

## The Bad

There are some significant downsides to be aware of:

The AI will sometimes hallucinate new APIs or API versions when you ask it to do something that would require them but they don't exist. This can be frustrating to debug because the AI is very good at suggesting plausible API calls that seem like they should work.

It can get stuck in loops, trying to fix something in one of a few ways it seems to come up with, and keeps iterating on failures with the same nonsensical approaches. While Cursor's limit of 25 iterations per session helps, it's a rather brute-force solution. It would be better if it could bail out sooner and ask for help.

Perhaps most importantly, you cannot depend on the AI to do sensible things. Even if a solution works, there's no guarantee there won't be massive follow-up issues. Common problems include:
- Completely unmaintainable code (like writing custom SQL statements in integration tests when you already have an abstraction for this)
- Unperformant code (like resending a complete document every time you type a single character using y.js to sync - it works, but it's horrible)
- Code with serious security issues (while the AI sometimes detects potential security issues, this is basically luck of the draw - there's no guarantee of exhaustive security checking)

## Observations

The AI, like a human developer, benefits greatly from supporting structure and conventions:

- Clear guidance on what tools and features to use (or not use) - this could be achieved with custom Cursor rules. For example `Use pnpm instead of npm for package management` or `Use CSS nesting when writing styles`.
- Having linting integrated into your IDE as a sanity check that Cursor can try to solve automatically
- Having tests to verify implementations are sensible, even if you let the AI write those tests
- Having types helps the AI use and extend existing APIs with fewer errors

The AI tends to write more and more code without much unprompted refactoring. You need to actively consider whether refactoring is needed. Common issues include:
- Rewriting utility methods instead of reusing them
- Duplicating large parts of similar features, leading to a diverging codebase over time

The AI benefits from architectural guidance - both having an architecture it can follow and conform to, but also telling it concretely how to solve something. For example, in an editor, it's helpful to make the AI implement formatting features as commands, not just because they're then potentially undoable, but because it forces a command structure that helps maintain a sane code structure.

The AI excels at regular, structured problems that either have precedence in your codebase or are obviously present in training data. Anything outside of that can be problematic and requires human intervention. For example, it could competently add a password reset flow to my existing Go server with login screen, but it failed completely at showing all today's appointments for an Exchange ICAL calendar (it didn't know how to deal with Microsoft's insane timezone handling or recurring appointments).

## Conclusions

For me, AI support is clearly helpful in handling more regular coding tasks and making faster progress in personal coding projects. It's way faster to edit code than to write it from scratch, even for "easy" code.

It's particularly useful for writing tests and extending an existing test suite.

The caveats I listed above all apply and as soon as the problem becomes less regular, more exotic or interacts with very specific or peculiar systems, the AI will start breaking down.

And finally, you must review and understand all code if you intend for this to be even marginally serious. Otherwise, you'll have security, correctness, performance, maintainability and other problems.
