const weddingDate = new Date("2027-01-18T00:00:00+05:30");
const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

// Countdown timer
function updateCountdown() {
  const now = new Date();
  const difference = weddingDate - now;

  if (difference <= 0) {
    countdownEls.days.textContent = "00";
    countdownEls.hours.textContent = "00";
    countdownEls.minutes.textContent = "00";
    countdownEls.seconds.textContent = "00";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  countdownEls.days.textContent = String(days).padStart(2, "0");
  countdownEls.hours.textContent = String(hours).padStart(2, "0");
  countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
  countdownEls.seconds.textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Postcard interactivity
const postcardFront = document.getElementById("postcardFront");
const postcardBack = document.getElementById("postcardBack");
const postcardContainer = document.querySelector(".postcard-container");
const closeCard = document.querySelector(".close-card");

// Open postcard on front click
postcardFront.addEventListener("click", () => {
  postcardFront.classList.add("opened");
  postcardBack.classList.add("opened");
  postcardContainer.classList.add("postcard-open");
  document.body.classList.add("postcard-open");
  document.body.style.overflow = "hidden";
});

// Close postcard
closeCard.addEventListener("click", () => {
  postcardFront.classList.remove("opened");
  postcardBack.classList.remove("opened");
  postcardContainer.classList.remove("postcard-open");
  document.body.classList.remove("postcard-open");
  document.body.style.overflow = "auto";
});

// Sequential section navigation
let currentSectionIndex = 0;
const sections = document.querySelectorAll(".content-section");
const progressDots = document.querySelectorAll(".progress-dots .dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showSection(index) {
  // Ensure index is within bounds
  if (index < 0 || index >= sections.length) return;

  currentSectionIndex = index;

  // Hide all sections
  sections.forEach((section) => section.classList.remove("active"));
  progressDots.forEach((dot) => dot.classList.remove("active"));

  // Show current section and activate dot
  sections[index].classList.add("active");
  progressDots[index].classList.add("active");

  // Update button visibility
  if (index === 0) {
    prevBtn.style.visibility = "hidden";
  } else {
    prevBtn.style.visibility = "visible";
  }

  if (index === sections.length - 1) {
    nextBtn.innerHTML = '<span>Thank You! 💕</span>';
    nextBtn.style.pointerEvents = "none";
    nextBtn.style.opacity = "0.6";
  } else {
    nextBtn.innerHTML = '<span>Next →</span>';
    nextBtn.style.pointerEvents = "auto";
    nextBtn.style.opacity = "1";
  }

  // Scroll to top of content
  const sectionContent = document.querySelector(".section-content");
  if (sectionContent) {
    sectionContent.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

// Button click handlers
prevBtn.addEventListener("click", () => {
  if (currentSectionIndex > 0) {
    showSection(currentSectionIndex - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentSectionIndex < sections.length - 1) {
    showSection(currentSectionIndex + 1);
  }
});

// Progress dot click handlers
progressDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSection(index);
  });
});

// Initialize first section
showSection(0);

// RSVP Form handling
const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");
const storeKey = "aayush-anjali-rsvp";

if (rsvpForm) {
  // Load saved RSVP data
  const saved = JSON.parse(localStorage.getItem(storeKey) || "null");

  if (saved) {
    Object.entries(saved).forEach(([key, value]) => {
      const field = rsvpForm.elements.namedItem(key);
      if (field) {
        field.value = value;
      }
    });

    rsvpMessage.textContent = `Thank you, ${saved.name}! Your RSVP is saved and ready for the celebration.`;
  }

  // Handle form submission
  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData.entries());

    const requiredFields = ["name", "phone", "guests", "attendance"];
    const missing = requiredFields.some((field) => !String(data[field] || "").trim());

    if (missing) {
      rsvpMessage.textContent =
        "Please fill in the required details before submitting your RSVP.";
      rsvpMessage.style.color = "#e74c3c";
      return;
    }

    // Save to local storage
    localStorage.setItem(storeKey, JSON.stringify(data));
    rsvpMessage.textContent = `Thank you, ${data.name}! Your RSVP has been saved for our special day.`;
    rsvpMessage.style.color = "#b85c6f";

    // Restore form data
    Object.entries(data).forEach(([key, value]) => {
      const field = rsvpForm.elements.namedItem(key);
      if (field) {
        field.value = value;
      }
    });
  });
}


// Reveal a full-pane couple photograph inside the active content window.
function createConfetti() {
  const activeSection = document.querySelector(".content-section.active");

  if (!activeSection) return;

  const backdrop = document.createElement("div");
  backdrop.className = "celebration-backdrop";

  const couplePhoto = document.createElement("img");
  couplePhoto.src = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=90";
  couplePhoto.alt = "A couple celebrating together";
  backdrop.appendChild(couplePhoto);
  activeSection.prepend(backdrop);

  const rain = document.createElement("div");
  rain.className = "confetti-container";
  const rainColors = ["#f6d6d0", "#d6b36d", "#fff4c7", "#b85c6f", "#dfe8df"];

  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-rain";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = rainColors[Math.floor(Math.random() * rainColors.length)];
    piece.style.setProperty("--rain-delay", `${Math.random() * 1.3}s`);
    piece.style.transform = `rotate(${Math.random() * 90 - 45}deg)`;
    rain.appendChild(piece);
  }

  activeSection.appendChild(rain);
  activeSection.classList.add("photo-celebration");
}

// Scratch card effect for wedding dates
const eventDates = document.querySelectorAll(".event-date");
eventDates.forEach((dateEl) => {
  let isScratchedEnough = false;
  let scratchedArea = 0;
  const totalArea = dateEl.offsetWidth * dateEl.offsetHeight;
  const revealThreshold = 0.3; // 30% of area needs to be scratched

  function revealDate() {
    if (!isScratchedEnough) {
      isScratchedEnough = true;
      dateEl.classList.add("scratched");
      
      // Add colorful effect to the parent section
      const section = dateEl.closest(".content-section");
      if (section) {
        section.classList.add("colorful");
      }
      
      createConfetti();
    }
  }

  // Track mouse movement for scratch effect
  let isMouseDown = false;

  dateEl.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  dateEl.addEventListener("mousemove", (e) => {
    if (!isMouseDown || isScratchedEnough) return;
    
    const rect = dateEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if within bounds
    if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
      scratchedArea += 50; // Increment scratched area
      
      if (scratchedArea >= totalArea * revealThreshold) {
        revealDate();
      }
    }
  });

  dateEl.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  dateEl.addEventListener("mouseleave", () => {
    isMouseDown = false;
  });

  // Also support touch for mobile
  dateEl.addEventListener("touchstart", () => {
    isMouseDown = true;
  });

  dateEl.addEventListener("touchmove", (e) => {
    if (!isMouseDown || isScratchedEnough) return;
    
    const touch = e.touches[0];
    const rect = dateEl.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
      scratchedArea += 50;
      
      if (scratchedArea >= totalArea * revealThreshold) {
        revealDate();
      }
    }
  });

  dateEl.addEventListener("touchend", () => {
    isMouseDown = false;
  });
});
