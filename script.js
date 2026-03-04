
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
