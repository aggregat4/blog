---
layout: post.njk
title: Debugging and Documenting Sysadmin Tasks With AI
date: 2025-08-16
description: A useful workflow for debugging sysadmin related issues and then documenting them using AI.
---

Chatbot-style AI systems like ChatGPT or Anthropic Claude's web UIs are very helpful for debugging and documenting computer hardware and software issues. I use this approach both at home and at work to debug Linux-related issues on my machines and network.

My general approach is to identify a problem or new feature I want to implement in my tools or environment and then document it in a "sysadmin log". This helps me remember what I did, serves as a list of things to do on new systems and it can be a good source for blog material.

Instead of doing many separate web searches I will often start a new chat in ChatGPT, describe my symptoms and ask it what it thinks. It will have many ideas on what to do and what's wrong and will often lead you to a solution.

Next to to writing shell scripts this is an another clearly positive use-case for AI tools.

The following things make this process even better:

- Start a new chat for your debugging journey.
- Describe your system specs: what distribution you use and what shell you are using. It will then tailor its answers to your environment and you no longer have to translate `apt something` to `pacman something`.
- Answer the AI with what has worked and what has not worked. You need to write what hasn't worked anyway but even documenting the positives really pays off.

At the end you can ask the AI to summarize the chat with a prompt like:

> Summarize this whole configuration into a logbook entry that is concise but contains all the relevant information including a problem description, the things I concretely did and what worked. This entry is for my sysadmin logbook.

This will generate a nicely structured log entry that you can paste into your logbook after some light editing.

Saves a bunch of time.
