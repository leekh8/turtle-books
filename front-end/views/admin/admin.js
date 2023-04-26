document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tabButtons");
  const tabContents = document.querySelectorAll(".tabContents");
  const subMenu = document.querySelectorAll(".subMenu");
  const modalButtons = document.querySelectorAll(".modal-button");
  const modals = document.querySelectorAll(".modal");
  const closeModalButtons = document.querySelectorAll(".modal-close");

  // 탭 기능
  function changeTab(e) {
    const targetTab = e.target.dataset.tab;

    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    tabContents.forEach((content) => {
      content.style.display = "none";
    });

    e.target.classList.add("active");
    document.getElementById(targetTab).style.display = "block";
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", changeTab);
  });

  // 아코디언 기능
  function toggleSubMenu(e) {
    const subMenu = e.target.nextElementSibling;

    if (subMenu.style.display === "none" || subMenu.style.display === "") {
      subMenu.style.display = "block";
    } else {
      subMenu.style.display = "none";
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", toggleSubMenu);
  });

  // 모달 기능
  function openModal(e) {
    const targetModalId = e.target.dataset.modalTarget;
    const targetModal = document.querySelector(targetModalId);
    targetModal.classList.add("is-active");
  }

  function closeModal(e) {
    const modal = e.target.closest(".modal");
    modal.classList.remove("is-active");
  }

  modalButtons.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  closeModalButtons.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });
});
