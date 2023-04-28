const categoryMap = {
  "644b84aa129eb3ab966f446f": "스릴러",
  "644ba6600c20e92db05afd20": "소설",
  "644bb7ced97bb24f684468b4": "수필",
  "644bb7d5d97bb24f684468b6": "시",
  "644bb7dfd97bb24f684468b8": "에세이",
  "644bb78fd97bb24f684468b0": "만화",
  "644bb782d97bb24f684468ae": "자기개발",
};

let books = []; //전체 item 배열로 받음

try{ //전체 book 받는 api 
  const response = await fetch(`/api/product`, {
      method: "GET",       
      headers: {'Content-Type': 'application/json'}
  })
  books = await response.json(); 
} catch(e) {
  console.log("error msg: ", e)
}

// best만 html로 뿌려주기
const bestbooks = books.filter((e) => e.topic === "best"); //배열
const bestitems = document.querySelector(".best-items"); //div
console.log(bestbooks)

bestbooks.forEach((book, idx) => { //category만 수정해주면 됨 
  const mapkey = book.categoryId;
  const category = categoryMap[mapkey];
  bestitems.innerHTML += `
            <div class="slider-item">
                <img src=${book.imageUrl} alt="Book cover">
                <p class="category">${category}</p> 
                <p class="title1"><b>${book.title}</b></p>
            </div>
        `;
});

//각 아이템에 해당 상세 페이지 넘어가게 하는 이벤트 달아주기
const bestitemlist = document.querySelectorAll(".best-container .slider-item");
bestitemlist.forEach((item, idx) => {
  item.addEventListener("click", () => {
    window.location.href = `/itemDetail?id=${bestbooks[idx]._id}`;
    //쿼리파라미터로 Itemdetail?id=${books[idx].id} - 이게 되려면 books가 best인 것만
  });
});

////////////////////////

// new만 html로 뿌려주기
const newbooks = books.filter((e) => e.topic === "new"); //배열
const newitems = document.querySelector(".new-items"); //div

newbooks.forEach((book, idx) => {
  const mapkey = book.categoryId;
  const category = categoryMap[mapkey];
  newitems.innerHTML += `
            <div class="slider-item">
                <img src=${book.imageUrl} alt="Book cover">
                <p class="category">${category}</p>
                <p class="title1"><b>${book.title}</b></p>
            </div>
        `;
});

//각 아이템에 해당 상세 페이지 넘어가게 하는 이벤트 달아주기
const newitemlist = document.querySelectorAll(".new-container .slider-item");
newitemlist.forEach((item, idx) => {
  item.addEventListener("click", () => {
    window.location.href = `/itemDetail?id=${newbooks[idx]._id}`; //쿼리파라미터로 Itemdetail?id=${books[idx].id} - 이게 되려면 books가 best인 것만
  });
});

////////////////////////

// steady만 html로 뿌려주기
const steadybooks = books.filter((e) => e.topic === "steady"); //배열
const steadyitems = document.querySelector(".steady-items"); //div

steadybooks.forEach((book, idx) => {
  const mapkey = book.categoryId;
  const category = categoryMap[mapkey];
  steadyitems.innerHTML += `
            <div class="slider-item">
                <img src=${book.imageUrl} alt="Book cover">
                <p class="category">${category}</p>
                <p class="title1"><b>${book.title}</b></p>
            </div>
        `;
});

//각 아이템에 해당 상세 페이지 넘어가게 하는 이벤트 달아주기
const steadyitemlist = document.querySelectorAll(
  ".steady-container .slider-item"
);
steadyitemlist.forEach((item, idx) => {
  item.addEventListener("click", () => {
    window.location.href = `/itemDetail?id=${steadybooks[idx]._id}`; //쿼리파라미터로 Itemdetail?id=${books[idx].id} - 이게 되려면 books가 best인 것만
  });
});

// 양쪽 버튼에 넘어가는 함수 구현
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const sliderItems = document.querySelector(".slider-items");

const itemWidth = sliderItems.firstElementChild.getBoundingClientRect().width;
const visibleItems = Math.floor(
  sliderItems.parentElement.clientWidth / itemWidth
);
const totalItems = sliderItems.children.length;
let currentPosition = 0;

function updateButtons() {
  prevBtn.disabled = currentPosition === 0;
  nextBtn.disabled = currentPosition === totalItems - visibleItems;
}

function slideItems(direction) {
  currentPosition += direction === "prev" ? -1 : 1;
  sliderItems.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
  updateButtons();
}

prevBtn.addEventListener("click", () => slideItems("prev"));
nextBtn.addEventListener("click", () => slideItems("next"));

updateButtons();

// 베스트, 신작, 스테디 버튼에 스크롤 onclick 함수 달아주기
const bestbutton = document.querySelector("#bestbutton");
const newbutton = document.querySelector("#newbutton");
const steadybutton = document.querySelector("#steadybutton");

bestbutton.addEventListener("click", scrolltoBest);
newbutton.addEventListener("click", scrolltoNew);
steadybutton.addEventListener("click", scrolltoSteady);

function scrolltoBest() {
  const best = document.querySelector("#best");
  const topPos = best.offsetTop;
  window.scrollTo({
    top: topPos - 55,
    behavior: "smooth",
  });
}

function scrolltoNew() {
  const news = document.querySelector("#new");
  const topPos = news.offsetTop;
  window.scrollTo({
    top: topPos,
    behavior: "smooth",
  });
}

function scrolltoSteady() {
  const steady = document.querySelector("#steady");
  const topPos = steady.offsetTop;
  window.scrollTo({
    top: topPos,
    behavior: "smooth",
  });
}

//각 카테고리마다 button 하나씩 만들어서 내용 넣어줌
///카테고리 리스트 가져와서 button으로 뿌려주기
// const categorys = ["소설", "만화", "자기개발"];
let categorys = [];

try{
  const response = await fetch(`/api/category`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'}
  })
  categorys = await response.json();
} catch(e) {
  console.log("error msg: ", e)
}

// categorys.forEach(e=>{
//   console.log("167", e.name)
// })

//버튼 생성
const buttonlist2 = document.querySelector(".buttonlist2");
categorys.forEach((e) => {
  buttonlist2.innerHTML += `<button class="catebutton">${e.name}</button>`;
});

////카테고리들 각각에 이벤트 붙이기
const catebuttons = document.querySelectorAll(".catebutton"); //버튼들의 리스트
catebuttons.forEach((catebutton, i) => {
  catebutton.addEventListener("click", () => {
    window.location.href = `/itemList?category=${categorys[i]._id}`;
  });
});
