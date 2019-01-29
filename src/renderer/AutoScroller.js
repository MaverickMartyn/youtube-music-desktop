export function scrollToSmoothly (pos, time) {
  // Time is only applicable for scrolling upwards
  // Code written by hev1
  // Pos is the y-position to scroll to (in pixels)
  if (isNaN(pos)) {
    console.log('Position must be a number')
    return
  }
  if (pos < 0) {
    console.log('Position can not be negative')
    return
  }
  var currentPos = window.scrollY || window.screenTop
  if (currentPos < pos) {
    var t = 10
    for (let i = currentPos; i <= pos; i += 10) {
      t += 10
      setTimeout(function () {
        window.scrollTo(0, i)
      }, t / 2)
    }
  } else {
    time = time || 2
    var i = currentPos
    var x
    x = setInterval(function () {
      window.scrollTo(0, i)
      i -= 10
      if (i <= pos) {
        clearInterval(x)
      }
    }, time)
  }
}
