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

// --------------------------------- Carousel -------------------------------------------------------
(() => {
  const carouselId = document.getElementById("carousel");
  const carouselItems = carouselId.getElementsByClassName("flex")[0];
  const carouselContainer = carouselId.getElementsByClassName("container")[0];

  function carousel_calc_offset() {
    const carouselOffset = carouselContainer.getBoundingClientRect().left;

    carouselItems.style.paddingLeft = `${carouselOffset - 16}px`;
    carouselItems.style.paddingRight = `${carouselOffset - 16}px`;
  }

  function slide(wrapper, items) {
    let posX1 = 0,
      posX2 = 0,
      posInit,
      posFinal,
      threshold = 100,
      itemToShow = 4,
      slides = items.getElementsByClassName("card"),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName("card")[0].offsideWidth,
      index = 0,
      allowShift = true;

    wrapper.classList.add("loaded");

    items.onmousedown = dragStart;

    items.addEventListener("touchstart", dragStart);
    items.addEventListener("touchend", dragEnd);
    items.addEventListener("touchmove", dragAction);
    items.addEventListener("transitionend", checkIndex);

    function dragStart(e) {
      e = e || window.event;
      e.preventDefault();
      posInit = items.offsetLeft;

      if (e.type == "touchstart") {
        console.log(e.touches);
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
      }
    }

    function dragAction(e) {
      e = e || window.event;

      if (e.type == "touchmove") {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }

      items.style.left = `${items.offsetLeft - posX2}px`;
    }

    function dragEnd() {
      posFinal = items.offsetLeft;

      if (posFinal - posInit < -threshold) {
        shiftSlide(1, "drag");
      } else if (posFinal - posInit > threshold) {
        shiftSlide(-1, "drag");
      } else {
        items.style.left = posInit + "px";
      }

      document.onmouseup = null;
      document.onmousemove = null;
    }

    function shiftSlide(direction, action) {
      addClass(items, "transition-all duration-200");

      if (allowShift) {
        if (!action) {
          posInit = items.offsetLeft;
        }

        if (direction == 1) {
          items.style.left = posInit - slideSize + "px";
          index++;
        } else if (direction == -1) {
          items.style.left = posInit + slideSize + "px";
          index--;
        }
      }

      allowShift = false;
    }

    function checkIndex() {
      setTimeout(() => {
        removeClass(items, "transition-all duration-200");
      }, 200);

      if (index == -1) {
        items.style.left = -(slidesLength * slideSize) + "px";
        index = slidesLength - 1;
      }

      if (index == slidesLength - itemToShow) {
        items.style.left =
          -((slidesLength - itemToShow - 1) * slideSize) + "px";
        index = slidesLength - itemToShow - 1;
      }

      if (index == slidesLength || index == slidesLength - 1) {
        items.style.left = "0px";
        index = 0;
      }

      allowShift = true;
    }
  }

  if (carouselId) {
    slide(carouselId, carouselItems);
    window.addEventListener("load", carousel_calc_offset);
    window.addEventListener("resize", carousel_calc_offset);
  }
})();
