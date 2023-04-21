// import { headerNav } from "../../common/Header/header.html"
// /* nav Template */
// function addNav() {
// 	const header = document.querySelector('.headerNav');
// 	header.innerHTML = navTemplate();
// }
// addNav();

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
    title: "브라질에 비가 내리면 스타벅스 주식을 사라2",
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
  const tr = document.createElement("tr");
  tr.innerHTML = ` 
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
            <h2><b>"${book.title}"</b></h2>
            <br />
            <p>"${book.author}/${book.publisher}/${book.publishDate}"</p>
            <p>
            "${book.description}"
            </p>
            <p>"${book.price}"원</p>
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
    `;
    booktable.appendChild(tr);
});

// data.forEach((book) => {
//     const tableRow = document.createElement("tr"); // create a new table row element
//     tableRow.innerHTML = `
//         <td width="5%">
//           <input type="checkbox" id="myCheckbox" name="myCheckbox" />
//         </td>
//         <td width="20%">
//           <img
//             src="${book.image}"
//             alt="Placeholder image"
//             class="img1"
//           />
//         </td>
//         <td width="60%" class="second-table">
//           <h2><b>${book.title}</b></h2>
//           <br />
//           <p>${book.author}/${book.publisher}/${book.publishDate}</p>
//           <p>${book.description}</p>
//           <p>${book.price}원</p>
//         </td>
//         <td width="15%">
//           <div class="third-table">
//             <div class="quantity-selector">
//               <button class="quantity-minus">-</button>
//               <input
//                 class="quantity-input"
//                 type="number"
//                 value="1"
//                 min="1"
//               />
//               <button class="quantity-plus">+</button>
//             </div>
//             <br />
//             <button>장바구니</button><br />
//             <button>바로구매</button>
//           </div>
//         </td>
//     `;
//     bookTable.appendChild(tableRow); // add the table row to the table
//   });