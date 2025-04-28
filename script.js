document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".square");

  //   const squareAnimationKeyframes = new KeyframeEffect(
  //     element,
  //     [
  //       { transform: "translateX(0)" },
  //       { backgroundColor: "blue", offset: 0.8 },
  //       {
  //         transform: "translateX(calc(100vw - 100px)) rotate(360deg)",
  //         backgroundColor: "crimson",
  //       },
  //     ],
  //     {
  //         duration: 3000,
  //         delay: 1000,
  //         direction: "alternate",
  //         fill: "both",
  //         iterations: Infinity,
  //         easing: "linear",
  //         composite: "add"
  //     }
  //   );

  //   const squareAnimation = new Animation(
  //     squareAnimationKeyframes,
  //     document.timeline
  //   );

  //   squareAnimation.play();

  // shorthand notation for above
  const squareAnimation = element.animate(
    [
      { transform: "translateX(0)", easing: "ease-in" },
      { backgroundColor: "blue", offset: 0.8 },
      {
        transform: "translateX(calc(100vw - 100px)) rotate(360deg)",
        backgroundColor: "crimson",
      },
    ],
    {
      duration: 3000,
      delay: 1000,
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      // iterations: 2,
      easing: "linear",
      composite: "add",
    }
  );

  squareAnimation.pause();

  // other way of defining keyframes using shorthand notation
  // element.animate(
  //   {
  //     // since we have two value in the array, the offset will be 0 and 100 percentage
  //     transform: [
  //       "translateX(0)",
  //       "translateX(calc(100vw - 100px)) rotate(360deg)",
  //     ], //0 to 100 -> offset
  //     backgroundColor: ["gold", "blue", "red"],
  //     // adding offset to backgroundColor
  //     offset: [0, 0.3, 1],
  //     // adding timing function
  //     easing: ["ease-in", "linear", "ease-in-out"],
  //     // adding composition
  //     composite: ["add", "replace", "add"],
  //   },
  //   {
  //     duration: 3000,
  //     delay: 1000,
  //     direction: "alternate",
  //     fill: "both",
  //     iterations: 2,
  //     easing: "linear",
  //     composite: "replace",
  //   }
  // );

  const buttons = document.querySelectorAll(".button");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (button.classList.contains("play")) {
        squareAnimation.play();
      }

      if (button.classList.contains("pause")) {
        squareAnimation.pause();
      }

      if (button.classList.contains("cancel")) {
        squareAnimation.cancel();
      }

      if (button.classList.contains("reverse")) {
        squareAnimation.reverse();
      }

      if (button.classList.contains("finish")) {
        squareAnimation.finish();
      }

      if (button.classList.contains("changeAnimation")) {
        squareAnimation.effect.setKeyframes([
          {
            transform: "translateY(0)",
          },
          {
            backgroundColor: "greenyellow",
            offset: 0.8,
          },
          {
            transform: "translateY(calc(100vh - 100px)) rotate(360deg)",
            backgroundColor: "purple",
          },
        ]);
      }

      if (button.classList.contains("logInfo")) {
        // To know how much time the certain animation has progressed
        console.log("currentTime", squareAnimation.currentTime);
        console.log("startTime", squareAnimation.startTime);
        // To get the playbackRate
        console.log("playbackRate", squareAnimation.playbackRate);
        // To know if the animation is playing or paused
        console.log("playState", squareAnimation.playState);
        // To know the keyframes
        console.log("keyframes", squareAnimation.effect.getKeyframes());
        // To get the timing
        console.log("timing", squareAnimation.effect.getTiming());
        // To get the computed timing
        console.log(
          "computed timing",
          squareAnimation.effect.getComputedTiming()
        );
      }
    });
  });

  const playBackRateInput = document.getElementById("playbackRateInput");
  const playBackRateOutput = document.getElementById("playbackRateInputValue");

  playBackRateInput.value = squareAnimation.playbackRate;
  playBackRateOutput.value = squareAnimation.playbackRate;

  playBackRateInput.addEventListener("input", (e) => {
    const value = e.target.value;

    // updatePlaybackRate method can be used to update the speed to the animation
    squareAnimation.updatePlaybackRate(value);
    playBackRateOutput.value = value;
  });

  // changing the keyframe effect like duration, iteration....
  const durationInput = document.getElementById("durationInput");
  const durationInputValue = document.getElementById("durationInputValue");
  const infiniteInput = document.getElementById("infiniteInput");

  durationInput.value = squareAnimation.effect.getComputedTiming().duration;
  durationInputValue.value =
    squareAnimation.effect.getComputedTiming().duration;

  infiniteInput.checked =
    squareAnimation.effect.getComputedTiming().iterations === Infinity
      ? true
      : false;

  durationInput.addEventListener("input", (e) => {
    const duration = e.target.value;

    squareAnimation.effect.updateTiming({
      duration: +duration,
    });
    durationInputValue.value = duration;
  });

  infiniteInput.addEventListener("change", (e) => {
    squareAnimation.effect.updateTiming({
      iterations: e.target.checked ? Infinity : 2,
    });
  });

  // setting the current time, such that it will be in a particular position in animation timeline
  // squareAnimation.currentTime = 4000
  const currentTimeInput = document.getElementById("currentTimeInput");
  currentTimeInput.value = squareAnimation.currentTime;

  currentTimeInput.addEventListener("input", (e) => {
    const value = e.target.value;

    squareAnimation.currentTime = +value;
  });

  // To schedule our animation on a partular time in our timeline using startTime
  // startTime -> from when in our timeline does the animation start playing
  // with startTime defined, even the animation is stopped it runs after a duration specified
  // squareAnimation.startTime = 3000
  const startTimeInput = document.getElementById("startTimeInput");
  startTimeInput.value = squareAnimation.startTime;

  startTimeInput.addEventListener("input", (e) => {
    squareAnimation.startTime = +e.target.value;
  });

  // playstate
  // pending property -> when the animation is running and then we pause, then our animation goes into pending state
  // when the animation is in pending state, there will be a promise based method called ready, which is called when the animation is ready to play again
  // whenever we play or pause animation enters into ready promise based method
  squareAnimation.pause();
  console.log("play state after pause", squareAnimation.playState);
  console.log("pending after pause", squareAnimation.pending);

  squareAnimation.ready.then(() => {
    console.log("Animation is ready");
    console.log("play state after ready", squareAnimation.playState);
    console.log("pending after ready", squareAnimation.pending);
  });

  // whenever the animation is completed, a promise based finished is created
  squareAnimation.finished.then(() => {
    console.log('animation got finished');
  })

  // we can add last state of the animation to element style with the help of commitStyles
  // squareAnimation.addEventListener('finish', (e) => {
  //   squareAnimation.commitStyles()
  //   squareAnimation.cancel()
  // })

  // Sometimes animation will be removed by the browser, it can be prevented by persist() method
  squareAnimation.persist()
});
