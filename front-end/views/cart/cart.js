function updateSubtotalPrice(productInCart) {
  const eachPrice = productInCart.querySelector(".eachPrice").textContent;
  const inputNum = productInCart.querySelector(".numberInput").value;
  const subtotalPrice =
    parseInt(eachPrice.replace(",", "")) * parseInt(inputNum);
  productInCart.querySelector(".subtotalPrice").textContent =
    subtotalPrice.toLocaleString();
}

function MinusNum(numberInput, productInCart) {
  if (parseInt(numberInput.value) > 1) {
    numberInput.value = parseInt(numberInput.value) - 1;
    updateSubtotalPrice(productInCart);
  } else {
    if (confirm("삭제하시겠습니까?")) {
      const card = productInCart.closest(".card");
      card.remove();
      updateTotalPrice();
    } else {
      numberInput.value = 1;
    }
  }
}

function PlusNum(numberInput, productInCart) {
  numberInput.value = parseInt(numberInput.value) + 1;
  updateSubtotalPrice(productInCart);
}

function changeToNumber(numberInput, productInCart) {
  if (parseInt(numberInput.value) < 1 || isNaN(numberInput.value) === true) {
    numberInput.value = 1;
  }
  updateSubtotalPrice(productInCart);
}

function initializeCart() {
  const ProductInCarts = document.querySelectorAll(".card");

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

  // 선택 삭제 버튼 이벤트 리스너 추가
  const selectDeleteBtn = document.querySelector("#selectDelet");
  selectDeleteBtn.addEventListener("click", () => {
    const checkBoxes = document.querySelectorAll(".checkboxs:checked");
    checkBoxes.forEach(function (checkbox) {
      const card = checkbox.closest(".card");
      card.remove();
    });
    updateTotalPrice();
  });
  //개별 삭제 버튼
  const deletProduct = document.querySelectorAll(".deletProduct");
  deletProduct.forEach(function (deletBtn) {
    deletBtn.addEventListener("click", () => {
      const card = deletBtn.closest(".card");
      card.remove();
      updateTotalPrice();
    });
  });

  // 초기화 후 총합 계산하여 출력
  updateTotalPrice();
}

document.addEventListener("DOMContentLoaded", initializeCart);

function updateTotalPrice() {
  const checkBoxes = document.querySelectorAll(".checkboxs:checked");
  let totalPrice = 0;
  let deliveryCharge = 2500;

  checkBoxes.forEach(function (checkbox) {
    const productInCart = checkbox.closest(".card");
    const subtotalPrice = parseInt(
      productInCart.querySelector(".subtotalPrice").textContent.replace(",", "")
    );

    totalPrice += subtotalPrice;
  });

  if (totalPrice < 1) {
    deliveryCharge = 0;
  }
  document.querySelector("#deliveryCharge").textContent =
    deliveryCharge.toLocaleString();
  document.querySelector("#selctPrice").textContent =
    totalPrice.toLocaleString();

  totalPrice += deliveryCharge;

  document.querySelector("#totalPrice").textContent =
    totalPrice.toLocaleString();
}
