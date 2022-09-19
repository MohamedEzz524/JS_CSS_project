//Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color1", mainColors);
  //Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColors) {
      //Add Active Class
      element.classList.add("active");
    }
  });
  //Add Active Class On Element With Data-Color === Local Storage Item
}

//Settings Box
document.querySelector(".toggle-spin .fa-gear").onclick = function () {
  // this.classList.toggle("fa-2x");
  document.querySelector(".settings-box").classList.toggle("open");
};

//Switch Colors
const colorLi = document.querySelectorAll(".colors-list li ");

colorLi.forEach(function (li) {
  li.addEventListener("click", (e) => {
    //Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color1",
      e.target.dataset.color
    );
    //Set Color To local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});
//-----------------------------
// Select Landing Image Element
let landingPage = document.querySelector(".landing");

//array Of Images
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

//Random Background Option Yes or No

let backgroundOption = true;

//Variable to Control Intevral

let backgroundIntreval;

//Check If There Is Local Storage Random Background Item

let backgroundLocalItem = localStorage.getItem("background_option");

//Check If Random Background Local Storage Is Not Empty

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  //remove all active class From All Span
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

//Switch Random BackGround Colors

const randomBackEl = document.querySelectorAll(".random-background span");

randomBackEl.forEach((span) => {
  //Click On Every Span
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === `yes`) {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundIntreval);
      localStorage.setItem("background_option", false);
    }
  });
});

//Handle Active
function handleActive(ev) {
  //Remove Active Class From All Children
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  //Add Active Class On Self
  ev.target.classList.add("active");
}

//Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundIntreval = setInterval(function () {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image Url
      landingPage.style.backgroundImage =
        `url("images/` + imgsArray[randomNumber] + `")`;
    }, 2000);
  }
}

randomizeImgs();
//---------------------------

//Select Skills
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //Skills Offset Top  [--1111px--] form to skills to top
  let skillsOffsetTop = ourSkills.offsetTop;

  //Skills Outer Height [--634px--] skills height
  let skillsOuterHeight = ourSkills.offsetHeight;

  //Window Height  [--781px--] start window height
  let windowHeight = this.innerHeight;

  //Window Scroll Top [--963.5px--] offset to reach end of skills
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//----------Gallery--popUp----

let ourGallry = document.querySelectorAll(".gallery img");

ourGallry.forEach((img) => {
  img.addEventListener("click", (e) => {
    //Create Overlay Element + Add Element + Append
    let overLay = document.createElement("div");
    overLay.className = "popup-overlay";
    document.body.appendChild(overLay);

    //Create The Popup
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      //Create Heading
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);

      popupBox.appendChild(imgHeading);
    }

    //create The Img
    let popupImg = document.createElement("img");
    popupImg.src = img.src;

    //Add Image To popupBox
    popupBox.appendChild(popupImg);

    //Append popupBox To Body
    document.body.appendChild(popupBox);

    //Create The Close SPan
    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    //add closeButton top popupBox
    popupBox.appendChild(closeButton);
  });
});

//Close The popup
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    //Remove The current popup
    e.target.parentNode.remove();

    //Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

//---------Nav Bullets

//Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

//-----bullet option

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem(".bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove(".active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

//Reset Button
document.querySelector(".reset").onclick = function () {
  // localStorage.clear()
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");

  window.location.reload();
};
