/**
 * Header pinning/unpinning
 */

let yOld = 0
let y = 0
let queued = false

const pin = (query) => {
  let elem = document.querySelector(query)
  elem.classList.remove('header--unpinned')
  elem.classList.add('header--pinned')
}

const unpin = (query) => {
  let elem = document.querySelector(query)
  elem.classList.remove('header--pinned')
  elem.classList.add('header--unpinned')
}

const update = () => {
  let dy = y - yOld           // Δy is change in y

  dy > 0 ? unpin('header')    // (Δy > 0) scroll movement down -> hide header
    : dy < 0 ? pin('header')  // (Δy < 0) scroll movement up   -> show header
      : null                  // (Δy = 0) no scroll movement   -> do nothing

  yOld = y
  queued = false
}

const onScroll_cb = () => {
  y = window.scrollY
  if (!queued) requestAnimationFrame(update)
  queued = true
}

/* ---------------------------------------------------------------------------------------------- */

const Updater = id => text => document.getElementById(id).textContent = text

const updateShowClasses = Updater('showClasses')
const updateShowCount = Updater('showCount')

const getHeaderClasses = () => document.querySelector('header').className

/**
 * Class mutation observer
 */

let observer = new MutationObserver(mutationList => {
    mutationList.forEach(mutation => updateShowClasses(getHeaderClasses()))
  })

observer.observe(document.querySelector('header'), {
  attributes: true,             // watch targets attributes
  attributeFilter: ['class'],   // only want class attribute for mutation
  attributeOldValue: true       // return old value too
})

/**
 * Counter closure
 */

const Counter = function (init) {
  let privateCounter = init || 0
  const changeBy = (val) => privateCounter += val
  return {
    inc: () => changeBy(1),
    dec: () => changeBy(-1),
    val: () => changeBy(0)
  }
}

/**
 * On load...
 */

window.onload = function () {
  const count = Counter()

  updateShowCount(count.val())
  updateShowClasses(getHeaderClasses())

  document.addEventListener('scroll', () => {
    updateShowCount(count.inc())  // increment count

    y = window.scrollY
    if (!queued) requestAnimationFrame(update)
    queued = true

  }, false)

}