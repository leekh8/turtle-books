const addressBtn = document.querySelector("#addressBtn");
const addressInput = document.querySelector("#address");
const username = document.querySelector("#username");
const detailAddressInput = document.querySelector("#detailAddress");

addressBtn.addEventListener("click", addAddress);
let roadAddress = "";
let jibunAddress = "";
function addAddress(e) {
  var themeObj = {
    bgColor: "#82F6D2", //바탕 배경색
    postcodeTextColor: "#8B94F7", //우편번호 글자색
    emphTextColor: "#AB4C00", //강조 글자색
    outlineColor: "#006915", //테두리
  };
  new daum.Postcode({
    theme: themeObj,
    oncomplete: function (data) {
      if (data.userSelectedType === "R") {
        roadAddress = data.roadAddress;
      } else {
        jibunAddress = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          jibunAddress += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          jibunAddress +=
            jibunAddress !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (jibunAddress !== "") {
          jibunAddress = " (" + jibunAddress + ")";
        }
      } else {
      }

      addressInput.value = `${roadAddress} ${jibunAddress}`;
      detailAddressInput.focus();
    },
  }).open();
}
const cartItemsString = window.localStorage.getItem("cartItems");
const directItemString = window.localStorage.getItem("directItem");
// JSON 문자열을 객체, 배열로 변환
// totalCost
const cartItems = JSON.parse(cartItemsString);
const directItem = JSON.parse(directItemString);
console.log(cartItems);
console.log(directItem);

let totalCost = 0;
let title = "";
let quantity = 0;
if (!directItem) {
  cartItems.map((item) => {
    totalCost += item[0].price * item[1];
    title = item[0].title;
    quantity += item[1];
  });
} else if (directItem.length > 0) {
  directItem.map((item) => {
    totalCost += item[0].price * item[1];
    title = item[0].title;
    quantity += item[1];
  });
}
console.log(totalCost);
const paymentsBox = document.querySelector(".payments-box");

paymentsBox.innerHTML += `
        <div class="box">
          <h1 class="title">결제 정보</h1>
          <p class="paymentsLabel">구매 서적</p> 
          <p >${title} 등 ${directItem !== null ? quantity : quantity}개</p>

          <p class="paymentsLabel">주문상품 </p> <p> ${totalCost}원</p>

          <p class="paymentsLabel">배송비</p> <p> 2500원</p>

          <p class="paymentsLabel">쿠폰할인 </p> 
          <p>0원</p>
          <hr>

          <p class="totalCost">총 결제금액</p>
          <p>${totalCost + 2500}원</p>
          <button class="button is-primary is-fullwidth" id="paymentsBtn">
            결제하기
          </button>
        </div>
`;
const paymentsBtn = document.querySelector("#paymentsBtn");

// 결제버튼을 누르면 상품금액, 상품내역, 주소, 이름이 넘어감
paymentsBtn.addEventListener("click", async () => {
  if (!addressInput.value || !username.value) {
    return alert("빈칸없이 입력해주세요!");
  } else if (!directItem) {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          orderItems: cartItems, // 주문받는 아이템 내역 (로컬스토리지 이용)
        }),
      });

      if (response.ok) {
        const data = await response.json();
        location.href = "/order-complete.html";
        // 결제가 완료됐다면 로컬스토리지 삭제
        window.localStorage.removeItem("cartItems");
        console.log(data.message);
      } else {
        throw new Error("결제에 실패했습니다.");
      }
    } catch (error) {
      console.log(error.message);
      alert("결제에 실패했습니다. 다시 시도해주세요.");
    }
  } else {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          orderItems: directItem, // 주문받는 아이템 내역 (로컬스토리지 이용)
        }),
      });
      console.log(detailAddress, address);
      if (response.ok) {
        const data = await response.json();
        location.href = "/order-complete.html";
        // 결제가 완료됐다면 로컬스토리지 삭제
        window.localStorage.removeItem("cartItems");
        console.log(data.message);
      } else {
        throw new Error("결제에 실패했습니다.");
      }
    } catch (error) {
      console.log(error.message);
      alert("결제에 실패했습니다. 다시 시도해주세요.");
    }
  }
});

window.addEventListener("unload", () => {
  window.localStorage.removeItem("directItem");
});
