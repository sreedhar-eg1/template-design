document.addEventListener("DOMContentLoaded", () => {
  const container1 = document.querySelector(".c-1");
  const container2 = document.querySelector(".c-2");

  // creating scroll timeline
  //   const timeline = new ScrollTimeline({
  //     source: container1,
  //     axis: "block",
  //   });

  //   container 2 is providing the timeline and animating container 1
  const timeline = new ScrollTimeline({
    source: container2,
    axis: "block",
  });

  container1.animate([{ backgroundColor: "orange" }], {
    timeline: timeline,
    fill: "both",
    rangeStart: "30%",
    rangeEnd: "70%",
  });
});

// scroll animation using javascript web animation API

/* 
    while creating scroll timeline, in source key we need to specify the element
    we can also provide axis, which can be block, x or y

    after creating scroll timeline we can animate using animate method,

    with normal css, sometimes we need to increase the timeline scope, where in js its not required
    we can just change the source key to modify scope
*/
