const sky = document.getElementById("sky");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const stars = document.getElementById("stars");
const door = document.getElementById("door");
const grass = document.querySelector(".grass");
const rooster = document.getElementById("rooster");
const fox = document.getElementById("fox");

let isNight = false;
let isAnimating = false;

// Initialize in day mode
setDayStyles();

// Door click toggles day/night with animation lock
door.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  if (isNight) {
    animateMoonSet(() => {
      animateSunRise(() => {
        setDayStyles();
        isNight = false;
        isAnimating = false;
      });
    });
  } else {
    animateSunSet(() => {
      animateMoonRise(() => {
        setNightStyles();
        isNight = true;
        isAnimating = false;
      });
    });
  }
});

// Keyboard accessibility for door (Enter or Space)
door.addEventListener("keypress", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    door.click();
  }
});

// Set day mode styles
function setDayStyles() {
  sun.style.display = "block";
  sun.style.top = "10%";
  sun.style.opacity = "1";

  moon.style.display = "none";
  moon.style.opacity = "0";

  stars.classList.remove("active");
  grass.style.display = "block";
  sky.style.background = "#ffffff";

  // Reset windows glow and ARIA
  document.querySelectorAll(".window").forEach((w) => {
    w.classList.remove("night-glow");
    w.setAttribute("aria-pressed", "false");
  });

  // Show rooster and animate walk
  rooster.style.opacity = "1";
  rooster.style.left = "50px";
  rooster.style.animation = "rooster-walk 15s linear infinite";
  rooster.style.animationPlayState = "running";

  // Hide fox and pause animation
  fox.style.opacity = "0";
  fox.style.display = "none";
  fox.style.animationPlayState = "paused";
  fox.style.animation = "";
}

// Set night mode styles
function setNightStyles() {
  moon.style.display = "block";
  moon.style.top = "10%";
  moon.style.opacity = "1";

  sun.style.display = "none";
  sun.style.opacity = "0";

  stars.classList.add("active");
  grass.style.display = "none";
  sky.style.background = "#001d3d";

  // Reset windows glow and ARIA
  document.querySelectorAll(".window").forEach((w) => {
    w.classList.remove("night-glow");
    w.setAttribute("aria-pressed", "false");
  });

  // Show fox and start peek-a-boo animation
  fox.style.display = "block";
  fox.style.opacity = "1";
  fox.style.animation = "foxPeekaboo 6s ease-in-out infinite";
  fox.style.animationPlayState = "running";

  // Hide rooster and pause animation
  rooster.style.opacity = "0";
  rooster.style.animationPlayState = "paused";
  rooster.style.animation = "";
}

// Animate sun rising
function animateSunRise(callback) {
  sun.style.display = "block";
  sun.style.animation = "sunRise 2s forwards";
  setTimeout(() => {
    sun.style.animation = "";
    if (callback) callback();
  }, 2000);
}

// Animate sun setting
function animateSunSet(callback) {
  sun.style.animation = "sunSet 2s forwards";
  setTimeout(() => {
    sun.style.display = "none";
    sun.style.animation = "";
    if (callback) callback();
  }, 2000);
}

// Animate moon rising
function animateMoonRise(callback) {
  moon.style.display = "block";
  moon.style.animation = "moonRise 2s forwards";
  setTimeout(() => {
    moon.style.animation = "";
    if (callback) callback();
  }, 2000);
}

// Animate moon setting
function animateMoonSet(callback) {
  moon.style.animation = "moonSet 2s forwards";
  setTimeout(() => {
    moon.style.display = "none";
    moon.style.animation = "";
    if (callback) callback();
  }, 2000);
}

// Toggle window light glow on click, update ARIA for accessibility
document.querySelectorAll(".window").forEach((window) => {
  window.addEventListener("click", () => {
    const isActive = window.classList.toggle("night-glow");
    window.setAttribute("aria-pressed", isActive);
  });

  // Keyboard accessibility for windows (Enter or Space)
  window.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.click();
    }
  });
});
