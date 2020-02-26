---
layout: post
title:  "robot.txt"
date:   2017-11-10 00:00:00 -0600
categories: jekyll update
---

### What is robots.txt and how have you configure it for your site?

A robot.txt allows you to stop (not always) search engines indexing sensitive files and directories.
There's a pattern that these search engines follows, and you can create certain rules.

**What to put in it**


The "/robots.txt" file is a text file, with one or more records. Usually contains a single record looking like this:

{% highlight ruby %}
User-agent: *
Disallow: /cgi-bin/
Disallow: /tmp/
Disallow: /~joe/
{% endhighlight %}

In this example, three directories are excluded.
It's possibly to specify which search engines are allowed/disallowed to index.

**Dont forget**

Use all lower case for the filename: "robots.txt", not "Robots.TXT.
