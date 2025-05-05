document.addEventListener("DOMContentLoaded", () => {
  const logoSVG = document.getElementById("logo");
  const logoSVGPath = document.querySelector(".cls-1");

  logoSVGPath.addEventListener("animationend", (event) => {
    logoSVG.classList.remove("animate");

    setTimeout(() => {
      logoSVG.classList.add("animate");
    }, 5000);
  });

  // check of reduced motion is on or off, based on the apply animation using javascript
  const mediaQuery = matchMedia("(prefers-reduced-motion)");

  const checkReducedMotion = () => {
    const videos = document.querySelectorAll(".bg-video");
    if (mediaQuery.matches) {
      videos.forEach((video) => video.pause());
    } else {
      videos.forEach((video) => video.play());
    }
  };

  checkReducedMotion();

  mediaQuery.addEventListener("change", checkReducedMotion)
});
