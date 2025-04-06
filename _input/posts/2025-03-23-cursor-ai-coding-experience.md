---
layout: post.njk
title: Experiences With AI-Assisted Coding
date: 2025-03-23
description: Some of my experiences writing code with the help of the Cursor AI code assistant.
---

I've been using Cursor's AI code assistant for a while now and here are my experiences with it: things that worked well, things that definitely didn't and some assorted observations.

## The Good

The AI assistant excels at being a flexible scaffolding generator. In a quick ad hoc project we had started with a vite build setup, but I asked it to convert it to a simpler esbuild config. It suggested equivalent esbuild settings, updated import paths, and restructured the build pipeline - tasks that would be tedious to do manually and impossible with traditional project templates that only work at project creation.

This makes it much more versatile than typical scaffolding tools as it can help restructure and reconfigure your project as your needs evolve and keep doing it even when you have long since left the pristine state of the greenfield project.

It's particularly good at refactoring or making changes in files where you need to replace text in a somewhat regular pattern, but not so regular that a regular expression would suffice. 

I asked it to convert hardcoded colors in a CSS file to custom properties and it not only found all hardcoded colors but often proposed surprisingly decent names (`--color-primary-accent` instead of just `--color-1`). Tweaking these names afterwards is a much more pleasant task than manually finding and extracting all the relevant occurrences.

## The Bad

There are some significant downsides to be aware of:

The AI will sometimes hallucinate new APIs or API versions when you ask it to do something that would require them but they don't exist. This can be frustrating to debug because the AI is very good at suggesting plausible API calls that seem like they should work.

It can get stuck in loops, trying to fix something in one of a few ways it seems to come up with, and keeps iterating on failures with the same nonsensical approaches. While Cursor's limit of 25 iterations per session helps, it's a rather brute-force solution. It would be better if it could bail out sooner and ask for help.

Perhaps most importantly, you cannot depend on the AI to do sensible things. Even if a solution works, there's no guarantee there won't be massive follow-up issues. 

Common problems include:
- Completely unmaintainable code: I often had it (re)writing custom SQL statements in integration tests when the program already had a repository abstraction covering all those cases.
- Inperformant code: it resorted to resending a complete document every time the user typed a single character in a text editor project that used `y.js` to sync - it works, but it's a horrible solution.
- Code with serious security issues: while the AI sometimes proactivel warns and codes against  potential security issues (like validating form input), this is basically luck of the draw - it will just as often come up with an incomplete, and insecure, solution.

## Observations

The AI, like a human developer, benefits greatly from supporting structure and conventions:

- Clear guidance on what tools and features to use (or not use) - this could be achieved with custom Cursor rules. For example `Use pnpm instead of npm for package management` or `Use CSS nesting when writing styles`.
- Having linting integrated into your IDE as a sanity check that Cursor can try to solve automatically
- Having tests to verify that implementations are sensible, even if you let the AI write those tests
- Having types helps the AI use and extend existing APIs with fewer errors

One subtle trap is code bloat. The AI rarely refactors proactively. You have to constantly ask yourself: 'Could this be simpler? Is it rewriting a utility I already have?' Otherwise, you end up with duplicated logic and diverging features - technical debt generated at machine speed.

Don't just ask it to do something; tell it how. Having an architecture it can follow and conform to, but also telling it concretely how to solve something. For example, in an editor, it's helpful to make the AI implement formatting features as commands, not just because they're then potentially undoable, but because it forces a command structure that helps maintain a sane code structure.

The AI excels at regular, structured problems that either have precedence in your codebase or are obviously present in training data. Anything outside of that can be problematic and requires human intervention. It handled adding a standard password reset flow to my Go backend competently, following the existing patterns. But ask it to parse an Exchange ICAL feed to show today's appointments? Complete meltdown. Microsoft's baroque timezone handling and recurring event logic proved too much; it simply couldn't navigate that specific, peculiar system.

## The Fear

So, where does this leave me? There's no denying the tangible benefits. For churning through boilerplate, refactoring patterned code, or getting a test suite off the ground quickly in a personal project, Cursor AI is a genuine accelerant. It lets me focus on the more interesting parts faster. Yet, alongside this efficiency brews a persistent concern. With every problem I delegate, every solution I accept without the actual struggle, I worry: are my own fundamental coding skills slowly eroding? Is the convenience making me faster today at the cost of becoming a less capable, less resourceful developer tomorrow? I fear the answer may actually be "yes".
