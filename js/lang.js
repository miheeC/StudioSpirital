// js/lang.js
(function () {
  var STORAGE_KEY = 'ss-lang';
  var current = localStorage.getItem(STORAGE_KEY) || 'sl';

  function apply(lang) {
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    // Short inline text: swap textContent
    document.querySelectorAll('[data-sl]').forEach(function (el) {
      el.textContent = lang === 'sl' ? el.dataset.sl : el.dataset.en;
    });

    // Block elements: toggle visibility
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.dataset.lang !== lang;
    });

    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'sl' ? 'SL | EN' : 'EN | SL';
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(current);
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        apply(current === 'sl' ? 'en' : 'sl');
      });
    }
  });
})();
