---
layout: post.njk
title: Encapsulation does not imply bloated classes
date: 2014-05-13
---

In an [interesting discussion of anemic models, DDD and functional domain modeling](http://debasishg.blogspot.de/2014/05/functional-patterns-in-domain-modeling.html) Debasish Gosh links to [an article by Scott Meyer](http://www.drdobbs.com/cpp/how-non-member-functions-improve-encapsu/184401197) (of Effective C++ fame) from 2000 that convincingly argues against bloated OO modeling. The goal should not be to pack all possible functionality related to the class on that class itself. Instead he argues that having more than the essential methods on a class actually _decreases_ encapsulation since you are increasing the amount of functionality that breaks when internal details to your class change.

To paraphrase: everything that can be implemented using the public API of your class should be outside the class. Obviously design is never black or white like this, and he acknowledges that, but it is a realistic and non-typical take on encapsulation that is worth discussing.
