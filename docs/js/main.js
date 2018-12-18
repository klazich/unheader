/**
 * Header pinning/unpinning
 */

let yOld = 0
let y = 0
let queued = false

const pin = () => {
  const elem = document.querySelector('header')
  // switch from unpinned to pinned
  elem.classList.remove('header--unpinned')
  elem.classList.add('header--pinned')
}

const unpin = () => {
  // switch from pinned to unpinned
  const elem = document.querySelector('header')
  elem.classList.remove('header--pinned')
  elem.classList.add('header--unpinned')
}

const update = () => {
  // 'Δy' or 'dy' or 'delta y' = change in y
  const dy = y - yOld

  // Δy > 0  scroll movement down -> hide (unpin) header
  // Δy < 0  scroll movement up   -> show (pin) header
  // Δy = 0  no scroll movement   -> do nothing
  dy > 0 ? unpin() : dy < 0 ? pin() : null

  yOld = y // the new become the old

  // once this function executes it is no longer queued
  queued = false
}

// change the text content of an element given the element's id
const Updater = id => text => (document.getElementById(id).textContent = text)
const updateShowClassesText = Updater('showClasses')
const updateShowCountText = Updater('showCount')

/**
 * Element class mutation observer
 * - this updates the element #showClasses when the header element
 *   mutates (pinned/unpinned)
 */

const getHeaderClasses = () => document.querySelector('header').className

const observer = new MutationObserver(mutationList => {
  mutationList.forEach(mutation => updateShowClassesText(getHeaderClasses()))
})

observer.observe(document.querySelector('header'), {
  attributes: true, // watch targets attributes
  attributeFilter: ['class'], // only want class attribute for mutation
  attributeOldValue: true, // return old value too
})

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

      y = window.scrollY // grab scroll position
      if (!queued) requestAnimationFrame(update) // if not already queued, request 'update' to run before next repaint
      queued = true // the 'update' callback will always be queued at this point
    },
    false
  )
}
