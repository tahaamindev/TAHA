const scrollProgress = document.getElementById("scrollProgress");
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const toastContainer = document.getElementById("toastContainer");

function updateScrollState() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;
  navbar.classList.toggle("scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

function closeMobileNavigation() {
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.innerHTML =
    '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
  menuToggle.innerHTML = `<i class="fa-solid fa-${isOpen ? "xmark" : "bars"}" aria-hidden="true"></i>`;
});

navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", closeMobileNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileNavigation();
});

document.addEventListener("click", (event) => {
  if (
    navLinks.classList.contains("is-open") &&
    !event.target.closest(".nav-container")
  ) {
    closeMobileNavigation();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 680) closeMobileNavigation();
});

const navigationItems = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navigationItems.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`,
        );
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" },
);
sections.forEach((section) => sectionObserver.observe(section));

function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.className = isError ? "toast error" : "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  window.setTimeout(() => toast.remove(), 4500);
}

document.getElementById("currentYear").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    await emailjs.sendForm("service_tn2tlef", "template_un35z0f", contactForm);
    showToast("Thanks for reaching out. Your message has been sent.");
    contactForm.reset();
  } catch (error) {
    console.error("Unable to send contact form:", error);
    showToast("Your message could not be sent. Please try again.", true);
  } finally {
    submitButton.disabled = false;
  }
});
