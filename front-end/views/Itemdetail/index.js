// const clickedbook = {
//   id: 1,
//   title: "브라질에 비가 내리면 스타벅스 주식을 사라",
//   author: "피터 나바로",
//   publisher: "에프엔미디어",
//   publishDate: "2022.04.25",
//   description:
//     "‘숲(경제 흐름)과 나무(종목)’를 함께 보라! 전쟁, 전염병, 기후, 금리, 환율, 인플레이션… 거시경제 지표를 이해하면 변동성은 기회다!",
//   price: 16200,
//   imageUrl: "../assets/book1.jpg",
//   topic: "best",
//   category: "소설",
// };

//해당 아이템 clickedbook 변수로 가져오기
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let clickedbook;

try {
  const response = await fetch(`/api/product/detail/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  clickedbook = (await response.json()).data;
  console.log(clickedbook);
  const itemcontainer = document.querySelector(".item-container");

  itemcontainer.innerHTML = `
  <div class="left">
    <div
      class="card"
      style="width: 35%; margin-top: 5%; margin-right: -10%"
    >
      <div class="card-image" style="width: 100%">
        <img src="${clickedbook.imageUrl}" alt="Placeholder image" />
      </div>
      <div class="card-content" style="padding: 1rem">
        <div class="media">
          <div class="media-content">
            <p class="title is-6">
              ${clickedbook.title}  
            </p>
            <p class="subtitle is-7">${clickedbook.author}</p>
          </div>
        </div>
        <div class="content" style="font-size: small">
          ${clickedbook.publisher}
          <br />
          ${clickedbook.publishDate}
        </div>
      </div>
    </div>
    </div>
    <div class="right">
    <div class="right-container">
      <div class="price">
        <div>
          <button>무료배송</button>
          <button>소득공제</button>
        </div>
        <br />
        <h1><b>${clickedbook.price}원</b></h1>
      </div>
      <div class="tags">
        <ul>
          <li>미디어 추천도서</li>
          <li>MD의 선택</li>
          <li>주간베스트</li>
        </ul>
        <div>
          <a>국내도서 > </a><a>경제/경영 > </a><a>재테크/금융 > </a
          ><a>주식/증권 > </a><a>${clickedbook.category}</a>
        </div>
      </div>
      <div class="description">
        <h3><b>Description</b></h3>
        <p>
          ${clickedbook.description}
        </p>
        <p><b>Rating</b>: 4.5/5</p>
      </div>
    </div>
  </div>
`;
} catch (e) {
  console.log("error msg: ", e);
}

//clickedbook 기반으로 html 짜기

const footer = document.querySelector(".footer");
const totaltag = document.querySelector("#totaltag");
totaltag.innerHTML = `총 상품 금액 : ${clickedbook.price}원`;
let totalcount = 1;

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
    totaltag.innerHTML = `총 상품 금액 : ${clickedbook.price * input.value}원`;
    totalcount = Number(input.value);
  }

  function plusNum(e) {
    const input = e.target.previousElementSibling;
    input.value = parseInt(input.value) + 1;
    totaltag.innerHTML = `총 상품 금액 : ${clickedbook.price * input.value}원`;
    totalcount = Number(input.value);
  }

  minusBtn.addEventListener("click", minusNum);
  plusBtn.addEventListener("click", plusNum);

//장바구니 버튼 alert
function showalert() {
  const result = confirm(
    "장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?"
  );
  if (result) {
    window.location.href = "/cart"; // 장바구니로 이동
  } else {
    return;
  }
}

//담은거 로컬스토리지에 넣기
function pushlocal() {
  const item = [];
  item.push(clickedbook); //객체 통째로
  item.push(totalcount);
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; //로컬에 기존 있던거 붙이려고 꺼냄
  cartItems.push(item); //붙임
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); //다시 로컬 넣음
}

const cartbutton = document.querySelector(".add-to-cart-btn");
cartbutton.addEventListener("click", showalert);
cartbutton.addEventListener("click", pushlocal);

//바로구매 버튼 눌렀을 때
const directbutton = document.querySelector(".buy-now-btn");
directbutton.addEventListener("click", () => {
  const item = [];
  item.push(clickedbook); //객체 통째로 (현재 아이템)
  item.push(totalcount);
  const directItem = JSON.parse(localStorage.getItem("directItem")) || []; //로컬에 기존 있던거 붙이려고 꺼냄
  directItem.push(item); //붙임
  localStorage.setItem("directItem", JSON.stringify(directItem)); //다시 로컬 넣음
  window.location.href = "/order"; // 결제페이지로 이동
});
