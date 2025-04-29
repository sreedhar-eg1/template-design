document.addEventListener("DOMContentLoaded", () => {
  const container1 = document.querySelector(".c-1");
  const container2 = document.querySelector(".c-2");

  const subject1 = container1.querySelector(".progress-inner");

  const timeline = new ScrollTimeline({
    source: container2,
    axis: "block",
  });

  const viewTimeline = new ViewTimeline({
    subject: subject1,
    axis: "block",
     // passing inset
    // inset: "auto 100px"

    // other way of defining inset
    // inset: ["auto", CSS.px(100)]
  });

  container1.animate([{ backgroundColor: "orange" }], {
    timeline: timeline,
    fill: "both",
    rangeStart: "30%",
    rangeEnd: "70%",
  });

  //   view animation
  subject1.animate([{ width: "0" },{ width: "100%" }], {
    timeline: viewTimeline,
    fill: "both",

    // passing range
    // rangeStart: "cover 30%"

    // alternative approach for range
    rangeStart: {
        rangeName: "cover",
        offset: CSS.percent(30)
    }
  });
});

// scroll view animation using javascript web animation API

/* 
      view timeline can be created using viewTimeline

      in view timeline, instead of container, we need to pass the subject, when that subject comes into view animation starts

      inset value are passed inside viewTimeline itself

      but ranges are defined inside animate method
  */
