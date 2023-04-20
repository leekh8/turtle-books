//체크박스 전체 선택 및 해제

window.onload = function () {
  const selectAllCheckbox = document.querySelector("#selectAll"); // 전체 체크박스
  const bookCheckboxes = document.querySelectorAll(".checkboxs"); //개별 체크박스

  selectAllCheckbox.addEventListener("click", function () {
    if (this.checked) {
      bookCheckboxes.forEach(function (checkbox) {
        checkbox.checked = true;
      });
    } else {
      bookCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    }
  });
};
