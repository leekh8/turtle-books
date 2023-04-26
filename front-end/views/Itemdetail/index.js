const clickedbook = {
  id: 1,
  title: "브라질에 비가 내리면 스타벅스 주식을 사라",
  author: "피터 나바로",
  publisher: "에프엔미디어",
  publishDate: "2022.04.25",
  description:
    "‘숲(경제 흐름)과 나무(종목)’를 함께 보라! 전쟁, 전염병, 기후, 금리, 환율, 인플레이션… 거시경제 지표를 이해하면 변동성은 기회다!",
  price: 16200,
  imagesrc: "../assets/book1.jpg",
  topic: "best",
  category: "소설",
};


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
      window.location.href = "../cart/cart.html" // 장바구니로 이동
    } else {
      return;
    }
  }

  //담은거 로컬스토리지에 넣기
  function pushlocal() {
    const item = clickedbook; //객체 통째로 
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; //로컬에 기존 있던거 붙이려고 꺼냄 
    cartItems.push(item); //붙임 
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); //다시 로컬 넣음 
  }

  const cartbutton = document.querySelector(".add-to-cart-btn")
  cartbutton.addEventListener("click", showalert);
  cartbutton.addEventListener("click", pushlocal);


  