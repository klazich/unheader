# unheader

[`https://klazich.github.io/unheader/`](https://klazich.github.io/unheader/)

An example of how to use the `scrollY` event to trigger actions on elements. In this
case, unpinning the `header`/`nav` when scrolling down and pinning it back when
scrolling up.

---

_This started out as a repo to test some ideas and it needs a lot of
housecleaning._

---

## About

The number in the red box is a count of [`scroll`](https://developer.mozilla.org/en-US/docs/Web/Events/scroll)
events fired since the page loaded. The blue box is the `classList` on the `<header>`
element updated when on `scroll` events.

## Local Development

1. Clone the repo and `cd` into it...

```Shell
$ git clone https://github.com/klazich/unheader.git
$ cd unheader
```

2. Install the packages by running: `yarn` or `npm install`

3. unheader uses Gulp and Postcss to build development and production files.
   BrowserSync with Gulp watch is used to serve and reload development builds.

   To start the development server run...

   ```Shell
   $ yarn start
     or
   $ npm start
   ```
