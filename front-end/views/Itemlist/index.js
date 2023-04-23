
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
    imagesrc: "../assets/book1.jpg",
  },
  {
    id: 2,
    title: "챗GPT가 내 생각을 훔쳐버린다면!?!?!?",
    author: "피터 나바로",
    publisher: "에프엔미디어",
    publishDate: "2022.04.25",
    description: "22",
    price: 17000,
    imagesrc: "../assets/book2.jpg",
  },
  // ... 다른 책들
];

books.forEach((book) => {
  booktable.innerHTML += `
      <tr> 
        <td width="5%">
            <input type="checkbox" id="${book.id}" name="myCheckbox" />
        </td>
        <td width="20%">
            <img
            src="${book.imagesrc}";
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
            <button>장바구니</button><br />
            <button>바로구매</button>
            </div>
        </td>
      </tr>
    `;
});

document.addEventListener("DOMContentLoaded", function () {
  const minusBtns = document.querySelectorAll(".quantity-minus"); // '-'버튼
  const numberInputs = document.querySelectorAll(".quantity-input"); //input
  const plusBtns = document.querySelectorAll(".quantity-plus"); //'+' 버튼

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

  // 체크 박스가 다수일 경우
  for (let i = 0; i < minusBtns.length; i++) {
    minusBtns[i].addEventListener("click", minusNum);
  }

  for (let i = 0; i < plusBtns.length; i++) {
    plusBtns[i].addEventListener("click", plusNum);
  }
});