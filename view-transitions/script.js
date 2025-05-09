document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const header = document.querySelector(".header");
  const gridOuter = document.querySelector(".grid-outer");
  const main = document.querySelector(".main .item");
  const gridButton = document.querySelector(".grid-view-button");

  function populateGridItemViewTransitionName(clear) {
    grid.querySelectorAll('.grid-item').forEach((item, index) => {
      item.style.viewTransitionName = clear ? 'none' : `grid-item-${index}`
    })
  }

  populateGridItemViewTransitionName()

  function expandImage(item) {
    const title = item.querySelector("h3").innerText;
    const largeImage = item.dataset.largeImage;
    main.querySelector("h2").innerText = title;
    main.querySelector("img").src = largeImage;
    gridButton.style.display = "block";
    header.classList.add("expanded");
    gridOuter.classList.add("expanded");

    grid
      .querySelectorAll(".active")
      .forEach((e) => e.classList.remove("active"));
    item.classList.add("active");

    // dynamically adding view transition name
    grid.style.viewTransitionName = "grid";
  }

  function displayGrid() {
    document.documentElement.scrollTop = 0;
    gridButton.style.display = "none";
    grid.style.viewTransitionName = "none";
    gridOuter.classList.remove("expanded");
    header.classList.remove("expanded");
    grid
      .querySelectorAll(".active")
      .forEach((e) => e.classList.remove("active"));
  }

  grid.addEventListener("click", async (e) => {
    const item = e.target.closest(".grid-item");
    if (!item || item.classList.contains("active")) return;

    const thumbnail = item.querySelector("img");
    const largeImage = main.querySelector("img");

    // giving same view transition name dynamically
    thumbnail.style.viewTransitionName = "image";
    largeImage.style.viewTransitionName = "none";

    if (!document.startViewTransition) {
      expandImage(item);
      return;
    }

    // on calling startViewTransition it will capture the old and new state
    // by default startViewTransition applies basic fade in animation to old and new state, which can be overridden
    const transition = document.startViewTransition(() => {
      thumbnail.style.viewTransitionName = "none";
      largeImage.style.viewTransitionName = "image";
      expandImage(item);
    });

    // scroll into view, wait for DOM to be updated and then scroll
    await transition.updateCallbackDone;
    item.scrollIntoView({ behavior: "smooth", block: "nearest" });

    await transition.finished;

    populateGridItemViewTransitionName(true)
    // largeImage.style.viewTransitionName = "none";

    // transition.skipTransition()

    // await transition.ready

    // await transition.updateCallbackDone

    // await transition.finished
  });

  gridButton.addEventListener("click", async (e) => {
    if (!document.startViewTransition) {
      displayGrid();
      return;
    }

    populateGridItemViewTransitionName()

    const activeItemTumbnail = document.querySelector(".grid-item.active img");
    const largeImage = main.querySelector("img");

    const gridtransition = document.startViewTransition(() => {
      largeImage.style.viewTransitionName = "none";
      activeItemTumbnail.style.viewTransitionName = "image";
      displayGrid();
    });

    await gridtransition.finished
    activeItemTumbnail.style.viewTransitionName = "none";
  });
});

/* 
document.startViewTransition gives lots of object methods and promises

ready -> this promise is resolved once the psuedo element tree is created and animation is about to start
          this promise will get rejected if it encounter duplicate view transition name

updateCallbackDone -> this promise is resolved, when the logic return inside startViewTransition fullfills, otherwise it will get rejected

finished -> this promise is resolved , when the animation is finished

skipTransition() -> which is used to skip the transition
*/
