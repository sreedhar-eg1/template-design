document.addEventListener("DOMContentLoaded", () => {
  const DURATION = 12000;

  const character = document.querySelector(".character");
  const street = document.querySelector(".street");
  const background = document.querySelector(".background");
  const foreground = document.querySelector(".foreground");
  const carWrapper = document.querySelector(".car-wrapper");

  const characterAnimation = character.animate(
    [
      {
        backgroundPosition: "0 0",
      },
      {
        backgroundPosition: "calc(var(--char-width) * -7) 0px",
      },
    ],
    {
      duration: 1000,
      iterations: Infinity,
      easing: "steps(8, jump-none)",
    }
  );

  const streetAnimation = street.animate(
    [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
    {
      duration: DURATION,
      iterations: Infinity,
      easing: "linear",
    }
  );

  const backgroundAnimation = background.animate(
    [{ transform: "translateX(100%)" }, { transform: "translateX(-50%)" }],
    {
      duration: DURATION * 2,
      iterations: Infinity,
      easing: "linear",
    }
  );

  const foregroundAnimation = foreground.animate(
    [{ transform: "translateX(200%)" }, { transform: "translateX(-200%)" }],
    {
      duration: streetAnimation.effect.getComputedTiming().duration * 1.5,
      iterations: Infinity,
      easing: "linear",
    }
  );

  function jump() {
    // if the animation is paused then dont do anything
    // if the jump animation is currently running and we need to prevent new animation
    if (
      characterAnimation.playState === "paused" ||
      character.getAnimations().find((animation) => animation.id === "jump")
    )
      return;

    // pausing the running animation when character jumps
    characterAnimation.pause();

    // adding jump class to character
    character.classList.add("jump");

    const jumpAnimation = character.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-70px)" }],
      {
        // Giving id to distinguish between other animation
        id: "jump",
        duration: 500,
        easing: "ease-in-out",
        iterations: 2,
        direction: "alternate",
      }
    );

    // increase the shadow while jumping
    document
      .querySelector(".shadow")
      .animate([{ transform: "scale(0.9)" }, { transform: "scale(1.2)" }], {
        id: "shadow",
        duration: 500,
        easing: "ease-in-out",
        iterations: 2,
        direction: "alternate",
      });

    // play running animation after the jump animation is completed
    jumpAnimation.finished.then(() => {
      characterAnimation.play();
      character.classList.remove("jump");
    });
  }

  function runFaster() {
    // restricting speed
    if (characterAnimation.playbackRate <= 3) {
      document
        .getAnimations()
        .forEach(
          (animation) =>
            animation.id !== "car" && (animation.playbackRate *= 1.1)
        );
    }
  }

  function runSlower() {
    // restricting speed
    if (characterAnimation.playbackRate >= 0.8) {
      document
        .getAnimations()
        .forEach(
          (animation) =>
            animation.id !== "car" && animation.updatePlaybackRate(0.9)
        );
    }
  }

  // slowdown after few second
  setInterval(() => {
    if (characterAnimation.playState === "running") {
      runSlower();
    }
  }, 5000);

  //   add new car method
  async function addNewcar() {
    if (
      characterAnimation.playState === "paused" ||
      document.querySelector(".car")
    )
      return;

    const car = document.createElement("div");
    car.classList.add("car");

    const carAnimation = car.animate(
      [{ transform: "translateX(-100vw)" }, { transform: "translateX(100vw)" }],
      {
        id: "car",
        duration: Math.random() * 4000 + 200,
        easing: "linear",
      }
    );

    // animating psuedo elements like ::before and ::after
    [":after", ":before"].forEach((psuedoElement) => {
      car.animate([
        {
          transform: "rotate(0)",
        },
        {
          transform: "rotate(360deg)",
        },
      ], {
        id: 'car',
        duration: carAnimation.effect.getComputedTiming().duration / 4,
        easing: 'linear',
        iterations: Infinity,
        pseudoElement: psuedoElement
      });
    })

    carWrapper.appendChild(car);

    // carAnimation.finished.then(() => {
    //   car.remove();
    // });

    // alternate approach using async await
    await carAnimation.finished;
    car.remove();

    setTimeout(() => {
      if (characterAnimation.playState === "running") {
        addNewcar();
      }
    }, Math.random * 4000);
  }

  // If the animation is paused then dont add car
  characterAnimation.ready.then(() => {
    if (characterAnimation.playState === "running") {
      addNewcar();
    }
  });

  function togglePlayState() {
    document
      .getAnimations()
      .forEach((animation) =>
        animation.playState === "running" ? animation.pause() : animation.play()
      );

    addNewcar();
  }

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "ArrowUp":
        jump();
        break;
      case "ArrowRight":
        runFaster();
        break;
      case "ArrowLeft":
        runSlower();
        break;
      case "Space":
        togglePlayState();
        break;
      default:
        break;
    }
  });
});
