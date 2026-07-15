/* Freeze 1% of the viewport height into --vhpx. In-app browsers
   (Instagram, Facebook) resize the whole webview when their chrome
   hides/shows mid-scroll, which recomputes vh/svh units and makes
   the page jump. Re-measure only on rotation or a large resize. */
(function () {
  var lastW = window.innerWidth;
  var lastH = window.innerHeight;
  function set() {
    document.documentElement.style.setProperty('--vhpx', (window.innerHeight / 100) + 'px');
  }
  set();
  window.addEventListener('resize', function () {
    if (window.innerWidth !== lastW || Math.abs(window.innerHeight - lastH) > 150) {
      lastW = window.innerWidth;
      lastH = window.innerHeight;
      set();
    }
  });
})();
