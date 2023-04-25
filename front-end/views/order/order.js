const addressBtn = document.querySelector("#addressBtn");
const addressInput = document.querySelector("#address");
const detailAddressInput = document.querySelector("#detailAddress");
const paymentBtn = document.querySelector("#paymentsBtn");

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

// 결제완료 후 주문완료 페이지로 이동하여 결제된 내역을 확인함
paymentBtn.addEventListener("click", () => {
  if (!addressInput.value) {
    alert("배송지를 입력해주세요!");
    return;
  } else {
    alert("결제가 완료되었습니다!");
    window.location.href = "/order-complete";
  }
});
