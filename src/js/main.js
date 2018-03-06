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


// construct an instance of Headroom, passing the element
var headroom = new Headroom(document.querySelector("header"), {
  "offset": 205,
  "tolerance": 5,
  "classes": {
    "initial": "animated",
    "pinned": "slideDown",
    "unpinned": "slideUp"
  }
});
headroom.init();