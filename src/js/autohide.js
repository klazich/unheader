// Code goes here
var lastKnownScrollY = 0
var currentScrollY = 0
var ticking = false
var idOfHeader = 'header'
var header = null


const classes = {
  pinned: 're--header',
  unpinned: 'un--header',
}


function onScroll() {
  currentScrollY = window.pageYOffset
  requestTick()
}


function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update)
  }
  ticking = true
}

function update() {
  if (currentScrollY < lastKnownScrollY) {
    pin()
  } else if (currentScrollY > lastKnownScrollY) {
    unpin()
  }
  lastKnownScrollY = currentScrollY
  ticking = false
}


function pin() {
  if (header.classList.contains(classes.unpinned)) {
    header.classList.remove(classes.unpinned)
    header.classList.add(classes.pinned)
  }
}


function unpin() {
  if (header.classList.contains(classes.pinned) || !header.classList.contains(classes.unpinned)) {
    header.classList.remove(classes.pinned)
    header.classList.add(classes.unpinned)
  }
}

window.onload = function(){
  header = document.getElementById(idOfHeader) || document.querySelector('header')
  console.log(header)
  document.addEventListener('scroll', onScroll, false)
}