const body = document.body;

const introOverlay = document.getElementById("introOverlay");
const heroAnimate = document.querySelector(".hero-animate");
const heroBg = document.getElementById("heroBg");

const modal = document.getElementById("bookingModal");
const openButtons = document.querySelectorAll(".open-booking");
const closeButton = document.getElementById("closeBookingModal");
const backdrop = document.querySelector(".modal-backdrop");
const bookingForm = document.getElementById("bookingForm");
const successMessage = document.getElementById("successMessage");

const revealElements = document.querySelectorAll(".reveal");

const menuToggle = document.getElementById("menuToggle");
const overlayMenu = document.getElementById("overlayMenu");
const overlayMenuLinks = document.querySelectorAll(".overlay-menu a");

const galleryButtons = document.querySelectorAll(".gallery-open");
const lightbox = document.getElementById("lightbox");
const lightboxBackdrop = document.querySelector(".lightbox-backdrop");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

const accordionItems = document.querySelectorAll(".accordion-item");

function lockScroll() {
  body.classList.add("no-scroll");
}

function unlockScroll() {
  if (!modal.classList.contains("active") && !lightbox.classList.contains("active")) {
    body.classList.remove("no-scroll");
  }
}

window.addEventListener("load", () => {
  lockScroll();

  setTimeout(() => {
    introOverlay.classList.add("hide");
    unlockScroll();

    if (heroAnimate) {
      heroAnimate.classList.add("loaded");
    }
  }, 2100);
});

/* Parallax */
window.addEventListener("scroll", () => {
  if (!heroBg) return;

  const scrollY = window.scrollY;
  heroBg.style.transform = `translateY(${scrollY * 0.18}px) scale(1.06)`;
});

/* Modal */
function openModal() {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  lockScroll();
}

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  unlockScroll();
}

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeOverlayMenu();
    openModal();
  });
});

closeButton.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  bookingForm.style.display = "none";
  successMessage.classList.add("active");

  setTimeout(() => {
    bookingForm.reset();
    bookingForm.style.display = "block";
    successMessage.classList.remove("active");
    closeModal();
  }, 2200);
});

/* Overlay menu */
function openOverlayMenu() {
  overlayMenu.classList.add("active");
  menuToggle.classList.add("active");
}

function closeOverlayMenu() {
  overlayMenu.classList.remove("active");
  menuToggle.classList.remove("active");
}

menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();

  if (overlayMenu.classList.contains("active")) {
    closeOverlayMenu();
  } else {
    openOverlayMenu();
  }
});

overlayMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeOverlayMenu();
  });
});

document.addEventListener("click", (event) => {
  const clickedInsideMenu =
    overlayMenu.contains(event.target) || menuToggle.contains(event.target);

  if (!clickedInsideMenu) {
    closeOverlayMenu();
  }
});

/* Lightbox */
function openLightbox(src, title) {
  lightboxImage.src = src;
  lightboxTitle.textContent = title;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  lockScroll();
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxTitle.textContent = "";
  unlockScroll();
}

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const imageSrc = button.dataset.image;
    const imageTitle = button.dataset.title || "";
    openLightbox(imageSrc, imageTitle);
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);

/* Accordion */
accordionItems.forEach((item) => {
  const trigger = item.querySelector(".accordion-trigger");

  trigger.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    accordionItems.forEach((el) => el.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

/* Escape */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (modal.classList.contains("active")) {
      closeModal();
    }

    if (lightbox.classList.contains("active")) {
      closeLightbox();
    }

    if (overlayMenu.classList.contains("active")) {
      closeOverlayMenu();
    }
  }
});

/* Reveal on scroll */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => observer.observe(element));