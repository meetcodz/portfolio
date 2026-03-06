Meet Modi — Personal Portfolio
A handcrafted, portfolio built with vanilla HTML, CSS, and JavaScript. No frameworks, no build steps — just clean, fast, and expressive web code.

✨ Live Features
🎨 Visual & UX

Paper-grain background — subtle SVG noise texture layered on the cream base for a tactile, editorial feel
Scroll-reveal animations — elements enter from randomised directions (bottom, left, right, diagonals, scale, tilt) via IntersectionObserver
Reading progress bar — 2.5px accent-gradient line at the very top of the viewport
Gravity cursor trail — canvas-based particle system; warm orange/gold circles and diamonds burst upward from the cursor and fall with gravity (desktop only)
Hero entrance — staggered heroFadeUp keyframe animations for each hero element on load

🧭 Navigation

Sticky top nav — frosted-glass bar with underline-hover links, GitHub button, and CTA
Floating pill nav (desktop) — appears after scrolling past the hero; slides up from the bottom of the screen into a frosted pill with:

Icon + label for each section
Dot separators between links
Animated glider pill that slides between active sections


Floating pill nav (mobile) — bottom-docked pill showing 3 links at a time; the track slides horizontally to keep the active section centred
Back-to-top button — appears after 400px scroll, bottom-right corner

🏆 Competitive Programming Stats
Live API integration for three platforms:
PlatformData SourceStats shownCodeforcesLive API (user.info + user.status)Rating, Max Rating, Rank badge, Problems SolvedCodeChefHardcoded snapshotRating, Max Rating, Stars badge, Problems SolvedAtCoderHardcoded snapshotRating, Max Rating, Colour badge
Ratings animate up from 0 when the CP section scrolls into view (easeOut cubic counter).
📋 Sections
SectionHighlightsHeroTypewriter cycling through 5 roles, floating "Open to Work" tag with breathing green dot, scroll hint arrowSkillsHorizontal progress bars that animate in on scroll, icon + description rows with hover liftExperienceAlternating left/right timeline with a live orange fill-line and glowing dot that lights up each entry as you scrollProjects3D card tilt on hover (perspective + rotateX/Y), top accent bar slide-in, image with scale on hoverCP StatsPlatform cards with animated counters, rank-colour badgesTestimonialQuote card with decorative " markContactSplit layout — social links + contact form with success state

🗂 File Structure
portfolio/
├── index.html              # All HTML — sections, nav, cards, timeline, CP cards
├── style.css               # Main stylesheet — tokens, layout, animations, responsive rules
├── float-nav-desktop.css   # Additive patch — desktop bottom-pill float nav styles
└── script.js               # All JavaScript — scroll effects, CP API, animations, float nav

float-nav-desktop.css must be loaded after style.css to correctly override the float nav positioning.


🔌 External Dependencies
All loaded via CDN — no npm, no bundler.
DependencyPurposeGoogle Fonts — LoraSerif display font (headings, names)Google Fonts — NunitoSans-serif body font (UI, labels)Font Awesome 6Icons throughout nav, sections, float navCodeforces APILive rating + solved count for Toru_Oikawa

🎨 Design Tokens
All colours and spacing are driven by CSS custom properties in :root:
css--cream   #faf7f2   /* Page background */
--cream2  #f3ede3   /* Card / icon backgrounds */
--cream3  #ede4d6   /* Offset shadow, placeholder fills */
--brown   #2c1f14   /* Primary text */
--brown2  #4a3020   /* Secondary text */
--accent  #c0622f   /* Orange — CTAs, active states, glider */
--accent2 #e8956d   /* Lighter orange — gradients, hover accents */
--muted   #6e4e3a   /* Muted text, labels */
--border  #e2d8cc   /* All borders and dividers */
--shadow  rgba(44,31,20,0.07)

⚙️ JavaScript Modules
Each feature is wrapped in its own IIFE or function to keep concerns isolated:
ModuleDescriptionScroll coreProgress bar, back-to-top, navbar scrolled classScroll revealRandom direction assignment + IntersectionObserverTypewriterCycles through 5 role strings with typing/deleting animationMagnetic buttons.btn-primary follows the cursor with subtle translateCard tilt.project-card 3D perspective tilt on mousemoveCP StatsloadCF() (live API), loadCC() and loadAC() (hardcoded snapshots)CP CountersanimateCount() — easeOut cubic counter for ratings/solved on scroll-inTimeline fillScroll-driven orange fill line + dot activation for experience sectionFloating navFull float nav logic — glider, mobile track, icon injection, dot separatorsCursor trailCanvas particle system — 28 warm-toned particles with gravity and friction

📱 Responsive Breakpoints
BreakpointChanges≤ 1100pxHero font shrinks, photo narrows≤ 900pxHero goes single-column (photo on top), skill bars hidden, contact/testimony stack≤ 780pxSticky top nav locks, float nav switches to sliding bottom track, back-to-top moves up≤ 760pxTimeline goes single-column (dots on left edge)≤ 560pxNav links hidden (only CTA visible), hero fonts compress, scroll hint hidden

🔧 Updating CP Stats
Codeforces updates automatically from the API on every page load.
CodeChef / AtCoder are hardcoded in script.js — update these values manually when ratings change:
js// CodeChef — around line 155
setText("cc-rating", 1578);
setText("cc-max-rating", 1578);
setText("cc-stars", "2★");
setText("cc-solved", 14);

// AtCoder — around line 165
setText("ac-rating", 800);
setText("ac-max-rating", 800);

🚀 Deployment
No build step required. Drop the files onto any static host:

GitHub Pages — push to a repo, enable Pages in Settings
Netlify / Vercel — drag-and-drop the folder
Any web server — just serve the HTML file


👤 Author
Meet Modi — @meetcodz

Codeforces: @Toru_Oikawa
CodeChef: @dayodhoklo
AtCoder: @tony_soprano1
