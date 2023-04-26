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
    const result = confirm("장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?");
    if(result) {
      // 로컬스토리지 저장 
      // 장바구니로 이동
    } else {
      return;
    }
  }

  //담은거 로컬스토리지에 넣기
  function pushlocal() {
    // const item = document.querySelector() //book을 식별가능한 id를 넣고 장바구니 렌더링 할 때 id로 db를 찾아서 다른 정보들을 가져와야할까? 
    const item = "id1"
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  const cartbutton = document.querySelector(".add-to-cart-btn")
  cartbutton.addEventListener("click", showalert);
  cartbutton.addEventListener("click", pushlocal);


  