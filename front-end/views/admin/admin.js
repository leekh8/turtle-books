const tabButtons = document.querySelectorAll(".tabButtons");
const tabContents = document.querySelectorAll(".tabContents");

tabButtons.forEach((tabButton) => {
  tabButton.addEventListener("click", () => {
    // toggle active class
    tabButtons.forEach((tb) => {
      if (tb !== tabButton) {
        tb.classList.remove("active");
      }
    });
    tabButton.classList.toggle("active");

    // toggle subMenus
    const subMenus = tabButton.parentNode.querySelectorAll(".subMenu");
    subMenus.forEach((subMenu) => {
      if (tabButton.classList.contains("active")) {
        subMenu.style.display = "block";
      } else {
        subMenu.style.display = "none";
      }
    });

    // show tabContent
    const tab = tabButton.getAttribute("data-tab");
    tabContents.forEach((tc) => {
      if (tc.getAttribute("id") === tab) {
        tc.style.display = "block";
      } else {
        tc.style.display = "none";
      }
    });
  });
});
