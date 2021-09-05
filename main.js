const container = document.querySelector(".container");
const sliderContainer = Array.from(container.children);
const pervBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const slideWidth = sliderContainer[0].offsetWidth;

//  counter
let dotCounter = 0;
let counter = 1;

//  dots
const dots = document.querySelector(".dots");
const dot = Array.from(dots.children);
const reset = () => {
  dot.forEach((dot) => dot.classList.remove("active"));
};

//  set slide position
const setSlidePosition = (item, index) => {
  item.style.left = slideWidth * index + "px";
};

sliderContainer.forEach(setSlidePosition);
container.style.transform = `translateX(-${slideWidth * counter}px)`;

//  slide to the right
nextBtn.addEventListener("click", () => {
  container.style.transition = "all .5s ease-in-out";
  counter++;
  dotCounter++;
  reset();
  if (counter > sliderContainer.length - 1) {
    counter = sliderContainer.length - 1;
    return;
  }
  if (dotCounter > dot.length - 1) {
    dotCounter = 0;
  }

  dot[dotCounter].classList.add("active");
  container.style.transform = `translateX(-${slideWidth * counter}px)`;

  //   transition end
  container.addEventListener("transitionend", () => {
    const id = sliderContainer[counter].dataset.id;
    if (id && id === "first-slide") {
      container.style.transition = "none";
      counter = 1;
      container.style.transform = `translateX(-${slideWidth * counter}px)`;
    }
  });
});

//   slide to the left
pervBtn.addEventListener("click", () => {
  container.style.transition = "all .5s ease-in-out";
  counter--;
  dotCounter--;
  reset();
  if (counter < 0) {
    counter = 0;
    return;
  }
  if (dotCounter < 0) {
    dotCounter = dot.length - 1;
  }
  dot[dotCounter].classList.add("active");
  container.style.transform = `translateX(-${slideWidth * counter}px)`;

  //   transition end
  container.addEventListener("transitionend", () => {
    const id = sliderContainer[counter].dataset.id;
    if (id && id === "last-slide") {
      container.style.transition = "none";
      counter = sliderContainer.length - 2;
      container.style.transform = `translateX(-${slideWidth * counter}px)`;
    }
  });
});

dot.forEach((item, index) =>
  item.addEventListener("click", (e) => {
    const currentDot = e.currentTarget;
    const currentIndex = dot.findIndex((item) => item === currentDot);
    counter = currentIndex + 1;
    dotCounter = currentIndex;

    container.style.transition = "all .5s ease-in-out";
    reset();
    currentDot.classList.add("active");
    container.style.transform = `translateX(-${slideWidth * counter}px)`;
  })
);
