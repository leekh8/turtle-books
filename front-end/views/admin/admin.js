document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tabButtons");
  const tabContents = document.querySelectorAll(".tabContents");
  const subMenus = document.querySelectorAll(".subMenu");
  const modalButtons = document.querySelectorAll(".modal-button");
  const modals = document.querySelectorAll(".modal");
  const closeModalButtons = document.querySelectorAll(".modal-close");
  const changeBtns = document.querySelectorAll(".changeBtn");

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
    subMenu.style.display = subMenu.style.display === "none" ? "block" : "none";
  }

  subMenus.forEach((subMenu) => {
    subMenu.previousElementSibling.addEventListener("click", toggleSubMenu);
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

  // 수정버튼 기능
  changeBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const isEditMode = button.textContent.trim() === "수정";

      button.textContent = isEditMode ? "저장" : "수정";
      button.type = isEditMode ? "submit" : "button";

      const changeTextElements =
        button.parentElement.parentElement.querySelectorAll(".changeText");

      changeTextElements.forEach((el) => {
        if (isEditMode) {
          const input = document.createElement("input");
          input.type = "text";
          input.value = el.textContent;
          input.classList.add("changeText"); // 스타일 유지를 위해 'changeText' 클래스 추가
          el.replaceWith(input);
        } else {
          const td = document.createElement("td");
          td.textContent = el.value;
          td.classList.add("changeText");
          el.replaceWith(td);
        }
      });
    });
  });
});
