const prog = document.getElementById('progress');
  const backtop = document.getElementById('backtop');
  const navbar  = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    prog.style.width = pct + '%';
    backtop.classList.toggle('show', window.scrollY > 400);
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  const revealDirs = ['from-bottom','from-left','from-right','from-bl','from-br','from-scale','from-tilt-l','from-tilt-r','from-top'];

  // Assign a random direction to every reveal element before observing
  document.querySelectorAll('.reveal').forEach(el => {
    const dir = revealDirs[Math.floor(Math.random() * revealDirs.length)];
    el.classList.add(dir);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        const bar = e.target.querySelector('.skill-row-bar-fill');
        if (bar) setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = "\u2713 Sent! I\u2019ll be in touch.";
    btn.style.background = '#4caf80';
    setTimeout(() => {
      btn.textContent = 'Send message \u2192';
      btn.style.background = '';
      e.target.reset();
    }, 3000);
  }

// This file handles small interactive behaviors on the site.
// Keeping JS separate makes the project cleaner and easier to maintain.

// Progress bar that fills as the user scrolls
window.addEventListener("scroll", () => {
  const progress = document.getElementById("progress");
  if(!progress) return;

  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const percent = (scrollTop / height) * 100;
  progress.style.width = percent + "%";
});

// Back-to-top button behavior
const backTop = document.getElementById("backtop");

if(backTop){
  window.addEventListener("scroll", () => {
    if(window.scrollY > 400){
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  });

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  });
}

// -- CP STATS --
const CF_USERNAME = "Toru_Oikawa";
const CC_USERNAME = "dayodhoklo";
const AC_USERNAME = "tony_soprano1";

function setStatus(id, type) {
  const el = document.querySelector(`#${id}-status .cp-dot`);
  if (el) { el.className = `cp-dot ${type}`; }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setBadge(id, text, cls) {
  const el = document.getElementById(id);
  if (el) { el.textContent = text; el.className = `cp-badge ${cls}`; }
}

// -- CODEFORCES --
async function loadCF() {
  try {
    // User info
    const res = await fetch(`https://codeforces.com/api/user.info?handles=${CF_USERNAME}`);
    const data = await res.json();
    if (data.status !== "OK") throw new Error();
    const u = data.result[0];

    setText("cf-handle", "@" + u.handle);
    document.getElementById("cf-handle").href = `https://codeforces.com/profile/${u.handle}`;
    setText("cf-rating", u.rating ?? "--");
    setText("cf-max-rating", u.maxRating ?? "--");
    setText("cf-rank", u.rank ? u.rank.charAt(0).toUpperCase() + u.rank.slice(1) : "--");

    const rank = (u.rank || "newbie").toLowerCase().replace(" ", "");
    const badgeMap = {
      "newbie": ["Newbie", "badge-newbie"],
      "pupil": ["Pupil", "badge-pupil"],
      "specialist": ["Specialist", "badge-specialist"],
      "expert": ["Expert", "badge-expert"],
      "candidatemaster": ["Candidate Master", "badge-candidate"],
      "master": ["Master", "badge-master"],
      "internationalmaster": ["Intl. Master", "badge-master"],
      "grandmaster": ["Grandmaster", "badge-grandmaster"],
      "internationalgrandmaster": ["Intl. Grandmaster", "badge-grandmaster"],
      "legendarygrandmaster": ["Legendary GM", "badge-grandmaster"],
    };
    const [label, cls] = badgeMap[rank] || [u.rank, ""];
    setBadge("cf-badge", label, cls);

    // Solved count via user.status (last 10k submissions)
    const res2 = await fetch(`https://codeforces.com/api/user.status?handle=${CF_USERNAME}&from=1&count=10000`);
    const data2 = await res2.json();
    if (data2.status === "OK") {
      const solved = new Set(
        data2.result
          .filter(s => s.verdict === "OK")
          .map(s => `${s.problem.contestId}-${s.problem.index}`)
      );
      setText("cf-solved", solved.size);
    }

    setStatus("cf", "success");
  } catch(e) {
    setStatus("cf", "error");
    setText("cf-rating", "N/A");
  }
}

// -- CODECHEF -- (hardcoded)
function loadCC() {
  setText("cc-handle", "@" + CC_USERNAME);
  setText("cc-rating", 1578);
  setText("cc-max-rating", 1578);
  setText("cc-stars", "2★");
  setText("cc-solved", 14);
  setBadge("cc-badge", "2★", "badge-2star");
  setStatus("cc", "success");
}

// -- ATCODER -- (hardcoded)
function loadAC() {
  setText("ac-handle", "@" + AC_USERNAME);
  setText("ac-rating", 800);
  setText("ac-max-rating", 800);
  setBadge("ac-badge", "green", "badge-green");
  setStatus("ac", "success");
}

// -- TYPEWRITER (hero eyebrow cycling roles) --
(function () {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;

  const roles = [
    'Developer & Creator',
    'Competitive Programmer',
    'Database Engineer',
    'Problem Solver',
    'Open Source Contributor',
  ];

  let roleIdx = 0, charIdx = 0, deleting = false;
  const TYPING_SPEED = 68, DELETING_SPEED = 38, PAUSE = 1900;

  function tick() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; setTimeout(tick, PAUSE); return; }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(tick, deleting ? DELETING_SPEED : TYPING_SPEED);
  }
  tick();
})();

