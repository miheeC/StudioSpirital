// js/nav-back.js
// Back arrow (.nav-logo): keeps a per-tab trail of visited pages in
// sessionStorage and points the arrow at the previous page. No reliance
// on document.referrer, so it also works via file:// and any cache state.
(function () {
  var KEY = 'ss-trail';

  function readTrail() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var trail = readTrail();
    var cur = location.pathname;

    if (trail[trail.length - 1] !== cur) {
      if (trail.length > 1 && trail[trail.length - 2] === cur) {
        // arrived at the page below the top of the trail → this was a "back" step
        trail.pop();
      } else {
        trail.push(cur);
        if (trail.length > 50) trail.shift();
      }
      try { sessionStorage.setItem(KEY, JSON.stringify(trail)); } catch (e) {}
    }

    if (/\/(index\.html)?$/.test(cur)) return;

    var prev = trail[trail.length - 2];
    var logo = document.querySelector('.nav-logo');
    if (logo && prev) logo.href = prev;
  });
})();
