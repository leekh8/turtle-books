document.addEventListener("DOMContentLoaded", () => {
  const changeBtns = document.querySelectorAll(".changeBtn");
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
