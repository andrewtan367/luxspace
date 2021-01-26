import { addClass, removeClass } from "./utils-class";

// --------------------------------------- Menu Toggler ----------------------------------
(() => {
  const menuTogglerId = document.getElementById("menu-toggler");

  menuTogglerId.addEventListener("click", () => {
    const menuId = document.getElementById("menu");
    if (menuId.className.indexOf("opacity-0") > -1) {
      addClass(menuTogglerId, "fixed top-0 right-0");
      removeClass(menuTogglerId, "relative");
      addClass(menuId, "opacity-100 z-30");
      removeClass(menuId, "opacity-0 invisble");
    } else {
      removeClass(menuTogglerId, "fixed top-0 right-0");
      addClass(menuTogglerId, "relative");
      removeClass(menuId, "opacity-100 z-30");
      addClass(menuId, "opacity-0 invisble");
    }
  });
})();

// ------------------------------------------- Navbar Modal ---------------------------------------
(() => {
  const modalTrigger = document.getElementsByClassName("modal-trigger");
  const modalWrapperClassNames = "fixed inset-0 bg-black opacity-35";

  for (let index = 0; index < modalTrigger.length; index++) {
    const e = modalTrigger[index];

    e.addEventListener("click", () => {
      const modalWrapper = document.createElement("div");
      const modalOverlay = document.createElement("div");

      modalOverlay.addEventListener("click", () => {
        modalWrapper.remove();
      });

      addClass(
        modalWrapper,
        "fixed inset-0 z-40 flex items-center justify-center w-100 min-h-screen"
      );

      addClass(modalOverlay, modalWrapperClassNames);

      const modalContent = document.createElement("div");
      modalContent.innerHTML = e.attributes?.["data-content"].value;
      addClass(modalContent, "bg-white p-0 md:p-6 z-10");
      modalWrapper.append(modalOverlay);
      modalWrapper.append(modalContent);
      document.body.append(modalWrapper);
    });
  }
})();

// ----------------------------------- Anchor Link - Explore Button ---------------------------------
(() => {
  const smoothScrollAnchor = document.querySelectorAll("a[href^='#']");

  for (let index = 0; index < smoothScrollAnchor.length; index++) {
    const element = smoothScrollAnchor[index];

    element.addEventListener("click", function (e) {
      e.preventDefault();
      if (document.getElementById(this.getAttribute("href").replace("#", ""))) {
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  }
})();