let typewriterDone = false;
function startTypewriter() {}  // legacy stub — no longer used



// -- PROJECT CARD 3D TILT --
function initMagneticButtons() {
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r   = btn.getBoundingClientRect();
      const dx  = e.clientX - (r.left + r.width  / 2);
      const dy  = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.23,1,0.32,1), background 0.22s, box-shadow 0.22s';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s linear, background 0.22s, box-shadow 0.22s';
    });
  });
}

// -- PROJECT CARD 3D TILT --
function initCardTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const dx  = (e.clientX - r.left) / r.width  - 0.5;
      const dy  = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.28s';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.08s linear, box-shadow 0.28s';
    });
  });
}

// -- CP STATS COUNTER --
function animateCount(el, target) {
  if (!el || isNaN(target)) return;
  const duration = 1200;
  const start    = performance.now();
  const from     = 0;
  const easeOut  = t => 1 - Math.pow(1 - t, 3);

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(from + (target - from) * easeOut(progress));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initCPCounters() {
  const cpSection = document.getElementById('cp-stats');
  if (!cpSection) return;

  const counted = { cf: false, cc: false, ac: false };

  const cpObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      ['cf', 'cc', 'ac'].forEach(platform => {
        if (counted[platform]) return;
        const ratingEl = document.getElementById(`${platform}-rating`);
        const maxEl    = document.getElementById(`${platform}-max-rating`);
        const solvedEl = document.getElementById(`${platform}-solved`);

        const rating = parseInt(ratingEl?.textContent);
        const max    = parseInt(maxEl?.textContent);
        const solved = parseInt(solvedEl?.textContent);

        if (!isNaN(rating) && rating > 0) {
          animateCount(ratingEl, rating);
          counted[platform] = true;
        }
        if (!isNaN(max)    && max    > 0) animateCount(maxEl,    max);
        if (!isNaN(solved) && solved > 0) animateCount(solvedEl, solved);
      });
    });
  }, { threshold: 0.3 });

  cpObserver.observe(cpSection);
}

// Load all on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  loadCF();
  loadCC();
  loadAC();

  // init all animations
  initMagneticButtons();
  initCardTilt();

  // CP counters start after a short delay so API data is loaded
  setTimeout(initCPCounters, 2000);

  // (typewriter now self-initialises above)
});

// -- TIMELINE JOURNEY FILL LINE --
(function () {
  const fill = document.getElementById('timeline-fill');
  const timeline = document.querySelector('.timeline');
  if (!fill || !timeline) return;

  function updateFill() {
    const tlRect = timeline.getBoundingClientRect();
    const tlTop = tlRect.top + window.scrollY;
    const tlHeight = timeline.offsetHeight;

    // Use viewport center as the reading head
    const viewMid = window.scrollY + window.innerHeight * 0.55;
    const raw = (viewMid - tlTop) / tlHeight;
    const progress = Math.max(0, Math.min(1, raw));

    fill.style.height = (progress * 100) + '%';

    // Light up dots that the fill line has passed
    const dots = timeline.querySelectorAll('.timeline-dot');
    dots.forEach(dot => {
      const dotRect = dot.getBoundingClientRect();
      const dotAbsTop = dotRect.top + window.scrollY - tlTop + dot.offsetHeight / 2;
      const dotProgress = dotAbsTop / tlHeight;
      dot.classList.toggle('active', progress >= dotProgress - 0.02);
    });
  }

  window.addEventListener('scroll', updateFill, { passive: true });
  window.addEventListener('resize', updateFill);
  setTimeout(updateFill, 150);
})();


(function() {
  const floatNav = document.getElementById('float-nav');
  if (!floatNav) return;

  const hero = document.querySelector('.hero');
  const sections = ['skills','experience','projects','cp-stats','testimony','contact'];
  const links = floatNav.querySelectorAll('a');

  // Create sliding pill background element
  const glider = document.createElement('span');
  glider.id = 'float-nav-glider';
  floatNav.insertBefore(glider, floatNav.firstChild);

  let currentActive = null;

  function moveGlider(activeLink) {
    if (!activeLink) {
      glider.style.opacity = '0';
      glider.style.width = '0';
      return;
    }
    const navRect  = floatNav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    glider.style.opacity  = '1';
    glider.style.width    = linkRect.width  + 'px';
    glider.style.height   = linkRect.height + 'px';
    glider.style.left     = (linkRect.left - navRect.left) + 'px';
    glider.style.top      = (linkRect.top  - navRect.top)  + 'px';
  }

  function updateFloatNav() {
    // Show only after hero is scrolled past
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    const pastHero = heroBottom < 0;
    floatNav.classList.toggle('visible', pastHero);

    // Find active section
    let activeId = null;
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.getBoundingClientRect().top <= window.innerHeight * 0.4) activeId = id;
    });

    if (activeId === currentActive) return;
    currentActive = activeId;

    let activeLink = null;
    links.forEach(a => {
      const isActive = a.getAttribute('href').replace('#','') === activeId;
      a.classList.toggle('float-active', isActive);
      if (isActive) activeLink = a;
    });

    moveGlider(activeLink);
  }

  // Recalculate on resize too
  window.addEventListener('scroll', updateFloatNav, { passive: true });
  window.addEventListener('resize', () => {
    const activeLink = floatNav.querySelector('a.float-active');
    moveGlider(activeLink);
  });

  updateFloatNav();
})();

