(function () {
  var supported = ['fr', 'sk', 'en'];
  var params = new URLSearchParams(window.location.search);
  var requested = params.get('lang');
  var browserLanguage = (navigator.language || 'fr').slice(0, 2).toLowerCase();
  var language = supported.indexOf(requested) >= 0
    ? requested
    : (supported.indexOf(browserLanguage) >= 0 ? browserLanguage : 'fr');

  function setLanguage(nextLanguage) {
    if (supported.indexOf(nextLanguage) < 0) return;
    language = nextLanguage;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-lang]').forEach(function (element) {
      element.classList.toggle('visible', element.getAttribute('data-lang') === language);
    });
    document.querySelectorAll('[data-lang-button]').forEach(function (button) {
      var active = button.getAttribute('data-lang-button') === language;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    var nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('lang', language);
    if (window.location.protocol !== 'file:') {
      window.history.replaceState({}, '', nextUrl);
    }
  }

  document.querySelectorAll('[data-lang-button]').forEach(function (button) {
    button.addEventListener('click', function () {
      setLanguage(button.getAttribute('data-lang-button'));
    });
  });

  setLanguage(language);
})();
