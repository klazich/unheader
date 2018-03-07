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

let stats = {
  preScrollY: 0,
  curScrollY: 0,
  isTicking: false,
  headerElement: null
}

const getElement = (elem) => document.querySelector(elem)
const getHeaderElem = () => getElement('header')



function pin() {
  let elem = getHeaderElem()
  if (elem.classList.contains('header--hidden')) {
    elem.classList.remove('header--hidden');
    elem.classList.add('header--visible');
  }
}


function unpin() {
  let elem = getHeaderElem()
  if (elem.classList.contains('header--visible') || !elem.classList.contains('header--hidden')) {
    elem.classList.remove('header--visible');
    elem.classList.add('header--hidden');
  }
}


window.onload = function () {

}