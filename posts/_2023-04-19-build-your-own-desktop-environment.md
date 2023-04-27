---
layout: post.njk
title: Build Your Own Desktop Environment
date: 2023-04-19
---

Many Linux users gravitate towards one of the big desktop environments like Gnome and KDE that cover all the bases: they offer window management, a clipboard, a launcher, window switching, etc.

After using Gnome for a long time I switched to XFCE a few years ago: it felt more lightweight, was very customizable and performed very well. I'm still a big fan.

However, XFCE does not support Wayland yet. With a recent upgrade to a new AMD graphics card I was technically able to try Wayland if I was prepared to migrate to a different desktop environment. Both KDE and Gnome would have been a solid option, but I wanted something else.

If you frequent the [unixporn subreddit](https://www.reddit.com/r/unixporn/) (trust me, it's safe) you will have seen some very attractive Linux desktops. Interestingly, they use a wide variety of different window managers, compositors, bars, launchers, terminals and many other tools.

Given this background and a new desire and the tehnical capability to switch to Wayland, I decided to take a stab at building my own desktop environment: I would identify the best and/or prettiest tool for the each job and put together my very own system. An artisanal desktop if you will.

I started by drafting all of the needs that XFCE was filling for me and that I would somehow need to replace:

- Global keyboard shortcuts
- Multi-Monitor support
- Workspaces
- A list of active windows that allows for quick switching between them
- Allow me to switch between windows with ALT-TAB
- Support the network manager applet, or have some alternative to it that also allows me to toggle vpns on and off
- Screenshot tool support, optimally Flameshot or something like it
- A sound widget that allows toggling betwen various outputs and manage volume in an easy way. Should interact with pipewire/pulseaudio
- A customizable clock (calendar weeks, custom date and time pattern) and calendar widget
- Some sort of wallpaper management
- Allow me to set custom fonts for all on screen elements (big fan of the [Inter](https://rsms.me/inter/) font family for UIs)
- Desktop notifications
- Allow dragging and resizing windows using mouse+modifier keys and clicking _anywhere_ inside the window (this is a killer capability that you can never do without again once you have tried it)
- Some sensible way to copy past things betwen windows

This list turned out to be bigger than expected.

Before getting to all those individual things we need to answer one fundamental question: what _style_ of window management do I want? Stacking, tiling or dynamic?

Stacking window managers allow windows to cover each other and be freely positioned on the screen. This is the approach that Windows, mac OS, Gnome and KDE provide. They often have additional utilities to also easily arrange windows in grids on top of the basic stacking functionality.

Tiling window managers allow windows to be arranged in a grid, with many different approaches possible (and available) but with no windows overlapping any other window. Most tiling window managers allow individual windows to be converted to floating windows when an application is not compatible with the tiling paradigm. Classic examples are [i3](https://i3wm.org/), [ratpoison](https://ratpoison.nongnu.org/), and [xmonad](https://xmonad.org/) (Haskell as a configuration language!).

Dynamic window managers usually combine stacking and tiling capabilities in one program and can change layouts dynamically based on some kind of rules. Typical examples are [awesome](https://awesomewm.org/) and [dwm](https://dwm.suckless.org/).

I have tried most of these options in the past and even though I have learned that I am a stacking window manager afficionado, I do appreciate the neatness and automation that is possible with tiling window managers. The list of stacking window managers that is also Wayland compatible is not too large. [Hikari](https://hikari.acmelabs.space/) looked really interesting and I may still give it a go in the future but after a brief stint in [Wayfire](https://github.com/WayfireWM/wayfire) I settled on [Labwc](https://labwc.github.io/).

In the next post I'll go over the steps needed to add a new window manager configuration to an existing Arch Linux setup and we'll have a look at Labwc in more detail.