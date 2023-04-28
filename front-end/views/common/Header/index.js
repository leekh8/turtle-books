// const logo = document.querySelector(".navbar-brand");
// logo.addEventListener("click", ()=>{
//     window.location.href = "../../home/index.html"
// })
//경로문제 생각.. 







///카테고리 받아와서 뿌려주기
const categorys = ["소설", "만화", "자기개발", "dd"];

// try{
//   const response = fetch(`api/category`, {
//       method: "GET",       
//       headers: {'Content-Type': 'application/json'}
//   })
//   // categorys = await response.json(); 
// } catch(e) {
//   console.log("error msg: ", e)
// }

//버튼 생성
const dropdown = document.querySelector('.navbar-dropdown'); // .navbar-dropdown 요소 선택
categorys.forEach(category=>{
  const newLink = document.createElement('a'); // 새로운 a 태그 생성
  newLink.classList.add('navbar-item'); // 클래스 추가
  newLink.textContent = `${category}`; // 텍스트 콘텐츠 추가
  dropdown.appendChild(newLink); // .navbar-dropdown에 새로운 a 태그 추가
})

////카테고리들 각각에 이벤트 붙이기
const catebuttons = document.querySelectorAll(".navbar-item") //버튼들의 리스트
catebuttons.forEach((catebutton,i)=>{
  catebutton.addEventListener("click", ()=>{ 
    window.location.href = `../itemList/itemList.html?category=${categorys[i]}`;
  })
});
