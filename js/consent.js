// js/consent.js — cookie consent banner for Google Analytics (Consent Mode)
(function () {
  var CONSENT_KEY = 'ss-consent';
  var LANG_KEY = 'ss-lang';

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
    if (window.gtag) {
      try {
        gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
      } catch (e) {}
    }
  }

  var banner;

  function buildBanner() {
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML =
      '<p class="cookie-banner-text">' +
      '<span data-sl="Za anonimizirano statistiko obiska uporabljamo Google Analytics. Piškotke naložimo šele, ko jih odobrite." data-en="We use Google Analytics for anonymised visit statistics. Cookies are only set once you agree.">Za anonimizirano statistiko obiska uporabljamo Google Analytics. Piškotke naložimo šele, ko jih odobrite.</span> ' +
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

  function showBanner() {
    if (!banner) buildBanner();
    banner.hidden = false;
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
  }

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
