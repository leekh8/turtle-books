const booktable = document.querySelector("#booktable");

//해당 아이템 clickedbook 변수로 가져오기
const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get("category");
let clickedcategory = [];
console.log("108", categoryId)

try{
  const response = await fetch(`/api/product/${categoryId}`, {
      method: "GET",       
      headers: {'Content-Type': 'application/json'}
  })
  clickedcategory = (await response.json()).data; 
} catch(e) {
  console.log("error msg: ", e)
}

console.log("120", clickedcategory) //books 대신

clickedcategory.forEach((book) => {
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

clickedcategory.forEach((book, idx) => {
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
clickedcategory.forEach((e, i) => (totalcount[i] = 1)); //초기화

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

////////
//각 아이템의 tr 눌렀을 때
const secondContainer = document.querySelectorAll(".second-table");
secondContainer.forEach((item, idx) => {
  item.addEventListener("click", () => {
    window.location.href = `/itemDetail?id=${clickedcategory[idx]._id}`; //이런식으로 넘어가야
  }); //각 북의 id로 db에서 찾아오기
});
