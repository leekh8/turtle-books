document.addEventListener("DOMContentLoaded", function () {
    const minusBtn = document.querySelector(".quantity-minus"); // '-'버튼
    const numberInput = document.querySelector(".quantity-input"); //input
    const plusBtn = document.querySelector(".quantity-plus"); //'+' 버튼
  
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
  
    minusBtn.addEventListener("click", minusNum);
    plusBtn.addEventListener("click", plusNum);
  });

  //장바구니 버튼 alert
  function showalert() {
    const result = confirm("장바구니에 담겼습니다.\n 장바구니로 이동하시겠습니까?");
    if(result) {
      // 장바구니로 이동
    } else {
      return;
    }
  }

  const cartbutton = document.querySelector(".add-to-cart-btn")
  cartbutton.addEventListener("click", showalert);