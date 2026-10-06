// js/consent.js — cookie consent banner for Google Analytics (Consent Mode)
(function () {
  var CONSENT_KEY = 'ss-consent';
  var LANG_KEY = 'ss-lang';
  var GA_ID = 'G-9NQNE734RS';

  function currentLang() {
    try {
      return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'sl';
    } catch (e) {
      return 'sl';
    }
  }

  function privacyHref() {
    return location.pathname.indexOf('/storitve/') !== -1
      ? '../politika-zasebnosti.html'
      : 'politika-zasebnosti.html';
  }

  function setConsent(granted) {
    try {
      localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
    } catch (e) {
      // Storage can throw (e.g. Safari Private Browsing, some in-app browsers) —
      // the banner must still close even if the choice can't be persisted.
    }
    // Fully switch GA off for the rest of this page view when declined
    window['ga-disable-' + GA_ID] = !granted;
    if (window.gtag) {
      try {
        gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
      } catch (e) {}
    }
    if (granted) {
      // gtag.js is only fetched once the visitor agrees (see the snippet in <head>)
      if (window.ssLoadGtag) window.ssLoadGtag();
    } else {
      deleteGaCookies();
    }
  }

  // Withdrawing consent must also remove cookies set while it was granted.
  // GA sets them on the top-level domain (e.g. .studiospirital.si), so try
  // every domain variant the cookie could live on.
  function deleteGaCookies() {
    var host = location.hostname;
    var parts = host.split('.');
    var domains = ['', host, '.' + host];
    for (var i = 1; i < parts.length - 1; i++) {
      domains.push('.' + parts.slice(i).join('.'));
    }
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name !== '_ga' && name.indexOf('_ga_') !== 0) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' +
          (d ? '; domain=' + d : '');
      });
    });
  }

  var banner;

  function buildBanner() {
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML =
      '<p class="cookie-banner-text">' +
      '<span data-sl="Stran za anonimizirano statistiko obiska uporablja Google Analytics. Piškotki se naložijo šele, ko jih odobrite." data-en="This site uses Google Analytics for anonymised visit statistics. Cookies are only set once you agree.">Stran za anonimizirano statistiko obiska uporablja Google Analytics. Piškotki se naložijo šele, ko jih odobrite.</span> ' +
      '<a href="' + privacyHref() + '" data-sl="Politika zasebnosti" data-en="Privacy Policy">Politika zasebnosti</a>' +
      '</p>' +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="cookie-btn cookie-btn--decline" data-sl="Zavrnem" data-en="Decline">Zavrnem</button>' +
      '<button type="button" class="cookie-btn cookie-btn--accept" data-sl="Sprejmem" data-en="Accept">Sprejmem</button>' +
      '</div>';
    document.body.appendChild(banner);

    var lang = currentLang();
    banner.querySelectorAll('[data-sl]').forEach(function (el) {
      el.textContent = lang === 'sl' ? el.dataset.sl : el.dataset.en;
    });

    banner.querySelector('.cookie-btn--accept').addEventListener('click', function () {
      hideBanner();
      setConsent(true);
    });
    banner.querySelector('.cookie-btn--decline').addEventListener('click', function () {
      hideBanner();
      setConsent(false);
    });
  }

  // The banner is fixed to the bottom of the viewport; reserve its height
  // under the footer so the footer's last lines can scroll above it.
  function updateOffset() {
    var h = banner && !banner.hidden ? banner.offsetHeight + 32 : 0;
    document.documentElement.style.setProperty('--cookie-offset', h + 'px');
  }

  function showBanner() {
    if (!banner) buildBanner();
    banner.hidden = false;
    updateOffset();
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
    updateOffset();
  }

  window.addEventListener('resize', updateOffset);

  function addSettingsLink() {
    var legal = document.querySelector('.footer-legal');
    if (!legal) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'footer-cookie-btn';
    btn.dataset.sl = 'Piškotki';
    btn.dataset.en = 'Cookies';
    btn.textContent = currentLang() === 'sl' ? 'Piškotki' : 'Cookies';
    btn.addEventListener('click', showBanner);
    legal.appendChild(btn);
  }

  document.addEventListener('DOMContentLoaded', function () {
    addSettingsLink();
    var stored = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch (e) {}
    if (stored !== 'granted' && stored !== 'denied') {
      showBanner();
    }
  });
})();
