// Zia Nova — interactions site
// Strictement vanilla, CSP-friendly (script-src 'self').

(function () {
  'use strict';

  // ---------- 1. Nav sticky apparition au scroll ----------
  const siteNav = document.getElementById('site-nav');
  const heroSection = document.getElementById('hero');

  function onScroll() {
    if (!siteNav || !heroSection) return;
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    // Apparaît quand le bas du hero sort du viewport
    if (heroBottom < 80) {
      siteNav.classList.add('visible');
    } else {
      siteNav.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- 2. Scroll reveal (IntersectionObserver + fallback) ----------
  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
    // Fallback: si utilisateur ne scrolle pas ou IO rate, force visible apres 1.5s
    setTimeout(function () {
      revealTargets.forEach(function (el) { el.classList.add('visible'); });
    }, 1500);
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---------- 3. Langue FR/EN ----------
  const I18N = {
    fr: {
      kicker: 'Mannequin · Créatrice numérique',
      tagline: '"Parisienne à Lisbonne — la lumière du Portugal a quelque chose de différent."',
      persona1: '21 ans',
      persona2: 'Mode · Golden hour · Stream FR',
      comingSoon: 'Site complet — Bientôt',
      navHome: 'Accueil', navAbout: 'À propos', navStream: 'Stream',
      navGallery: 'Galerie', navSocial: 'Réseaux', navFaq: 'FAQ',
      navHomeShort: 'Accueil', navAboutShort: 'Moi', navStreamShort: 'Stream',
      navGalleryShort: 'Photos', navSocialShort: 'Liens', navFaqShort: 'FAQ',
      aboutLabel: 'À propos',
      aboutTitle: 'Une parisienne au Tejo',
      aboutP1: "Née à Paris, j'ai troqué le ciel gris du périphérique pour la lumière du Tage il y a quelques mois. Mannequin haute couture de formation, créatrice numérique par passion : je partage la mode, la vie portugaise et quelques escapades dorées.",
      aboutP2: "Sur Twitch, je stream en français — lifestyle, collabs, talkshow. Sur Instagram et Threads, l'esthétique golden hour au quotidien. Venez dire bonjour.",
      streamLabel: 'Twitch',
      streamTitle: 'Live en français',
      streamLead: "Stream lifestyle depuis Lisbonne — mode, discussions, moments authentiques. Abonne-toi pour ne rien manquer.",
      streamStatus: 'Suis la chaîne pour être notifié',
      streamCta: 'Voir la chaîne Twitch',
      galleryLabel: 'Galerie',
      galleryTitle: 'Moments golden hour',
      galleryLead: 'Aperçus de Lisbonne, shootings mode et coulisses du quotidien. Les clichés complets suivent le lancement officiel du site.',
      galleryHint: 'Photos bientôt · Instagram : @zia.nova7',
      socialLabel: 'Réseaux',
      socialTitle: 'Là où je suis',
      socialLead: "Chaque plateforme, son ambiance. Choisis la tienne.",
      faqLabel: 'FAQ',
      faqTitle: 'Questions fréquentes',
      faq1Q: 'Tu streams en quelle langue ?',
      faq1A: "Principalement en français. Il m'arrive de faire quelques bouts en anglais pour le chat international, mais le cœur du stream reste francophone.",
      faq2Q: 'Tu fais quoi en live ?',
      faq2A: "Lifestyle, balades à Lisbonne, préparation de shootings, playlists chill, papotages avec le chat. Rien de scripté — c'est honnête et golden hour.",
      faq3Q: 'Tu acceptes les collaborations ?',
      faq3A: 'Oui, pour les marques mode, beauté et lifestyle alignées avec l\'esthétique. Le meilleur moyen : contact@zianova.net avec un brief détaillé.',
      faq4Q: 'Tu es vraiment parisienne ?',
      faq4A: 'Oui — 21 ans, née à Paris, expatriée à Lisbonne depuis quelques mois. Le Tage et les azulejos m\'ont convaincue de rester un moment.'
    },
    en: {
      kicker: 'Model · Digital creator',
      tagline: '"Parisian in Lisbon — the Portuguese light has something different about it."',
      persona1: '21 years old',
      persona2: 'Fashion · Golden hour · Stream (FR)',
      comingSoon: 'Full site — Coming soon',
      navHome: 'Home', navAbout: 'About', navStream: 'Stream',
      navGallery: 'Gallery', navSocial: 'Socials', navFaq: 'FAQ',
      navHomeShort: 'Home', navAboutShort: 'Me', navStreamShort: 'Stream',
      navGalleryShort: 'Photos', navSocialShort: 'Links', navFaqShort: 'FAQ',
      aboutLabel: 'About',
      aboutTitle: 'A Parisian on the Tagus',
      aboutP1: "Born in Paris, I traded the grey ring-road skies for the Tagus light a few months ago. Haute couture model by training, digital creator by passion: I share fashion, Portuguese life and a few golden escapades.",
      aboutP2: "On Twitch I stream in French — lifestyle, collabs, talk-show. On Instagram and Threads, golden-hour aesthetics every day. Come say hi.",
      streamLabel: 'Twitch',
      streamTitle: 'Live in French',
      streamLead: 'Lifestyle stream from Lisbon — fashion, conversations, authentic moments. Subscribe to get notified.',
      streamStatus: 'Follow the channel to get notified',
      streamCta: 'Visit the Twitch channel',
      galleryLabel: 'Gallery',
      galleryTitle: 'Golden hour moments',
      galleryLead: 'Glimpses of Lisbon, fashion shoots and daily behind-the-scenes. Full shots will follow the official site launch.',
      galleryHint: 'Photos soon · Instagram: @zia.nova7',
      socialLabel: 'Socials',
      socialTitle: 'Where I am',
      socialLead: 'Each platform, its own vibe. Pick yours.',
      faqLabel: 'FAQ',
      faqTitle: 'Frequently asked',
      faq1Q: 'What language do you stream in?',
      faq1A: "Mostly French. I drop into English for the international chat, but the stream core stays French.",
      faq2Q: 'What do you do live?',
      faq2A: "Lifestyle, walks around Lisbon, shoot prep, chill playlists, chat banter. Nothing scripted — just honest golden-hour vibes.",
      faq3Q: 'Do you accept collaborations?',
      faq3A: 'Yes — fashion, beauty and lifestyle brands that match the aesthetic. Best way: contact@zianova.net with a detailed brief.',
      faq4Q: 'Are you really Parisian?',
      faq4A: 'Yes — 21, born in Paris, expat in Lisbon for a few months. The Tagus and the azulejos convinced me to stay a while.'
    }
  };

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.fr;
    const isMobile = window.matchMedia('(max-width: 720px)').matches;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const kMobile = el.getAttribute('data-i18n-mobile');
      const k = (isMobile && kMobile && dict[kMobile]) ? kMobile : el.getAttribute('data-i18n');
      if (dict[k]) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      const k = el.getAttribute('data-i18n-html');
      if (dict[k]) {
        // Preserve the cursor span
        const cursorSpan = el.querySelector('.cursor');
        el.textContent = dict[k];
        if (cursorSpan) el.appendChild(cursorSpan);
      }
    });
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      const isActive = b.getAttribute('data-lang') === lang;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    try { localStorage.setItem('zia.lang', lang); } catch (e) { /* ignore */ }
  }

  document.querySelectorAll('.lang-toggle button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });

  // Re-appliquer les labels quand le viewport change (rotation mobile / resize desktop)
  let lastIsMobile = window.matchMedia('(max-width: 720px)').matches;
  window.addEventListener('resize', function () {
    const nowMobile = window.matchMedia('(max-width: 720px)').matches;
    if (nowMobile !== lastIsMobile) {
      lastIsMobile = nowMobile;
      const saved = (function () {
        try { return localStorage.getItem('zia.lang') || (document.documentElement.lang || 'fr'); } catch (e) { return 'fr'; }
      })();
      applyLang(saved);
    }
  }, { passive: true });

  // Init langue depuis storage ou navigateur
  let initialLang = 'fr';
  try {
    const saved = localStorage.getItem('zia.lang');
    if (saved === 'fr' || saved === 'en') {
      initialLang = saved;
    } else if (navigator.language && navigator.language.toLowerCase().startsWith('en')) {
      initialLang = 'en';
    }
  } catch (e) { /* ignore */ }
  applyLang(initialLang);

  // ---------- 4. Smooth scroll pour ancres ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
