---
layout: post.njk
title: Streaming Audio Problems on Android in Sleep Mode
date: 2012-11-19
---

Some Android Apps will suddenly drop audio streams shortly after going to sleep while on a wifi connection. The SomaFM App for example has this behaviour on my Nexus S under Android 4.1.

The reason is that the Power Saving Polling (PSP) mode on Android was recently changed. Apps should request a ["Wifi Lock Mode" WIFI_MODE_FULL_HIGH_PERF](http://developer.android.com/reference/android/net/wifi/WifiManager.html#WIFI_MODE_FULL_HIGH_PERF) if they want streaming to continue uninterrupted during sleep. There are at least [two](http://code.google.com/p/android/issues/detail?id=26654) [different](http://code.google.com/p/android/issues/detail?id=9781) Android bug reports discussing this behaviour.

A workaround is to install the free [WIFI High Performance Widget](https://play.google.com/store/apps/details?id=com.ratcash.wifiperf) and enabling it when you want to listen to a stream. It will force aforementioned Wifi Lock Mode during sleep.
