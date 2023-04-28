const booktable = document.querySelector("#booktable");

const books = [
  {
    id: 1,
    title: "브라질에 비가 내리면 스타벅스 주식을 사라",
    author: "피터 나바로",
    publisher: "에프엔미디어",
    publishDate: "2022.04.25",
    description:
      "‘숲(경제 흐름)과 나무(종목)’를 함께 보라! 전쟁, 전염병, 기후, 금리, 환율, 인플레이션… 거시경제 지표를 이해하면 변동성은 기회다!",
    price: 16200,
    imageUrl: "../assets/book1.jpg",
    topic: "best",
    category: "소설",
  },
  {
    id: 2,
    title: "2챗GPT가 내 생각을 훔쳐버린다면!?!?!?",
    author: "피터 나바로",
    publisher: "에프엔미디어",
    publishDate: "2022.04.25",
    description: "22",
    price: 17000,
    imageUrl: "../assets/book2.jpg",
    topic: "best",
    category: "소설",
  },
  {
    id: 3,
    title: "3챗GPT가 내 생각을 훔쳐버린다면!?!?!?",
    author: "피터 나바로",
    publisher: "에프엔미디어",
    publishDate: "2022.04.25",
    description: "22",
    price: 17000,
    imageUrl: "../assets/book2.jpg",
    topic: "best",
    category: "소설",
  },
  {
    id: 4,
    title: "4챗GPT가 내 생각을 훔쳐버린다면!?!?!?",
    author: "피터 나바로",
    publisher: "에프엔미디어",
    publishDate: "2022.04.25",
    description: "22",
    price: 17000,
    imageUrl: "../assets/book2.jpg",
    topic: "best",
    category: "소설",
  },
  {
    id: 5,
    title: "newone",
    author: "피터 나바로",
    publisher: "에프엔미디어",
    publishDate: "2022.04.25",
    description: "22",
    price: 17000,
    imageUrl: "../assets/book2.jpg",
    topic: "new",
    category: "소설",
  },
  {
    id: 6,
    title: "6챗GPT가 내 생각을 훔쳐버린다면!?!?!?",
    author: "피터 나바로",
    publisher: "에프엔미디어",
    publishDate: "2022.04.25",
    description: "22",
    price: 17000,
    imageUrl: "../assets/book2.jpg",
    topic: "best",
    category: "만화",
  },
  {
    id: 7,
    title: "new2",
    author: "피터 나바로",
    publisher: "에프엔미디어",
    publishDate: "2022.04.25",
    description: "22",
    price: 17000,
    imageUrl: "../assets/book2.jpg",
    topic: "new",
    category: "만화",
  },
  {
    id: 8,
    title: "steady1",
    author: "피터 나바로",
    publisher: "에프엔미디어",
    publishDate: "2022.04.25",
    description: "22",
    price: 17000,
    imageUrl: "../assets/book2.jpg",
    topic: "steady",
    category: "만화",
  },
  // ... 다른 책들
];

books.forEach((book) => {
  booktable.innerHTML += `
      <tr class="each-container"> 
        <td width="5%">
        </td>
        <td width="20%">
            <img
            src="${book.imageUrl}";
            alt="Placeholder image"
            class="img1"
            />
        </td>
        <td width="60%" class="second-table">
            <h2><b>${book.title}</b></h2>
            <br />
            <p>${book.author}/${book.publisher}/${book.publishDate}</p>
            <p>
            ${book.description}
            </p>
            <p>${book.price}원</p>
        </td>
        <td width="15%">
            <div class="third-table">
            <div class="quantity-selector">
                <button class="quantity-minus">-</button>
                <input
                class="quantity-input"
                type="number"
                value="1"
                min="1"
                />
                <button class="quantity-plus">+</button>
            </div>
            <br />
            <button class="cartbutton">장바구니</button><br />
            <button class="buy-now-btn">바로구매</button>
            </div>
        </td>
      </tr>
    `;
});

books.forEach((book, idx) => {
  ////////////////////////////장바구니
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
    item.push(book); // 현재 객체 통째로
    item.push(totalcount[idx]);
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; //로컬에 기존 있던거 붙이려고 꺼냄
    cartItems.push(item); //붙임
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); //다시 로컬 넣음
  }

  const cartbuttons = document.querySelectorAll(".cartbutton");
  cartbuttons[idx].addEventListener("click", showalert);
  cartbuttons[idx].addEventListener("click", pushlocal);

  /////////////////바로구매
  //바로구매 버튼 눌렀을 때
  const directbuttons = document.querySelectorAll(".buy-now-btn");
  directbuttons[idx].addEventListener("click", ()=>{
    const item = [];
    item.push(book); //객체 통째로 (현재 아이템)
    item.push(totalcount[idx]);
    const directItem = JSON.parse(localStorage.getItem("directItem")) || []; //로컬에 기존 있던거 붙이려고 꺼냄 
    directItem.push(item); //붙임 
    localStorage.setItem("directItem", JSON.stringify(directItem)); //다시 로컬 넣음 
    window.location.href = "/order" // 결제페이지로 이동 
  })
});

///////수량 조절 박스 관련
let totalcount = []; //각 item 마다의 카운트
books.forEach((e, i) => (totalcount[i] = 1)); //초기화

document.addEventListener("DOMContentLoaded", function () {
  const minusBtns = document.querySelectorAll(".quantity-minus"); // '-'버튼
  const numberInputs = document.querySelectorAll(".quantity-input"); //input
  const plusBtns = document.querySelectorAll(".quantity-plus"); //'+' 버튼

  function minusNum(e, i) {
    const input = e.target.nextElementSibling;
    if (parseInt(input.value) > 1) {
      //1이하일 경우
      input.value = parseInt(input.value) - 1;
    } else {
      if (confirm("삭제하시겠습니까?")) {
        input.value = 1;
      }
    }
    totalcount[i] = Number(input.value);
  }

  function plusNum(e, i) {
    const input = e.target.previousElementSibling;
    input.value = parseInt(input.value) + 1;
    totalcount[i] = Number(input.value);
    console.log(e)
  }

  // 체크 박스가 다수일 경우
  for (let i = 0; i < minusBtns.length; i++) {
    minusBtns[i].addEventListener("click", function (e) {
      minusNum(e, i);
    });
  }

  for (let i = 0; i < plusBtns.length; i++) {
    plusBtns[i].addEventListener("click", function (e) {
      plusNum(e, i);
    });
  }
});

////////
//각 아이템의 tr 눌렀을 때
const secondContainer = document.querySelectorAll(".second-table");
secondContainer.forEach((item, idx) => {
  item.addEventListener("click", () => {
    window.location.href = `/itemDetail?id=${books[idx].id}`; //이런식으로 넘어가야
  }); //각 북의 id로 db에서 찾아오기
});
