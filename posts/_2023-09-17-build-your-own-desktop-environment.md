---
layout: post.njk
title: Build Your Own Desktop Environment
date: 2023-09-17
---

Many Linux users gravitate towards one of the big desktop environments like Gnome and KDE that cover all the bases: they offer window management, a clipboard, a launcher, window switching and much more.

After using Gnome for a long time I switched to XFCE a few years ago: it felt more lightweight, was very customizable and performed very well. I'm still a big fan.

I bought a new AMD graphics card and wanted to try Wayland instead of X.org, but XFCE doesn't support it yet. Instead of switching back to Gnome, I made my own desktop environment. I got ideas from cool Linux desktops on the [unixporn subreddit](https://www.reddit.com/r/unixporn/) (it's SFW) and picked individual tools to make my own unique setup.

## What do I Need?

I started by compiling a list of all the functions that XFCE provided for me and that I would need to find replacements for:

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
- Allow dragging and resizing windows using mouse+modifier keys and clicking *anywhere* inside the window (this is a killer capability that you can never do without again once you have tried it)
- A sensible way to copy and paste things between windows.

This list turned out to be bigger than expected.

## Stacking, Tiling or Dynamic: Choose One?

Before getting to all those individual things we need to answer one fundamental question: what *style* of window management do I want? Stacking, tiling or dynamic?

Stacking window managers allow windows to cover each other and be freely positioned on the screen. This is the approach that Windows, mac OS, Gnome and KDE provide. They often have additional utilities to also easily arrange windows in simple grids.

