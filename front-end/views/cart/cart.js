// 로컬스토리지 데이터 변수 할당
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//로컬스토리지 HTML 화면 표시
const displayDataOnHtml = () => {
  const productInCart = document.getElementById("productInCart");
  const noItem = document.getElementById("noItem");
  const haveItem = document.getElementById("haveItem");

  if (cartItems.length === 0) {
    // 장바구니에 상품이 없을 경우
    haveItem.style.display = "none";
    noItem.style.display = "";
    return;
  } else {
    haveItem.style.display = "";
    noItem.style.display = "none";
  }

  cartItems.forEach((item) => {
    const book = item[0];
    const id = item[1];

    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card">
        <div class="card-content">
          <div class="content">
            <input type="checkbox" class="checkboxs" name="checkbox" id="checkbox_${
              book.id
            }">
            <img class="productImg" src="${book.imageUrl}" alt="책이미지">
            <div class="productNamePrice">
              <h4>
                <span id="productTittle">${book.title}</span>
              </h4>
              <p><span class="eachPrice">${book.price}</span>원</p>
            </div>
            <div class="contentAligin">
              <p class="subtotalPrice">${book.price * id}</p>
              <div class="productQntty">
                <input type="button" class="minusBtn" value="-">
                <input type="text" class="numberInput" value="${id}" style="width: 25px; text-align: center;">
                <input type="button" class="plusBtn" value="+">
              </div>
            </div>
            <div class="arriveAndDelet">
              <input type="button" value="X" class="deletProduct">
              <p>택배발송</p>
            </div>
          </div>
        </div>
      </div>
    `;

    productInCart.appendChild(div);

    // 카드에 이벤트 추가
    const minusBtn = div.querySelector(".minusBtn");
    const plusBtn = div.querySelector(".plusBtn");
    const numberInput = div.querySelector(".numberInput");
    const checkbox = div.querySelector(".checkboxs");
    const deletProduct = div.querySelector(".deletProduct");
    const selectAll = document.querySelector("#selectAll");

    //전체선택
    selectAll.addEventListener("click", () => {
      const checkBoxes = document.querySelectorAll(".checkboxs");
      checkBoxes.forEach(function (checkbox) {
        checkbox.checked = selectAll.checked;
      });

      updateTotalPrice();
    });
    minusBtn.addEventListener("click", function () {
      MinusNum(numberInput, div);
      updateTotalPrice();
    });

    plusBtn.addEventListener("click", function () {
      PlusNum(numberInput, div);
      updateTotalPrice();
    });

    numberInput.addEventListener("input", function () {
      changeToNumber(numberInput, div);
      updateTotalPrice();
    });

    checkbox.addEventListener("click", function () {
      const index = cartItems.findIndex((item) => item[0].id === book.id);
      if (checkbox.checked) {
        cartItems[index][2] = "true";
      } else {
        cartItems[index][2] = "false";
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateTotalPrice();
    });

    deletProduct.addEventListener("click", function () {
      const index = cartItems.findIndex((item) => item[0].id === book.id);
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      div.remove();
      updateTotalPrice();
    });
  });
};

// 페이지 로딩 후, HTML 화면에 데이터 표시하기
window.onload = displayDataOnHtml;

function updateSubtotalPrice(productInCart) {
  const eachPrice = productInCart.querySelector(".eachPrice").textContent;
  const inputNum = productInCart.querySelector(".numberInput").value;
  const subtotalPrice =
    parseInt(eachPrice.replace(",", "")) * parseInt(inputNum);
  productInCart.querySelector(".subtotalPrice").textContent =
    subtotalPrice.toLocaleString();

  // update the cartItems in localStorage
  const productTittle =
    productInCart.querySelector("#productTittle").textContent;
  const product = {
    title: productTittle,
    price: eachPrice,
    imagesrc: productInCart.querySelector(".productImg").src,
  };
  const quantity = parseInt(inputNum);

  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i][0].title === product.title) {
      cartItems[i][1] = quantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      break;
    }
  }
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
function removeCartItem(bookId) {
  // 화면에서 삭제될때 로컬스토리지도 삭제
  const index = cartItems.findIndex((item) => item[0].id === bookId);
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function initializeCart() {
  const ProductInCarts = document.querySelectorAll(".card");

  ProductInCarts.forEach(function (productInCart) {
    const minusBtn = productInCart.querySelector(".minusBtn");
    const plusBtn = productInCart.querySelector(".plusBtn");
    const numberInput = productInCart.querySelector(".numberInput");
    const checkbox = productInCart.querySelector(".checkboxs");
    const deletProduct = productInCart.querySelector(".deletProduct");

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

    deletProduct.addEventListener("click", function () {
      const card = deletProduct.closest(".card");
      const bookId = card.querySelector(".checkboxs").id.split("_")[1];
      card.remove();
      removeCartItem(bookId);
      updateTotalPrice();
    });
    const allDeletBtn = document.querySelector("#allDelet");

    allDeletBtn.addEventListener("click", () => {
      const checkBoxes = document.querySelectorAll(".checkboxs:checked");
      checkBoxes.forEach(function (checkbox) {
        const card = checkbox.closest(".card");
        const bookId = checkbox.id.split("_")[1];
        card.remove();
        removeCartItem(bookId);
      });

      localStorage.removeItem("cartItems"); // 로컬스토리지 내용 제거
      const productInCart = document.getElementById("productInCart");
      productInCart.innerHTML = ""; // 카트 화면에서 상품 카드 제거
      updateTotalPrice(); // 카트 총합 갱신
    });
    // 초기값으로 계산된 subtotalPrice 값을 출력
    updateSubtotalPrice(productInCart);
  });

  // 선택 삭제 버튼 이벤트 리스너 주석 처리
  /*
  const selectDeleteBtn = document.querySelector("#selectDelet");
  selectDeleteBtn.addEventListener("click", () => {
    const checkBoxes = document.querySelectorAll(".checkboxs:checked");
    checkBoxes.forEach(function (checkbox) {
      const card = checkbox.closest(".card");
      const bookId = checkbox.id.split("_")[1];
      card.remove();
      removeCartItem(bookId);
    });
    updateTotalPrice();
  });
  */

  //개별 삭제 버튼
  const deletProduct = document.querySelectorAll(".deletProduct");
  deletProduct.forEach(function (deletBtn) {
    deletBtn.addEventListener("click", () => {
      const card = deletBtn.closest(".card");
      const bookId = card.querySelector(".checkboxs").id.split("_")[1];
      card.remove();
      removeCartItem(bookId);
      updateTotalPrice();
    });
  });
  // 전체 삭제 버튼
  const allDeletBtn = document.querySelector("#allDelet");
  allDeletBtn.addEventListener("click", () => {
    const checkBoxes = document.querySelectorAll(".checkboxs:checked");
    checkBoxes.forEach(function (checkbox) {
      const card = checkbox.closest(".card");
      const bookId = checkbox.id.split("_")[1];
      card.remove();
      removeCartItem(bookId);
    });
    location.reload(true);
  });

  updateTotalPrice();

  const clearButton = document.querySelector("#allDelet");
  clearButton.addEventListener("click", function () {
    localStorage.removeItem("cartItems"); // 로컬스토리지 내용 제거
    const productInCart = document.getElementById("productInCart");
    productInCart.innerHTML = ""; // 카트 화면에서 상품 카드 제거
    updateTotalPrice(); // 카트 총합 갱신
  });

  // 초기화 후 총합 계산하여 출력
  updateTotalPrice();

  // 주문하기 버튼 클릭 이벤트 리스너 추가
  const orderButton = document.querySelector("#orderBtn");
  orderButton.addEventListener("click", function () {
    // 로컬 스토리지에 데이터가 있는지 확인
    if (cartItems.length === 0) {
      alert("장바구니에 상품을 추가하거나 구매하실 상품을 선택해주세요.");
      return;
    }

    // 선택된 상품들의 정보를 가지고 있는 cartItems 배열에서 해당 상품들을 삭제
    const checkBoxes = document.querySelectorAll(".checkboxs:checked");
    const newCartItems = cartItems.filter(function (item) {
      return !Array.from(checkBoxes).some(function (checkbox) {
        return item[0].id === checkbox.id.split("_")[1];
      });
    });

    // 새로운 cartItems 배열을 localStorage에 저장
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));

    // order.html 페이지로 이동
    window.location.href = "../order/order.html";
  });
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
