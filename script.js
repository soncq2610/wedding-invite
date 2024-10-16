window.onload = function () {
  setTimeout(() => {
    document.querySelector(".loading-screen").style.display = "none";
  }, 1500);
};

var countDownDate = new Date("Nov 2, 2024 00:00:00").getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerHTML =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerHTML =
    seconds < 10 ? "0" + seconds : seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
  }
}, 1000);

const flipBook = (elBook) => {
  elBook.style.setProperty("--c", 0);

  elBook.querySelectorAll(".page").forEach((page, i) => {
    page.style.setProperty("--i", i);

    page.addEventListener("click", (evt) => {
      const isBack = !!evt.target.closest(".back");
      const isFrontPage2 = i === 1 && !isBack;

      let c;
      if (isBack) {
        c = i;
      } else if (isFrontPage2) {
        c = 0;
      } else {
        c = i + 1;
      }

      elBook.style.setProperty("--c", c);
    });
  });
};

document.querySelectorAll(".book").forEach(flipBook);

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  // Kiểm tra nếu phần tử nằm ở giữa viewport (trung tâm màn hình)
  return (
    rect.top >= windowHeight / 2 - rect.height / 2 &&
    rect.bottom <= windowHeight / 2 + rect.height / 2
  );
}

// Xử lý sự kiện scroll
window.addEventListener("scroll", function () {
  const section = document.getElementById("event");

  if (isInViewport(section)) {
    document.querySelectorAll(".book").forEach(flipBook);
  }
});