Tiling window managers allow windows to be arranged in a grid, with many different approaches possible (and available) but with no windows overlapping any other window. Most tiling window managers allow individual windows to be converted to floating windows when an application is not compatible with the tiling paradigm. Classic examples are [i3](https://i3wm.org/), [ratpoison](https://ratpoison.nongnu.org/), and [xmonad](https://xmonad.org/) (Haskell as a configuration language!).

Dynamic window managers usually combine stacking and tiling capabilities in one program and can change layouts dynamically based on some kind of rules. Typical examples are [awesome](https://awesomewm.org/) and [dwm](https://dwm.suckless.org/).

I have tried most of these options and concluded that I am a stacking window manager person. I do appreciate the neatness and automation that is possible with tiling window managers. Some of the most well known WMs for Wayland are in fact tiling: [Sway](https://swaywm.org/) and [Hyprland](https://hyprland.org/).

The list of stacking window managers that is also Wayland compatible is not large. [Hikari](https://hikari.acmelabs.space/) looks interesting but maybe a bit rough. After a brief stint in [Wayfire](https://github.com/WayfireWM/wayfire) I settled on [Labwc](https://labwc.github.io/). It does not solve for fancy UI effects, but appears stable, active and offers a subset of features that seems to match what I need.

## Adding a New Custom Desktop Environment in Arch Linux

Your desktop environment is typically started right after your login to the system using your display manager (or login manager). In graphical display managers like gdm you can select one of several session *types* from a list. This is where we want to add a new entry for our labwc based desktop environment.

On Arch linux these sessions are stored in `/usr/share/xsessions` in separate `.desktop` files. A `/usr/share/xsessions/labwc.desktop` file could look like this:

```ini
[Desktop Entry]
Encoding=UTF-8
Name=labwc
Comment=labwc
Exec=labwc
Type=Application
```

When you relogin to your system and select this session type you will have a completely empty desktop and labwc will be running quietly in the background.

Congratulations! You have configured a new desktop environment.

The default setup does not get you a lot of functionality out of the box. You have window management (if you can manage to start things that have windows), virtual desktop management, keybind configurations and a few other affordances.

The labwc [Getting Started](https://labwc.github.io/getting-started.html) page is a good place to go next to figure out some helpful configuration options to get you set up with a system that is a *little* bit more useful.

## The Hunt for More Programs

We now need to figure out what programs and configurations we can use to restore all those capabilities that I listed in the beginning of the article. I'll take you through some of the options that I selected for my use case.

### Wallpaper

Important things first: how do I set my wallpaper? You can use a variety of programs but I settled on [swaybg](https://github.com/swaywm/swaybg) and added the following stanza to my `~/.config/labwc/autostart`:

```bash
swaybg -m fill -i somepicture.jpg  >/dev/null 2>&1 &
```

### Panel

By default labwc just shows an empty desktop and there are no UI elements to open menus, have a tasktray, show running programs, etc. Labwc delegates all that to external programs.

I chose [waybar](https://github.com/Alexays/Waybar) as my panel/bar implementation. It has a bunch of standard modules for functionality such as showing active windows or a tasktray, but it also allows for custom modules where you can customise what is displayed and what programs are run on what events. It can be a very powerful way to get some nice custom widgets for your particular setup.

Mine currently looks like this:

[![waybar screenshot](/images/waybar-screenshot-left.png)](/images/waybar-screenshot-left.png)
[![waybar screenshot](/images/waybar-screenshot-right.png)](/images/waybar-screenshot-right.png)

And this is configured through `~/.config/waybar/config`. Note that I use [wlogout](https://github.com/ArtsyMacaw/wlogout) to provide a reboot/shutdown/logout menu from waybar.

Here's my current configuration:

```json
{
    "layer": "top", // Waybar at top layer
    "position": "bottom", // Waybar position (top|bottom|left|right)
    "height": 34, // Waybar height (to be removed for auto height)
    "spacing": 12, // Gaps between modules (4px)
    "modules-left": [
      "wlr/taskbar" 
    ],
    "modules-right": [
      "custom/audio_idle_inhibitor",
      "memory",
      "custom/audio-switcher",
        "pulseaudio",
        "tray",
        "clock",
        "custom/logout"
    ],
    "wlr/taskbar": {
      "all-outputs": false,
        "format": "{icon} {title:.15}",
        "on-click": "minimize-raise",
    },
    "memory": {
      "interval": 30,
//    "format": "RAM: {used:0.1f}G/{total:0.1f}G"   
    "format": "RAM: {}%"    
    },
    "tray": {
        "icon-size": 21,
        "spacing": 10
    },
    "clock": {
        "timezone": "Europe/Berlin",
        "tooltip-format": "<big>{:%Y %B}</big>\n<tt><small>{calendar}</small></tt>",
        "format": "{:  KW%V   %d %b   %H:%M  }",
        "on-click": "orage"        
    },
    "pulseaudio": {
        "scroll-step": 2, // %, can be a float
        "format": "{volume}% {icon} {format_source}",
        "format-bluetooth": "{volume}% {icon} {format_source}",
        "format-bluetooth-muted": " {icon} {format_source}",
        "format-muted": "🔇 {format_source}",
        "format-source": "{volume}%  ",
        "format-source-muted": " ",
        "format-icons": {
            "headphone": "",
            "phone": "",
            "portable": "",
            "car": "",
            "default": ["", "", ""]
        },
        "on-click": "pavucontrol"
    },
    "custom/logout": {
      "format": "⏼   {}",
      "exec": "whoami",
      "on-click": "wlogout -m 400"
    },
    // Auto updating the text based on exec-on-event true does not work.
    // A workaround to use signals to notify waybar to update the module also does not work.
    // This pull request seems relevant: https://github.com/Alexays/Waybar/pull/1784
    // Polling like this with an interval of every 2 seconds is suboptimal
    "custom/audio-switcher": {
      "format": "Out: {}",
      "exec": "get-pa-sink-name.sh",
      // "exec-on-event": true,
      "interval": 2,
      "on-click": "switch-pa-sinks.sh"
     },
     "custom/audio_idle_inhibitor": {
        "format": "{icon}",
        "exec": "sway-audio-idle-inhibit --dry-print-both-waybar",
        "exec-if": "which sway-audio-idle-inhibit",
        "return-type": "json",
        "format-icons": {
          "output": " ",
          "input": " ",
          "output-input": "   ",
          "none": ""
        }
     }
}
```

### Lock Screen

This one turned into a combination of four different utilities: [swayidle](https://github.com/swaywm/swayidle) can run a command after a certain idle period, [chayang](https://git.sr.ht/~emersion/chayang) can slowly fade the screen to black and [swaylock](https://github.com/swaywm/swaylock) can lock the screen. Additionally you can use [wlopm](https://sr.ht/~leon_plickat/wlopm/) to put the screen in power saving mode and resume it again when swayidle wakes up.

This is my configuration from `~/.config/labwc/autostart`:

```
swayidle -w \
  timeout 900 'chayang && swaylock -f -c 000000' \
  timeout 1800 'wlopm --off \*' \
  resume 'wlopm --on \*' \
  before-sleep 'swaylock -f -c 000000' >/dev/null 2>&1 &
```

### Notifications

There are a bunch of notification options but I chose [mako](https://github.com/emersion/mako).

### Multi-Monitor Management

The author of mako and chayang also authors a utility called [kanshi](https://wayland.emersion.fr/kanshi/) which can do a job similar to autorandr and automatically adapt your configuration based on the amount and kind of monitors that are active.

I had some trouble figuring out what my monitors *are called* so that I can identify them with kanshi. I had to start into a `sway` session and run `swaymsg -t get_outputs` to get the names of the monitors.

I have a 24 inch monitor in vertical orientation on the left and a 27 inch monitor horizontally in the center. I normally use only the center one and sometimes activate the vertical monitor on the left. I want kanshi to react to these changes dynamically so my configuration in `.config/kanshi/config` looks like this:

```
profile single {
  output DP-4 position 0,0 mode 2560x1440
}

profile dual {
  output DP-4 position 1200,0 mode 2560x1440
  output DP-1 position 0,0 mode 1920x1200 transform 90
}
```

### Workspaces

Waybar has a built-in workspace switcher module but it is not compatible with labwc (yet?). A particular Wayland protocol needs to be implemented I think. The built-in labwc switcher is sufficient for my purposes.

### Trayicons

I enjoy having a few applications running in the background with an icon in the "tray" or a similar construct. The network manager applet is most important here, but the Jetbrains launcher, 1Password and Flame shot are also very useful.

Waybar has a built in tray widget that seems to work well. Any application that you want to have active and visible in the tray needs to be started in your `~/.config/labwc/autostart` file:

```bash
1password --silent >/dev/null 2>&1 &
nm-applet --indicator >/dev/null 2>&1 &
jetbrains-toolbox --minimize >/dev/null 2>&1 &
# Flameshot _does_ support wayland (see https://github.com/flameshot-org/flameshot/blob/master/docs/Sway%20and%20wlroots%20support.md) but it only recognizes sway as a value for XDG_CURRENT_DESKTOP
# Also starting it soon during start will prevent the tray icon from showing up, hence the sleep
sleep 2 && XDG_CURRENT_DESKTOP=sway flameshot >/dev/null 2>&1
```

I include the special casing for flameshot as it is still something we need to do as long as not all kinks are worked out in the Wayland support of various apps.

### Fonts

Labwc has the ability to configure fonts for window titles and other places that are managed by it. This configuration is part of the `~/.config/labwc/rc.xml` file:

```xml
<theme>
    <name>Numix</name>
    <cornerRadius>6</cornerRadius>
    <font place="ActiveWindow">
      <name>Inter</name>
      <size>11</size>
      <slant>normal</slant>
      <weight>bold</weight>
    </font>
    <font place="MenuItem">
      <name>Inter</name>
      <size>11</size>
      <slant>normal</slant>
      <weight>normal</weight>
    </font>
    <font place="OnScreenDisplay">
      <name>Inter</name>
      <size>11</size>
      <slant>normal</slant>
      <weight>normal</weight>
    </font>
  </theme>
```

### Keyboard Shortcuts

The same configuration files allow binding keys to certain function. I was able to map the media keys on my keyboard to `pactl` invocations to lower, raise and mute the volume:

```xml
    <keybind key="XF86_AudioLowerVolume">
      <action name="Execute" command="pactl set-sink-volume 0 -5%" />
    </keybind>
    <keybind key="XF86_AudioRaiseVolume">
      <action name="Execute" command="pactl set-sink-volume 0 +5%" />
    </keybind>
    <keybind key="XF86_AudioMute">
      <action name="Execute" command="pactl set-sink-mute 0 toggle" />
    </keybind>
```

Extremely important for me is the ability to easily move windows with the mouse without having to target the tiny resize handles of windows. Labwc supports ALT + left mouse drag for window dragging in any location and ALT + right drag for resizing windows in any location.

### Keyboard Layout

I had to configure what keyboard layout and what variant to use, this was simply done through two environment variables in `~/.config/labwc/environment`. These are my specific settings, adapt as needed of course:

```
XKB_DEFAULT_LAYOUT=us
XKB_DEFAULT_VARIANT=de_se_fi
```

### Secrets Management

In order to have session based secrets and SSH passphrase mangement I start `gnome-keyring-daemon` with the following lines in `~/.config/labwc/autostart`:

```
dbus-update-activation-environment DISPLAY XAUTHORITY WAYLAND_DISPLAY
gnome-keyring-daemon --start --components=pkcs11,secrets,ssh -d
```

It's important to also make sure the `SSH_AUTH_SOCK` environment variable is set in `~/.config/labwc/environment`:

```
SSH_AUTH_SOCK=/run/user/1000/keyring/ssh
```

## Various Other Wayland Tools

In addition to the desktop environment it may be useful to have native Wayland alternatives for certain tools. Many X only tools can work under Wayland with Xwayland (for example IntelliJj Idea) but a lot of tools have native Wayland support built in.

### Foot Terminal

I installed the [foot terminal emulator](https://codeberg.org/dnkl/foot/wiki) since it seems to be fast and it is wayland native. This terminal requires servers you access over ssh to have the termininfo package installed. My particular remote Debian server has a `foot-terminfo` package that works well.

