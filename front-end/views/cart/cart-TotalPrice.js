window.onload = function () {
  // 체크 박스 기능
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
    updateTotalPrice();
  });
};

//========================증감 버튼 및 Subtotal 값 변동========================

function updateSubtotalPrice(productInCart) {
  // 초기 설정 및 업데이트 된 값을 출력
  const eachPrice = productInCart.querySelector(".eachPrice").textContent;
  const inputNum = productInCart.querySelector(".numberInput").value;
  const subtotalPrice =
    parseInt(eachPrice.replace(",", "")) * parseInt(inputNum);
  productInCart.querySelector(".subtotalPrice").textContent =
    subtotalPrice.toLocaleString();
}

function MinusNum(numberInput, productInCart) {
  // - 버튼
  if (parseInt(numberInput.value) > 1) {
    numberInput.value = parseInt(numberInput.value) - 1;
    updateSubtotalPrice(productInCart);
  } else {
    if (confirm("삭제하시겠습니까?")) {
      numberInput.value = 1;
      updateSubtotalPrice(productInCart);
    }
  }
}

function PlusNum(numberInput, productInCart) {
  // + 버튼
  numberInput.value = parseInt(numberInput.value) + 1;
  updateSubtotalPrice(productInCart);
}

function changeToNumber(numberInput, productInCart) {
  if (parseInt(numberInput.value) < 1 || isNaN(numberInput.value) === true) {
    //1보다 작은 값을 입력하거나 숫자가 아닌 값을 입력했을 때
    numberInput.value = 1;
  }
  updateSubtotalPrice(productInCart);
}

function initializeCart() {
  const ProductInCarts = document.querySelectorAll(".productInCart");

  ProductInCarts.forEach(function (productInCart) {
    // -+ 버튼이벤트 추가
    const minusBtn = productInCart.querySelector(".minusBtn");
    const plusBtn = productInCart.querySelector(".plusBtn");
    const numberInput = productInCart.querySelector(".numberInput");

    minusBtn.addEventListener("click", function () {
      MinusNum(numberInput, productInCart);
    });
    plusBtn.addEventListener("click", function () {
      PlusNum(numberInput, productInCart);
    });
    numberInput.addEventListener("input", function () {
      changeToNumber(numberInput, productInCart);
    });

    // 초기값으로 계산된 subtotalPrice 값을 출력
    updateSubtotalPrice(productInCart);
  });
}

document.addEventListener("DOMContentLoaded", initializeCart);
//==========================

function updateTotalPrice() {
  const checkBoxes = document.querySelectorAll(".checkboxs:checked"); //checkBoxes 클래스 중 체크된 것들만 가져옴
  let totalPrice = 0; // 결제 예정금액
  let deliveryCharge = 2500; // 배송비

  checkBoxes.forEach(function (checkbox) {
    //체크된 checkBoxes와 같은
    const productInCart = checkbox.closest(".productInCart"); //productInCart 아래 있는
    const subtotalPrice = parseInt(
      // subtotalPrice을 가져와
      productInCart.querySelector(".subtotalPrice").textContent.replace(",", "")
    );

    totalPrice += subtotalPrice; //totalPrice 총액에 더해준다.
  });

  if (totalPrice < 1) {
    //totalPrice 이 1미만일때 deliveryCharge는 0
    deliveryCharge = 0;
  }
  document.querySelector("#deliveryCharge").textContent =
    deliveryCharge.toLocaleString();
  document.querySelector("#selctPrice").textContent = // 배송비 제외 금액
    totalPrice.toLocaleString();

  totalPrice += deliveryCharge; //체크된 checkboxs 갯수와 관계 없이 deliveryCharge는 1회만 더해준다.

  document.querySelector("#totalPrice").textContent =
    totalPrice.toLocaleString(); // 결제 예정금액 표시
}

function initializeCart() {
  //버튼 이벤트 추가
  const ProductInCarts = document.querySelectorAll(".productInCart");

  ProductInCarts.forEach(function (productInCart) {
    const minusBtn = productInCart.querySelector(".minusBtn");
    const plusBtn = productInCart.querySelector(".plusBtn");
    const numberInput = productInCart.querySelector(".numberInput");
    const checkbox = productInCart.querySelector(".checkboxs");

    minusBtn.addEventListener("click", function () {
      MinusNum(numberInput, productInCart);
      updateTotalPrice();
    });

    plusBtn.addEventListener("click", function () {
      PlusNum(numberInput, productInCart);
      updateTotalPrice();
    });

    numberInput.addEventListener("input", function () {
      changeToNumber(numberInput, productInCart);
      updateTotalPrice();
    });

    checkbox.addEventListener("click", function () {
      updateTotalPrice();
    });

    // 초기값으로 계산된 subtotalPrice 값을 출력
    updateSubtotalPrice(productInCart);
  });

  // 초기화 후 총합 계산하여 출력
  updateTotalPrice();
}

document.addEventListener("DOMContentLoaded", initializeCart);
