---
layout: post.njk
title: Integration Testing Flash Messages with Cookie-Based Sessions in Echo
date: 2024-09-25
description: A pitfall when writing integration tests for HTTP services in go can be the difference in cookie handling between the test environment and the productive environment. Specifically the 'Secure' flag can really trip you up.
---

One approach to implemented error and success messages (or "toasts") in web applications is to use flash messages. Flash messages are stored in the session, displayed on the next request and then removed from the session.

In my case my sessions were stored in a cookie and the application was built with the go Echo web framework.

I had trouble with integration testing these flash messages: in manual browser testing the messages worked as expected but in the integration tests the messages were not rendered. The test service was locally running on HTTP.

My final intuition was that cookie flags were preventing the integration test HTTP client from transmitting the cookie when receiving a redirect. I made the `Secure` flag configurable on the server, set it to `false` in my test setup and the flash messages were correctly rendered.

This is how you can configure this in Echo:

```go
cookieStore := sessions.NewCookieStore([]byte(sessionCookieSecretKey))
cookieStore.Options.Secure = controller.Config.SessionCookieSecureFlag
e.Use(session.Middleware(cookieStore))
```

Strangely enough the browser (Firefox 130 in this case) _did_ transmit the session cookie to the server, despite the `Secure` flag being set to `true` and the server not having TLS enabled.

Turns out this is intentional browser behaviour to ease testing and development by treating the `localhost` context as secure in this case. See the [Mozilla bug report](https://bugzilla.mozilla.org/show_bug.cgi?id=1648993) where they document this. Chrome has implemented the same behaviour.
