// 양옆에 있는 버튼으로 가운데 input 박스 안 숫자를 증감시키는 js.

document.addEventListener("DOMContentLoaded", function () {
  const minusBtns = document.querySelectorAll(".minusBtn"); // '-'버튼
  const numberInputs = document.querySelectorAll(".numberInput"); //input
  const plusBtns = document.querySelectorAll(".plusBtn"); //'+' 버튼

  function minusNum(e) {
    const input = e.target.nextElementSibling;
    if (parseInt(input.value) > 1) {
      //1이하일 경우
      input.value = parseInt(input.value) - 1;
    } else {
      if (confirm("삭제하시겠습니까?")) {
        input.value = 1;
      }
    }
  }

  function plusNum(e) {
    const input = e.target.previousElementSibling;
    input.value = parseInt(input.value) + 1;
  }

  // 체크 박스가 다수일 경우
  for (let i = 0; i < minusBtns.length; i++) {
    minusBtns[i].addEventListener("click", minusNum);
  }

  for (let i = 0; i < plusBtns.length; i++) {
    plusBtns[i].addEventListener("click", plusNum);
  }
});
