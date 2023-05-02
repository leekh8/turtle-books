document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tabButtons");
  const tabContents = document.querySelectorAll(".tabContents");
  const subMenus = document.querySelectorAll(".subMenu");
  const modalButtons = document.querySelectorAll(".modal-button");
  const modals = document.querySelectorAll(".modal");
  const closeModalButtons = document.querySelectorAll(".modal-close");

  // 탭 기능
  function changeTab(e) {
    const targetTab = e.target.dataset.tab;

    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    tabContents.forEach((content) => {
      content.style.display = "none";
    });

    e.target.classList.add("active");
    document.getElementById(targetTab).style.display = "block";
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", changeTab);
  });

  // 아코디언 기능
  function toggleSubMenu(e) {
    const subMenu = e.target.nextElementSibling;
    subMenu.style.display = subMenu.style.display === "none" ? "block" : "none";
  }

  subMenus.forEach((subMenu) => {
    subMenu.previousElementSibling.addEventListener("click", toggleSubMenu);
  });

  // 모달 기능
  function openModal(e) {
    const targetModalId = e.target.dataset.modalTarget;
    const targetModal = document.querySelector(targetModalId);
    targetModal.classList.add("is-active");
  }

  function closeModal(e) {
    const modal = e.target.closest(".modal");
    modal.classList.remove("is-active");
  }

  modalButtons.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  closeModalButtons.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  // 수정버튼 기능
  function handleChangeBtnClick(e) {
    const button = e.target;
    if (!button.classList.contains("changeBtn")) return;

    const isEditMode = button.textContent.trim() === "수정";

    button.textContent = isEditMode ? "저장" : "수정";
    button.type = isEditMode ? "submit" : "button";

    const changeTextElements =
      button.parentElement.parentElement.querySelectorAll(".changeText");

    changeTextElements.forEach((el) => {
      if (isEditMode) {
        const input = document.createElement("input");
        input.type = "text";
        input.value = el.textContent;
        input.classList.add("changeText"); // 스타일 유지를 위해 'changeText' 클래스 추가
        el.replaceWith(input);
      } else {
        const td = document.createElement("td");
        td.textContent = el.value;
        td.classList.add("changeText");
        el.replaceWith(td);
      }
    });
  }

  // 정적&동적으로 추가된 수정 버튼에 이벤트 부여(이벤트 위임 방식)
  const productTable = document.querySelector("#product-table");
  const ctgrTable = document.querySelector("#ctgrTable");
  const tpcTable = document.querySelector("#tpcTable");

  productTable.addEventListener("click", handleChangeBtnClick);
  ctgrTable.addEventListener("click", handleChangeBtnClick);
  tpcTable.addEventListener("click", handleChangeBtnClick); //까지

  // 삭제 버튼 기능

  function handleDeleteBtnClick(e) {
    console.log("삭제");
    const button = e.target;
    console.log("button", button);

    if (!button.classList.contains("deltButnTh")) return;
    const table = button.closest("table"); // 못찾는 중
    console.log("테이블", table);

    const checkedRows = table.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    console.log("checkedRows", checkedRows);

    checkedRows.forEach((checkbox) => {
      checkbox.closest("tr").remove();
    });
  }

  productTable.addEventListener("click", handleDeleteBtnClick);
  ctgrTable.addEventListener("click", handleDeleteBtnClick);
  tpcTable.addEventListener("click", handleDeleteBtnClick);

  // 상품 등록 기능
  const addProductBtn = document.querySelector("#addProdctBtn");
  addProductBtn.addEventListener("click", () => {
    const categoryTap = document.querySelector("#category-tap").value;
    const topicTap = document.querySelector("#topic-tap").value;
    const addTitle = document.querySelector("#addTitle").value;
    const addPrice = document.querySelector("#addPrice").value;
    const addStock = document.querySelector("#addStock").value;
    const addAuthor = document.querySelector("#addAuthor").value;
    const addPublisher = document.querySelector("#addPublisher").value;
    const addPublishDate = document.querySelector("#addPublishDate").value;
    const addDescription = document.querySelector("#addDescription").value;
    const addProductImg = document.querySelector("#file-input");

    //input file로 받은 이미지 경로
    const addProductImgURL =
      addProductImg.files.length > 0
        ? URL.createObjectURL(addProductImg.files[0])
        : "";

    // addProductBtn을 클릭하면 상품정보 추가
    productTable.innerHTML += `
    <tr>
      <td class="checkboxTd"><input type="checkbox"></td>
      <td><span class="changeImg"><img class="productImg" src="${addProductImgURL}" alt=""></span></td>
      <td><span class="categorySelctBox">${categoryTap}</span></td>
      <td><span class="topicSelctBox">${topicTap}</span></td>
      <td><span class="changeText" class="productTitle">${addTitle}</span></td>
      <td><span class="changeText" class="productPrice">${addPrice}</span> 원</td>
      <td><span class="changeText" class="productStock">${addStock}</span> 개</td>
      <td><span class="changeText" class="productDescription">${addDescription}</span></td>
      <td><span class="changeText" class="productAuthor">${addAuthor}</span></td>
      <td><span class="changeText" class="productPublisher">${addPublisher}</span></td>
      <td><span class="changeText" class="productPublisher">${addPublishDate}</span></td>
      <td class="btnTd"><button class="changeBtn button is-small">수정</button></td>
    </tr>
  `;
    // 초기화 작업
    document.querySelector("#addSku").value = "";
    document.querySelector("#category-tap").value = "";
    document.querySelector("#topic-tap").value = "";
    document.querySelector("#addTitle").value = "";
    document.querySelector("#addPrice").value = "";
    document.querySelector("#addStock").value = "";
    document.querySelector("#addAuthor").value = "";
    document.querySelector("#addPublisher").value = "";
    document.querySelector("#addDescription").value = "";
    document.querySelector("#file-input").value = "";
    document.querySelector("#preProductImg").src = ""; // 미리보기 이미지 초기화
  });

  // 카테고리관리 탭
  // 카테고리 등록
  const addCategoryBtn = document.querySelector("#addCategoryBtn");
  addCategoryBtn.addEventListener("click", () => {
    const addCategory = document.querySelector("#addCategory").value;
    ctgrTable.innerHTML += `
                <tr>
                  <td class="checkboxTd"><input type="checkbox"></td>
                  <td><span  class="changeText" class="categorySelctBoxContent">${addCategory}</span></td>
                  <td class="btnTd"><button  class="changeBtn" class="button is-small">수정</button></td>
                </tr>
    `;

    document.querySelector("#addCategory").value = "";
  });

  // // Topic 등록
  // const addTopicBtn = document.querySelector("#addTopicBtn");
  // addTopicBtn.addEventListener("click", () => {
  //   const addTopic = document.querySelector("#addTopic").value;

  //   tpcTable.innerHTML += `
  // <tr>
  //               <td class="checkboxTd"><input type="checkbox"></td>
  //               <td><span  class="changeText" class="topicSelctBoxContent">${addTopic}</span></td>
  //               <td class="btnTd"><button  class="changeBtn" class="button is-small">수정</button></td>
  //             </tr>
  // `;
  //   document.querySelector("#addTopic").value = "";
  // });
  let categoryList = [
    {
      id: "644b84aa129eb3ab966f446f",
      name: "스릴러",
    },
    {
      id: "644ba6600c20e92db05afd20",
      name: "소설",
    },
    {
      id: "644bb7ced97bb24f684468b4",
      name: "수필",
    },
    {
      id: "644bb7d5d97bb24f684468b6",
      name: "시",
    },
    {
      id: "644bb7dfd97bb24f684468b8",
      name: "에세이",
    },
    {
      id: "644bb78fd97bb24f684468b0",
      name: "만화",
    },
    {
      id: "644bb782d97bb24f684468ae",
      name: "자기개발",
    },
  ];

  // 데이터를 가져와 카테고리탭 추가
  function getDataCategorySelect() {
    const categorySelect = document.querySelector("#category-tap");
    categoryList.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.name;
      option.textContent = category.name;
      categorySelect.appendChild(option);

      ctgrTable.innerHTML += `
                <tr>
                  <td class="checkboxTd"><input type="checkbox"></td>
                  <td><span  class="changeText" class="categorySelctBoxContent">${category.name}</span></td>
                  <td class="btnTd"><button  class="changeBtn" class="button is-small">수정</button></td>
                </tr>
    `;
    });
  }
  const topicList = ["Best", "New", "Stady"];
  const deliveryState = ["상품준비중", "배송중", "배송완료"];
  const selectElement = document.getElementById("topic-tap");
  topicList.forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic;
    option.text = topic;
    selectElement.add(option);
  });

  //카테고리 함수 호출
  getDataCategorySelect();
  //

  const productInfo = [
    {
      _id: "644ba6960c20e92db05afd22",
      title: "브라질에 비가 내리면 스타벅스 주식을 사라",
      author: "피터 나바로",
      publisher: "에프엔미디어",
      publishDate: "2022-04-24T15:00:00.000+00:00",
      description: "책 소개 준비중",
      price: 16200,
      topic: "best",
      categoryId: "644ba6600c20e92db05afd20",
      stock: 15,
      imageUrl: "../assets/book1.jpg",
      createdAt: "2023-04-28T10:57:26.596+00:00",
      updatedAt: "2023-04-28T10:57:26.596+00:00",
      __v: 0,
    },
    {
      _id: "644bb761d97bb24f684468ac",
      title: "챗GPT가 내 생각을 훔쳐버린다면!?!?!?",
      author: "피터 나바로",
      publisher: "에프엔미디어",
      publishDate: "2022-04-24T15:00:00.000+00:00",
      description: "책 소개 준비중",
      price: 17000,
      topic: "best",
      categoryId: "644ba6600c20e92db05afd20",
      stock: 15,
      imageUrl: "../assets/book2.jpg",
      createdAt: "2023-04-28T12:09:06.041+00:00",
      updatedAt: "2023-04-28T12:09:06.041+00:00",
      __v: 0,
    },
    {
      _id: "644bb935d97bb24f684468ba",
      title: "행복배틀",
      author: "주영하",
      publisher: "고즈넉이엔티",
      publishDate: "2020-04-30T15:00:00.000+00:00",
      description: "책 소개 준비중",
      price: 12150,
      topic: "steady",
      categoryId: "644b84aa129eb3ab966f446f",
      stock: 30,
      imageUrl: "../assets/book2.jpg",
      createdAt: "2023-04-28T12:16:53.369+00:00",
      updatedAt: "2023-04-28T12:16:53.369+00:00",
      __v: 0,
    },
    {
      _id: "644bb9b2d97bb24f684468bc",
      title: "마담 타로",
      author: "이수아",
      publisher: "책과나무",
      publishDate: "2021-11-16T15:00:00.000+00:00",
      description: "책 소개 준비중",
      price: 12600,
      topic: "steady",
      categoryId: "644b84aa129eb3ab966f446f",
      stock: 30,
      imageUrl: "../assets/book6.jpg",
      createdAt: "2023-04-28T12:18:58.512+00:00",
      updatedAt: "2023-04-28T12:18:58.512+00:00",
      __v: 0,
    },
    {
      _id: "644bba7bd97bb24f684468be",
      title: "데들리 러블리",
      author: "배명은",
      publisher: "황금가지",
      publishDate: "2023-02-09T15:00:00.000+00:00",
      description: "책 소개 준비중",
      price: 13500,
      topic: "new",
      categoryId: "644b84aa129eb3ab966f446f",
      stock: 30,
      imageUrl: "../assets/book7.jpg",
      createdAt: "2023-04-28T12:22:19.935+00:00",
      updatedAt: "2023-04-28T12:22:19.935+00:00",
      __v: 0,
    },
    {
      _id: "644bbb05d97bb24f684468c0",
      title: "돌연한 출발",
      author: "프란츠 카프카",
      publisher: "민음사",
      publishDate: "2023-04-06T15:00:00.000+00:00",
      description: "책 소개 준비중",
      price: 14400,
      topic: "new",
      categoryId: "644ba6600c20e92db05afd20",
      stock: 50,
      imageUrl: "../assets/book8.jpg",
      createdAt: "2023-04-28T12:24:37.799+00:00",
      updatedAt: "2023-04-28T12:24:37.799+00:00",
      __v: 0,
    },
    {
      _id: "644bbc17d97bb24f684468c2",
      title: "아쿠아리움이 문을 닫으면",
      author: "셀비 반 펠트",
      publisher: "미디어창비",
      publishDate: "2023-03-28T15:00:00.000+00:00",
      description: "책 소개 준비중",
      price: 16200,
      topic: "new",
      categoryId: "644ba6600c20e92db05afd20",
      stock: 30,
      imageUrl: "../assets/book9.jpg",
      createdAt: "2023-04-28T12:29:11.685+00:00",
      updatedAt: "2023-04-28T12:29:11.685+00:00",
      __v: 0,
    },
  ];

  // 데이터를 가져와 상품관리탭 추가
  productInfo.forEach((productInfo) => {
    const category = categoryList.find(
      (cat) => cat._id === productInfo.categoryId
    );
    const categoryName = category ? category.id : "";
    productTable.innerHTML += `
    <tr>
      <td class="checkboxTd"><input type="checkbox"></td>
      <td><span class="changeImg"><img class="productImg" src="${productInfo.imageUrl}" alt=""></span></td>
      <td><span class="categorySelctBox">${categoryName}</span></td>
      <td><span class="topicSelctBox">${productInfo.topic}</span></td>
      <td><span class="changeText productTitle">${productInfo.title}</span></td>
      <td><span class="changeText productPrice">${productInfo.price}</span> 원</td>
      <td><span class="changeText productStock">${productInfo.stock}</span> 개</td>
      <td><span class="changeText productDescription">${productInfo.description}</span></td>
      <td><span class="changeText productAuthor">${productInfo.author}</span></td>
      <td><span class="changeText productPublisher">${productInfo.publisher}</span></td>
      <td><span class="changeText productPublishDate">${productInfo.publishDate}</span></td>
      <td class="btnTd"><button class="changeBtn button is-small">수정</button></td>
    </tr>
  `;
  });
}); //DOMContentLoaded 이벤트 리스너 내부
