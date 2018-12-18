/**
 * Header pinning/unpinning
 */

let yOld = 0
let y = 0
let queued = false

const pin = () => {
  let elem = document.querySelector('header')
  elem.classList.remove('header--unpinned')
  elem.classList.add('header--pinned')
}

const unpin = () => {
  let elem = document.querySelector('header')
  elem.classList.remove('header--pinned')
  elem.classList.add('header--unpinned')
}

const update = () => {
  // 'Δy' or 'dy' or 'delta y' = change in y
  let dy = y - yOld

  // Δy > 0   scroll movement down -> hide (unpin) header
  // Δy < 0   scroll movement up   -> show (pin) header
  // Δy = 0   no scroll movement   -> do nothing
  dy > 0 ? unpin() : dy < 0 ? pin() : null

  yOld = y // the new become the old

  // once the 'update' function runs it is no longer queued
  queued = false
}

const onScroll_cb = () => {
  // grab scroll position
  y = window.scrollY
  // if not already queued, request 'update' to run before next repaint
  if (!queued) requestAnimationFrame(update)
  // the 'update' callback will always be queued at this point
  queued = true
}

/* ---------------------------------------------------------------------------------------------- */

// change text content of element with with id
const Updater = id => text => (document.getElementById(id).textContent = text)

const updateShowClassesText = Updater('showClasses')
const updateShowCountText = Updater('showCount')

const getHeaderClasses = () => document.querySelector('header').className

/**
 * Class mutation observer
 */

const mutationObserverCallback = mutationList => {
  mutationList.forEach(mutation => updateShowClassesText(getHeaderClasses()))
}

let observer = new MutationObserver(mutationObserverCallback)

const observeConfig = {
  attributes: true, // watch targets attributes
  attributeFilter: ['class'], // only want class attribute for mutation
  attributeOldValue: true, // return old value too
}

observer.observe(document.querySelector('header'), observeConfig)

/**
 * Counter closure
 */

const Counter = function(init) {
  let privateCounter = init || 0
  const changeBy = val => (privateCounter += val)
  return {
    inc: () => changeBy(1),
    dec: () => changeBy(-1),
    val: () => changeBy(0),
  }
}

/**
 * On load...
 */

window.onload = function() {
  const count = Counter()

  updateShowCountText(count.val())
  updateShowClassesText(getHeaderClasses())

  document.addEventListener(
    'scroll',
    () => {
      updateShowCountText(count.inc()) // increment count

      // grab scroll position
      y = window.scrollY
      // if not already queued, request 'update' to run before next repaint
      if (!queued) requestAnimationFrame(update)
      // the 'update' callback will always be queued at this point
      queued = true
    },
    false
  )
}
