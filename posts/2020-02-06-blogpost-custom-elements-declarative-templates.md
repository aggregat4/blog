---
layout: post.njk
title: Using Custom Elements With Declarative Templates
date: 2020-02-06
---

When you use declarative templates like lit-html or JSX or any other variant together with custom elements you will need to declare and use your custom elements as HTML tags. Since you can’t construct your components with a non-default constructor you need to employ a different strategy for configuring them:

* Expose your configuration parameters as attributes
* Expose all your dependency injection requirements (other services or objects) as properties

When the custom element has been added to the DOM you must make sure to inject all the dependencies and then initialize it. This seems a little bit more unsafe, but it allows declarative usage and it works fine.

There is an additional technique you can use to wire up components. Instead of wiring them up directly you can also work with certain conventions. For example a progress indicator could look at its ancestor elements by a certain class and use that to wire itself up. 
