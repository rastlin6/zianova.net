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
      tagline: '"Mannequin québécoise · en tournée internationale — Montréal reste la base, le monde fait le reste."',
      persona1: '21 ans',
      persona2: 'Mode · Voyage · Stream FR/EN',
      comingSoon: 'Site complet — Bientôt',
      navHome: 'Accueil', navAbout: 'À propos', navStream: 'Stream',
      navGallery: 'Galerie', navSocial: 'Réseaux', navFaq: 'FAQ',
      navHomeShort: 'Accueil', navAboutShort: 'Moi', navStreamShort: 'Stream',
      navGalleryShort: 'Photos', navSocialShort: 'Liens', navFaqShort: 'FAQ',
      aboutLabel: 'À propos',
      aboutTitle: 'De Montréal au reste du monde',
      aboutP1: "Née à Montréal, 21 ans, mannequin freelance haute couture. Je viens de finir une tournée internationale de trois mois — Paris, Milan, New York, Lisbonne — et je reprends le quotidien d'ici, entre shootings, voyages et golden hour.",
      aboutP2: "Sur Twitch, je stream parfois en français parfois en anglais — lifestyle, mode, voyage. Sur Instagram et Threads, l'esthétique au quotidien. Viens dire allô.",
      streamLabel: 'Twitch',
      streamTitle: 'Live FR / EN',
      streamLead: "Stream lifestyle entre Montréal et le reste du monde — mode, voyage, discussions, moments authentiques. Abonne-toi pour ne rien manquer.",
      streamStatus: 'Suis la chaîne pour être notifié',
      streamCta: 'Voir la chaîne Twitch',
      galleryLabel: 'Galerie',
      galleryTitle: 'Moments en tournée',
      galleryLead: 'Aperçus de Montréal et des escales internationales — shootings mode, coulisses, daily mood. Les clichés complets suivent le lancement officiel du site.',
      galleryHint: 'Photos bientôt · Instagram : @zia.nova7',
      socialLabel: 'Réseaux',
      socialTitle: 'Là où je suis',
      socialLead: "Chaque plateforme, son ambiance. Choisis la tienne.",
      faqLabel: 'FAQ',
      faqTitle: 'Questions fréquentes',
      faq1Q: 'Tu streams en quelle langue ?',
      faq1A: "FR et EN, ça dépend du soir. Le cœur reste francophone québécois mais je passe en anglais pour le chat international.",
      faq2Q: 'Tu fais quoi en live ?',
      faq2A: "Lifestyle, balades à Montréal ou en voyage, préparation de shootings, playlists chill, papotages avec le chat. Rien de scripté — c'est honnête.",
      faq3Q: 'Tu acceptes les collaborations ?',
      faq3A: 'Oui, pour les marques mode, beauté et lifestyle alignées avec l\'esthétique. Le meilleur moyen : contact@zianova.net avec un brief détaillé.',
      faq4Q: 'Tu es vraiment québécoise ?',
      faq4A: "Oui — 21 ans, née à Montréal, base à Montréal entre les voyages. La tournée internationale, c'est pour le boulot — la maison reste icitte."
    },
    en: {
      kicker: 'Model · Digital creator',
      tagline: '"Quebec model based in Montreal · just back from an international tour — home is here, the world does the rest."',
      persona1: '21 years old',
      persona2: 'Fashion · Travel · Stream FR/EN',
      comingSoon: 'Full site — Coming soon',
      navHome: 'Home', navAbout: 'About', navStream: 'Stream',
      navGallery: 'Gallery', navSocial: 'Socials', navFaq: 'FAQ',
      navHomeShort: 'Home', navAboutShort: 'Me', navStreamShort: 'Stream',
      navGalleryShort: 'Photos', navSocialShort: 'Links', navFaqShort: 'FAQ',
      aboutLabel: 'About',
      aboutTitle: 'From Montréal to the rest of the world',
      aboutP1: "Born in Montréal, 21, freelance haute couture model. I just wrapped a three-month international tour — Paris, Milan, New York, Lisbon — and I'm back home between shoots, travels and golden hour.",
      aboutP2: "On Twitch I stream sometimes in French sometimes in English — lifestyle, fashion, travel. On Instagram and Threads, daily aesthetic. Come say hi.",
      streamLabel: 'Twitch',
      streamTitle: 'Live FR / EN',
      streamLead: 'Lifestyle stream between Montréal and the rest of the world — fashion, travel, conversations, authentic moments. Subscribe to get notified.',
      streamStatus: 'Follow the channel to get notified',
      streamCta: 'Visit the Twitch channel',
      galleryLabel: 'Gallery',
      galleryTitle: 'Tour moments',
      galleryLead: 'Glimpses of Montréal and international stops — fashion shoots, behind the scenes, daily mood. Full shots will follow the official site launch.',
      galleryHint: 'Photos soon · Instagram: @zia.nova7',
      socialLabel: 'Socials',
      socialTitle: 'Where I am',
      socialLead: 'Each platform, its own vibe. Pick yours.',
      faqLabel: 'FAQ',
      faqTitle: 'Frequently asked',
      faq1Q: 'What language do you stream in?',
      faq1A: "FR and EN, depends on the night. Core stays Quebec-French but I switch to English for the international chat.",
      faq2Q: 'What do you do live?',
      faq2A: "Lifestyle, walks in Montréal or on the road, shoot prep, chill playlists, chat banter. Nothing scripted — just honest.",
      faq3Q: 'Do you accept collaborations?',
      faq3A: 'Yes — fashion, beauty and lifestyle brands that match the aesthetic. Best way: contact@zianova.net with a detailed brief.',
      faq4Q: 'Are you really Quebecker?',
      faq4A: "Yes — 21, born in Montréal, based here between travels. International touring is for work — home stays in QC."
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
