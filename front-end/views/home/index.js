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
    imagesrc: "../assets/book2.jpg",
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
    imagesrc: "../assets/book2.jpg",
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
    imagesrc: "../assets/book2.jpg",
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
    imagesrc: "../assets/book2.jpg",
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
    imagesrc: "../assets/book2.jpg",
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
    imagesrc: "../assets/book2.jpg",
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
    imagesrc: "../assets/book2.jpg",
    topic: "steady",
    category: "만화",
  },
  // ... 다른 책들
];

// best만 html로 뿌려주기
const bestbooks = books.filter(e=>e.topic==="best") //배열
const bestitems = document.querySelector(".best-items"); //div

bestbooks.forEach((book, idx) => {
    bestitems.innerHTML += `
            <div class="slider-item">
                <img src=${book.imagesrc} alt="Book cover">
                <p class="category">${book.category}</p>
                <p class="title">${book.title}</p>
            </div>
        `;
});

//각 아이템에 해당 상세 페이지 넘어가게 하는 이벤트 달아주기
const bestitemlist = document.querySelectorAll(".best-container .slider-item");
bestitemlist.forEach((item, idx) => {
  item.addEventListener("click", () => {
    window.location.href = `../Itemdetail/index.html?id=${bestbooks[idx].id}`; //쿼리파라미터로 Itemdetail?id=${books[idx].id} - 이게 되려면 books가 best인 것만
  });
});

////////////////////////

// new만 html로 뿌려주기
const newbooks = books.filter(e=>e.topic==="new") //배열
const newitems = document.querySelector(".new-items"); //div

newbooks.forEach((book, idx) => {
    newitems.innerHTML += `
            <div class="slider-item">
                <img src=${book.imagesrc} alt="Book cover">
                <p class="category">${book.category}</p>
                <p class="title">${book.title}</p>
            </div>
        `;
});

//각 아이템에 해당 상세 페이지 넘어가게 하는 이벤트 달아주기
const newitemlist = document.querySelectorAll(".new-container .slider-item");
newitemlist.forEach((item, idx) => {
  item.addEventListener("click", () => {
    window.location.href = `../Itemdetail/index.html?id=${newbooks[idx].id}`; //쿼리파라미터로 Itemdetail?id=${books[idx].id} - 이게 되려면 books가 best인 것만
  });
});

////////////////////////

// steady만 html로 뿌려주기
const steadybooks = books.filter(e=>e.topic==="steady") //배열
const steadyitems = document.querySelector(".steady-items"); //div

steadybooks.forEach((book, idx) => {
    steadyitems.innerHTML += `
            <div class="slider-item">
                <img src=${book.imagesrc} alt="Book cover">
                <p class="category">${book.category}</p>
                <p class="title">${book.title}</p>
            </div>
        `;
});

//각 아이템에 해당 상세 페이지 넘어가게 하는 이벤트 달아주기
const steadyitemlist = document.querySelectorAll(".steady-container .slider-item");
steadyitemlist.forEach((item, idx) => {
  item.addEventListener("click", () => {
    window.location.href = `../Itemdetail/index.html?id=${steadybooks[idx].id}`; //쿼리파라미터로 Itemdetail?id=${books[idx].id} - 이게 되려면 books가 best인 것만
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

//카테고리 목록 따오기
const categoryContainer = document.querySelector(".buttonlist2");

var button = document.createElement("button");
//각 카테고리마다 button 하나씩 만들어서 내용 넣어줌
//리스트 형태도 ok


///카테고리 리스트 가져와서 button으로 뿌려주기
const categorys = ["소설", "만화", "자기개발"];

try{
  const response = fetch(`api/category`, {
      method: "GET",       
      headers: {'Content-Type': 'application/json'}
  })
  // categorys = await response.json(); 
} catch(e) {
  console.log("error msg: ", e)
}

const buttonlist2 = document.querySelector(".buttonlist2");
categorys.forEach(e=>{
  buttonlist2.innerHTML+=`<button>${e}</button>`
})

////카테고리들 각각에 이벤트 붙이기
categorys.forEach((e,i)=>{
  e.addEventListener("click", ()=>{ //여기수정!!!!!!!!!!!!!!!!!!!!!!!!!!!
    window.location.href = `../Itemlist/index.html?category=${e}`;
  })
})