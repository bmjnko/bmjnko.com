This site is a handful of static files.
There is no framework and no build step, so it can live on any static host, including GitHub Pages.

## The pieces

| File | What it does |
| --- | --- |
| `index.html` | The home page, including the ASCII art drawn on a `<canvas>` |
| `assets/site.css` | Colors, type, and layout shared by every page |
| `assets/site.js` | The mobile menu, the sidebar highlight, and the fade-in on scroll |
| `writing/posts.json` | The list of posts: title, date, tag, and a one-line summary |
| `writing/posts/*.md` | The posts themselves, written in Markdown |

## Writing a post

1. Write the post as `writing/posts/my-post.md`.
2. Add one entry for it to `writing/posts.json`.
3. Publish the folder.

The home page and the writing page both read `posts.json`, so a new post shows up in both places without touching any HTML.

> Keeping the list in one file means there is exactly one place to get wrong, and one place to look when something is off.

## Why no framework

A personal site changes slowly and should keep working for years.
Every dependency is something that can break while nobody is looking.
Plain files are boring in the best way: they open in any browser, they diff cleanly, and they will still make sense long after today's tools have moved on.

The few libraries this page does use, for Markdown, math, and code highlighting, are pinned to exact versions and only load on posts that need them.
