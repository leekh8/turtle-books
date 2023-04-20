//체크박스 전체 선택 및 해제

window.onload = function () {
  const selectAllCheckbox = document.querySelector("#selectAll"); // 전체 체크박스
  const checkBoxes = document.querySelectorAll(".checkboxs"); //개별 체크박스

  selectAllCheckbox.addEventListener("click", function () {
    if (this.checked) {
      checkBoxes.forEach(function (checkbox) {
        checkbox.checked = true;
      });
    } else {
      checkBoxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    }
  });
};
