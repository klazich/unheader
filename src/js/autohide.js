let y = 0, yi = 0
let queued = false

const show = (query) => {
  let elem = document.querySelector(query)
  elem.classList.remove('header--hidden')
  elem.classList.add('header--visible')
}

const addRemove()

const RAF_cb = () => {
  let dy = y - yi  // Δy: change in y

  dy < 0 ? showHeader()      // (Δy < 0) scroll movement up   -> show header
    : dy > 0 ? hideHeader()  // (Δy > 0) scroll movement down -> hide header
      : null                 // (Δy = 0) no scroll movement   -> do nothing

  yi = y;
  queued = false
}

const onScroll_cb = () => {
  y = window.scrollY
  if (!queued) requestAnimationFrame(RAF_cb)
  queued = true
}



function unpin() {
  if (header.classList.contains(classes.pinned) || !header.classList.contains(classes.unpinned)) {
    header.classList.remove(classes.pinned)
    header.classList.add(classes.unpinned)
  }
}

window.onload = function () {
  header = document.getElementById(idOfHeader) || document.querySelector('header')
  console.log(header)
  document.addEventListener('scroll', onScroll, false)
}