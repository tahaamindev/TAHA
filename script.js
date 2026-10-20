(() => {
  const projects = window.portfolioProjects || [];
  const galleryItems = window.portfolioGallery || [];
  const projectGrid = document.querySelector("#project-grid");
  const galleryGrid = document.querySelector("#gallery-grid");
  const projectDialog = document.querySelector("#project-dialog");
  const lightboxDialog = document.querySelector("#lightbox-dialog");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#site-navigation");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let projectTrigger = null;
  let galleryTrigger = null;
  let galleryIndex = 0;

  document.body.classList.add("js-ready");
  document.querySelector("#current-year").textContent = new Date().getFullYear();

  function createProjectCard(project, index) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `project-card${index === 0 ? " project-card-featured" : ""}`;
    card.setAttribute("aria-label", `View ${project.name} project details`);
    card.dataset.projectIndex = String(index);

    const imageWrap = document.createElement("span");
    imageWrap.className = "project-image-wrap";
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.imageAlt;
    image.width = 1365;
    image.height = 767;
    image.loading = "lazy";
    imageWrap.append(image);

    const detail = document.createElement("span");
    detail.className = "project-detail";
    const category = document.createElement("span");
    category.className = "project-category";
    category.textContent = project.category;
    const title = document.createElement("span");
    title.className = "project-title";
    title.textContent = project.name;
    const arrow = document.createElement("span");
    arrow.className = "project-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    detail.append(category, title, arrow);
    card.append(imageWrap, detail);
    return card;
  }

  projects.forEach((project, index) => projectGrid.append(createProjectCard(project, index)));

  function createGalleryCard(item, index) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-card";
    button.dataset.galleryIndex = String(index);
    button.setAttribute("aria-label", `Open ${item.category.toLowerCase()}: ${item.caption}`);

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.alt;
    image.width = 2000;
    image.height = 1125;
    image.loading = "lazy";

    const detail = document.createElement("span");
    detail.className = "gallery-detail";
    const category = document.createElement("span");
    category.className = "gallery-category";
    category.textContent = item.category;
    const caption = document.createElement("span");
    caption.className = "gallery-caption";
    caption.textContent = item.caption;
    detail.append(category, caption);
    button.append(image, detail);
    return button;
  }

  galleryItems.forEach((item, index) => galleryGrid.append(createGalleryCard(item, index)));

  function openProject(index, trigger) {
    const project = projects[index];
    if (!project) return;
    projectTrigger = trigger;
    const image = projectDialog.querySelector(".dialog-image");
    image.src = project.image;
    image.alt = project.imageAlt;
    projectDialog.querySelector(".dialog-kicker").textContent = project.category;
    projectDialog.querySelector("#project-dialog-title").textContent = project.name;
    projectDialog.querySelector(".dialog-description").textContent = project.description;
    const tags = projectDialog.querySelector(".dialog-tags");
    tags.replaceChildren(...project.technologies.map((technology) => {
      const tag = document.createElement("li");
      tag.textContent = technology;
      return tag;
    }));
    const source = projectDialog.querySelector(".dialog-source");
    source.href = project.source;
    const preview = projectDialog.querySelector(".dialog-preview");
    if (project.preview) {
      preview.href = project.preview;
      preview.hidden = false;
    } else {
      preview.removeAttribute("href");
      preview.hidden = true;
    }
    projectDialog.showModal();
    projectDialog.querySelector(".dialog-close").focus();
  }

  function closeDialog(dialog, trigger) {
    if (dialog.open) dialog.close();
    if (trigger?.isConnected) trigger.focus();
  }

  projectGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-project-index]");
    if (card) openProject(Number(card.dataset.projectIndex), card);
  });
  projectDialog.querySelector(".dialog-close").addEventListener("click", () => {
    closeDialog(projectDialog, projectTrigger);
  });
  projectDialog.addEventListener("click", (event) => {
    if (event.target === projectDialog) closeDialog(projectDialog, projectTrigger);
  });
  projectDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDialog(projectDialog, projectTrigger);
  });

  function showGalleryItem(index) {
    if (!galleryItems.length) return;
    galleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[galleryIndex];
    const image = lightboxDialog.querySelector(".lightbox-image");
    image.src = item.image;
    image.alt = item.alt;
    lightboxDialog.querySelector(".lightbox-caption").textContent = `${item.category} — ${item.caption}`;
    const hasMultipleItems = galleryItems.length > 1;
    lightboxDialog.querySelector(".lightbox-previous").hidden = !hasMultipleItems;
    lightboxDialog.querySelector(".lightbox-next").hidden = !hasMultipleItems;
  }

  galleryGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-gallery-index]");
    if (!card) return;
    galleryTrigger = card;
    showGalleryItem(Number(card.dataset.galleryIndex));
    lightboxDialog.showModal();
    lightboxDialog.querySelector(".lightbox-close").focus();
  });
  lightboxDialog.querySelector(".lightbox-close").addEventListener("click", () => {
    closeDialog(lightboxDialog, galleryTrigger);
  });
  lightboxDialog.addEventListener("click", (event) => {
    if (event.target === lightboxDialog) closeDialog(lightboxDialog, galleryTrigger);
  });
  lightboxDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDialog(lightboxDialog, galleryTrigger);
  });
  lightboxDialog.querySelector(".lightbox-previous").addEventListener("click", () => showGalleryItem(galleryIndex - 1));
  lightboxDialog.querySelector(".lightbox-next").addEventListener("click", () => showGalleryItem(galleryIndex + 1));
  lightboxDialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showGalleryItem(galleryIndex - 1);
    if (event.key === "ArrowRight") showGalleryItem(galleryIndex + 1);
  });

  function setMenuOpen(isOpen) {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    navLinks.classList.toggle("is-open", isOpen);
  }

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });
  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (lightboxDialog.open) {
      event.preventDefault();
      closeDialog(lightboxDialog, galleryTrigger);
      return;
    }
    if (projectDialog.open) {
      event.preventDefault();
      closeDialog(projectDialog, projectTrigger);
      return;
    }
    if (menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-shell")) setMenuOpen(false);
  });

  const revealTargets = document.querySelectorAll(".section-heading, .about-copy, .education-item, .skill-row, .tool-card, .project-card, .gallery-card, .travel-copy, .contact-intro, .social-grid a");
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((target) => {
      target.classList.add("reveal");
      revealObserver.observe(target);
    });
  }

  const cursorQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const cursor = document.querySelector(".cursor-orb");
  if (cursorQuery.matches && !reduceMotion.matches) {
    document.body.classList.add("custom-cursor-ready");
    let frame = 0;
    window.addEventListener("pointermove", (event) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        frame = 0;
      });
    }, { passive: true });
    document.addEventListener("pointerover", (event) => {
      cursor.classList.toggle("is-hovering", Boolean(event.target.closest("a, button")));
    });
    document.addEventListener("pointerout", (event) => {
      if (event.target.closest("a, button")) cursor.classList.remove("is-hovering");
    });
  }
})();
