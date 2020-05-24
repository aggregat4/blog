---
layout: post.njk
title: But wait, there's more! (to consider about the ForkJoinPool and parallel streams)
date: 2015-04-16
---

I [wrote earlier](/posts/2015-04-14-caution-advised-when-using-the-java-forkjoinpool-or-parallel-streams-with-a-securityManager/) about the problems with using a [`ForkJoinPool`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ForkJoinPool.html) explicitly, or implicitly through parallel streams, together with a SecurityManager. There are even more caveats with the way the `ForkJoinPool` is used by the parallel streams implementation and with the model of concurrency implemented by it.

The first issue with parallel streams is that they use a static, JVM-wide instance of a `ForkJoinPool`, called the `commonPool`. Implicitly using this opaque shared pool, you lose a lot of visibility into and control over important pool parameters that may be crucial to attaining high performance. Oleg Shelajev of Zeroturnaround [writes](http://zeroturnaround.com/rebellabs/java-parallel-streams-are-bad-for-your-health/) about some of the congestion and management issues you can run into.

The second problem is that the `ForkJoinPool` as it is implemented in the JDK offers a very specific and narrow form of parallel processing. Edward Harned from Coopsoft [writes at length](http://coopsoft.com/ar/Calamity2Article.html) about many of the characteristics and pitfalls of the particular form of recursive decomposition as implemented by the Java `ForkJoinPool`. You need to be very aware of your particular parallelization problem and make a very considered decision about whether this kind of fork/join approach is right for you.

Combine these two aspects together: little to no control over the parameters of the shared JVM-wide commonPool and the very narrow utility of the fork/join parallelization model, and it becomes clear that the utility of parallel streams is very limited and harbours many hidden dangers.

It is possible that as things currently stand, it is a little bit too easy to shoot yourself in the proverbial foot.
