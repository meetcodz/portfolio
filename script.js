const prog = document.getElementById('progress');
  const backtop = document.getElementById('backtop');
  const navbar  = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    prog.style.width = pct + '%';
    backtop.classList.toggle('show', window.scrollY > 400);
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        const bar = e.target.querySelector('.skill-row-bar-fill');
        if (bar) setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      }
    });
  }, { threshold: 0.12 });
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
  setText("cc-rating", 1345);
  setText("cc-max-rating", 1345);
  setText("cc-stars", "1★");
  setText("cc-solved", 10);
  setBadge("cc-badge", "1★", "badge-1star");
  setStatus("cc", "success");
}

// -- ATCODER -- (hardcoded)
function loadAC() {
  setText("ac-handle", "@" + AC_USERNAME);
  setText("ac-rating", 800);
  setText("ac-max-rating", 800);
  setBadge("ac-badge", "Brown", "badge-brown");
  setStatus("ac", "success");
}

// Load all on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  loadCF();
  loadCC();
  loadAC();
});