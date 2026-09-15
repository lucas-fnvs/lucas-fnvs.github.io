(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}

  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  }

  toggle.addEventListener("click", function () {
    var current = root.getAttribute("data-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var effectiveCurrent = current || (prefersDark ? "dark" : "light");
    var next = effectiveCurrent === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    revealEls.forEach(function (el) { el.classList.add("js-enabled"); });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  var viewButtons = document.querySelectorAll(".view-btn");
  var viewProjects = document.getElementById("view-projects");
  var viewTrajetoria = document.getElementById("view-trajetoria");

  viewButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      viewButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var showProjects = btn.dataset.view === "projects";
      viewProjects.hidden = !showProjects;
      viewTrajetoria.hidden = showProjects;
    });
  });
})();
