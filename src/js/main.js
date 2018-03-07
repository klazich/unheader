const getHeaderClassName = () => document.querySelector('header').className
const updateDisplay = (text) => document.getElementById('displayHeaderClass').textContent = text

updateDisplay(getHeaderClassName())

const callback = (mutationList) => {
  mutationList.forEach(mutation => {
    console.log('header class change', mutation)
    updateDisplay(getHeaderClassName())
  })
}

let observer = new MutationObserver(callback)
observer.observe(document.querySelector('header'), {
  attributes: true,
  attributeFilter: ['class'],
  attributeOldValue: true
})

/**
 * Header pinning/unpinning
 * see: https://github.com/sysleaf/js-auto-hide-header-onscroll/blob/master/script.js
 */

const classNames = {
  show: 'header--show',
  hide: 'header--hide',
  top0: 'header--top-0',
  bottom0: 'header--bottom-0'
}


function pin() {
  if (eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.unpinned);
    eleHeader.classList.add(classes.pinned);
  }
}


function unpin() {
  if (eleHeader.classList.contains(classes.pinned) || !eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.pinned);
    eleHeader.classList.add(classes.unpinned);
  }
}


window.onload = function () {

}