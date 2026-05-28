const pageTitles = {
  home: "Educierge Consults | Resourcing, Skilling, Equipping",
  about: "About | Educierge Consults",
  services: "Services | Educierge Consults",
  process: "Process | Educierge Consults",
  team: "Our Team | Educierge Consults",
  testimonials: "Testimonials | Educierge Consults",
  contact: "Contact | Educierge Consults"
};

function updateActiveNav(id) {
  document.querySelectorAll(".nav-pages a").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === id);
  });
}

function initReveals() {
  const activePage = document.querySelector(".page.active");
  if (!activePage) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  activePage.querySelectorAll(".reveal").forEach((item) => {
    item.classList.remove("in");
    observer.observe(item);
  });
}

function lazyImages() {
  document.querySelectorAll("img").forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
    }
  });
}

function showPage(id, trigger) {
  const targetId = pageTitles[id] ? id : "home";
  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
  const target = document.getElementById("page-" + targetId);
  if (target) {
    target.classList.add("active");
  }

  updateActiveNav(targetId);
  document.title = pageTitles[targetId];
  window.location.hash = targetId;
  window.scrollTo({ top: 0, behavior: "auto" });

  if (trigger && trigger.blur) {
    trigger.blur();
  }

  setTimeout(() => {
    initReveals();
    lazyImages();
  }, 70);
}

function toggleMobileNav() {
  document.getElementById("mobile-nav").classList.toggle("open");
}

function openPageFromHash() {
  const id = (window.location.hash || "#home").replace("#", "");
  showPage(id);
}

window.addEventListener("scroll", () => {
  document.getElementById("nav").classList.toggle("scrolled", window.scrollY > 18);
});

window.addEventListener("hashchange", openPageFromHash);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  openPageFromHash();
  lazyImages();
});
